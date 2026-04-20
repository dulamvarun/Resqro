import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';

export let io: SocketIOServer;
const activeOrders: any[] = [];
const orderHistory: any[] = [];
let currentMenu: any[] = []; // Initialized from cold storage if needed

const getISTTime = () => {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

export function initSocket(server: Server) {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*', // For development
      methods: ['GET', 'POST']
    }
  });

  // io.adapter(createAdapter(pubClient, subClient)); // Disabled for demo mode

  io.on('connection', (socket) => {
    console.log(`[SOCKET] NEW CONNECTION: ${socket.id}`);
    
    socket.onAny((eventName, ...args) => {
      console.log(`[SOCKET] [${socket.id}] EVENT: ${eventName}`, args);
    });

    // Existing connection logic...
    if (currentMenu.length > 0) {
      socket.emit('menu_updated', currentMenu);
    }

    // Waiters will join the "staff" room to listen for new orders
    socket.on('join_staff', () => {
      socket.join('staff');
      console.log(`Socket ${socket.id} joined staff room`);
      // Send current state
      socket.emit('current_active_orders', activeOrders);
      socket.emit('order_history', orderHistory);
      if (currentMenu.length > 0) socket.emit('menu_updated', currentMenu);
    });
    
    // Guests might join a room for their specific order ID to listen for status updates
    socket.on('join_order', (orderId: string) => {
      socket.join(`order_${orderId}`);
      console.log(`Socket ${socket.id} joined order room: ${orderId}`);
    });

    // Handle new order placement
    socket.on('place_order', (order: any) => {
      const orderWithTime = { ...order, istTime: getISTTime(), startTime: Date.now() };
      console.log('New order received via socket:', orderWithTime.id);
      
      activeOrders.push(orderWithTime);
      orderHistory.push(orderWithTime);
      
      io.to('staff').emit('new_order', orderWithTime);
      io.to('staff').emit('order_history', orderHistory);
      io.to('staff').emit('current_active_orders', activeOrders);
    });

    // Handle order/item status updates from staff to guests
    socket.on('update_order_status', (data: { orderId: string, status: string, tableNumber?: string }) => {
      console.log(`Updating order ${data.orderId} status to ${data.status}`);
      
      // Update in memory
      const orderIdx = activeOrders.findIndex(o => o.id === data.orderId);
      if (orderIdx >= 0) {
        activeOrders[orderIdx].status = data.status;
        if (data.status === 'CLOSED') {
          activeOrders.splice(orderIdx, 1);
        }
      } else if (data.status === 'CLOSED' && data.tableNumber) {
        // Handle "Close Table" which might close all orders for that table
        for (let i = activeOrders.length - 1; i >= 0; i--) {
          if (activeOrders[i].tableNumber === data.tableNumber) {
            activeOrders.splice(i, 1);
          }
        }
      }
      io.to('staff').emit('order_status_updated', data);
      io.to(`order_${data.orderId}`).emit('order_status_updated', data);
      io.to('staff').emit('current_active_orders', activeOrders);
    });

    // Reset Session (Admin)
    socket.on('reset_session', () => {
      // activeOrders.length = 0;  // Preserving active queue
      orderHistory.length = 0;
      // Emit cleared history
      io.to('staff').emit('order_history', []);
      // Notify Admin UI to clear revenue charts, passing activeOrders to rebuild live charts
      io.to('staff').emit('admin_revenue_reset', activeOrders);
      console.log('Session revenue reset by admin');
    });

    // Menu Management (Admin)
    socket.on('update_full_menu', (menu: any[]) => {
      currentMenu = menu;
      io.emit('menu_updated', currentMenu);
    });

    // Handle Waiter Calling
    socket.on('call_waiter', (data: { tableNumber: string }) => {
      console.log(`[SOCKET] Table ${data.tableNumber} is calling for service!`);
      io.emit('waiter_called', { 
        tableNumber: data.tableNumber,
        timestamp: getISTTime()
      });
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}
