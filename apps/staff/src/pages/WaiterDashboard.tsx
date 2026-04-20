import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Clock, ChefHat } from 'lucide-react';
import { io } from 'socket.io-client';
import { MOCK_TABLES } from '../mockData';

export default function WaiterDashboard() {
  const [tables, setTables] = useState(MOCK_TABLES);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [socket, setSocket] = useState<any>(null);
  const [toasts, setToasts] = useState<{id: number, message: string}[]>([]);
  const [now, setNow] = useState(Date.now());

  // Ticking heartbeat for rendering elapsed time automatically
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Socket
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    const newSocket = io(backendUrl);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Dashboard connected to socket');
      newSocket.emit('join_staff');
    });

    newSocket.on('current_active_orders', (orders: any[]) => {
      setTables(prevTables => {
        return prevTables.map(table => {
          const tableOrders = orders.filter(o => parseInt(o.tableNumber) === table.number);
          if (tableOrders.length === 0) {
            // Keep existing CALLING alert
            if (table.activeOrder?.status === 'CALLING') {
              return table;
            }
            return { ...table, activeOrder: null };
          }

          // Aggregate all orders for this table
          const aggregatedItems = tableOrders.flatMap(o => o.items);
          const totalAmount = tableOrders.reduce((sum, o) => sum + o.total, 0);
          
          // Preserve needsAttention if waiter was called on this existing order, otherwise rely on RECEIVE status
          const needsAttention = tableOrders.some(o => o.status === 'RECEIVED') || !!table.activeOrder?.needsAttention;

          return {
            ...table,
            activeOrder: {
              id: tableOrders[0].id, // Use first order id as session ref
              tableNumber: table.number.toString(),
              items: aggregatedItems,
              totalAmount: totalAmount,
              status: needsAttention ? 'RECEIVED' : 'CONFIRMED',
              startTime: tableOrders[0].startTime || Date.now(),
              timeElapsed: 0,
              needsAttention: needsAttention
            }
          };
        });
      });
    });

    newSocket.on('new_order', (order: any) => {
      console.log('--- NEW ORDER RECEIVED ---', order.id, 'Table:', order.tableNumber);
      
      const newToastId = Date.now();
      setToasts(prev => [...prev, { id: newToastId, message: `New Order from Table ${order.tableNumber}` }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToastId));
      }, 5000);

      setTables(prevTables => {
        const nextState = prevTables.map(table => {
          if (table.number !== parseInt(order.tableNumber)) return table;

          // If table already has an active order, append to it
          if (table.activeOrder) {
            console.log('AGGREGATING to Table', table.number, 'Current items:', table.activeOrder.items.length);
            return {
              ...table,
              activeOrder: {
                ...table.activeOrder,
                items: [...table.activeOrder.items, ...order.items],
                totalAmount: table.activeOrder.totalAmount + order.total,
                needsAttention: true
              }
            };
          }

          // Fresh order for the table
          console.log('NEW ACTIVE ORDER for Table', table.number);
          return {
            ...table,
            activeOrder: {
              id: order.id,
              tableNumber: order.tableNumber.toString(),
              items: [...order.items],
              totalAmount: order.total,
              status: 'RECEIVED',
              startTime: order.startTime || Date.now(),
              timeElapsed: 0,
              needsAttention: true
            }
          };
        });
        return nextState;
      });
    });

    newSocket.on('order_status_updated', (data: any) => {
       if (data.status === 'CLOSED' && data.tableNumber) {
         setTables(prev => prev.map(t => t.number.toString() === data.tableNumber ? { ...t, activeOrder: null } : t));
       }
    });

    newSocket.on('waiter_called', (data: { tableNumber: string, timestamp: string }) => {
      console.log('DEBUG: WAITER CALLED EVENT RECEIVED', data);
      
      const newToastId = Date.now();
      setToasts(prev => [...prev, { 
        id: newToastId, 
        message: `TABLE ${data.tableNumber} IS REQUESTING SERVICE!` 
      }]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToastId));
      }, 8000); // Waiter calls stay slightly longer

      setTables(prevTables => {
        return prevTables.map(table => {
          if (table.number.toString() !== data.tableNumber) return table;
          
          // If no active order, create a temporary "attention" state or just highlight it
          return {
            ...table,
            activeOrder: table.activeOrder ? {
              ...table.activeOrder,
              needsAttention: true
            } : {
              id: `call-${Date.now()}`,
              tableNumber: data.tableNumber,
              items: [],
              totalAmount: 0,
              status: 'CALLING',
              startTime: Date.now(),
              timeElapsed: 0,
              needsAttention: true
            }
          };
        });
      });
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-teal-900 text-stone-50 p-6">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-gold-500 mb-1">Waiter Dashboard</h1>
          <p className="text-stone-50/70">Resqro</p>
        </div>
        <div className="flex gap-4">
           {/* Status legends */}
           <div className="flex items-center gap-2 text-sm text-stone-50/60">
             <div className="w-3 h-3 rounded-full bg-gold-500"></div> Pending
           </div>
           <div className="flex items-center gap-2 text-sm text-stone-50/60">
             <div className="w-3 h-3 rounded-full bg-teal-700"></div> Confirmed
           </div>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {tables.map(table => (
          <motion.div
            key={table.id}
            onClick={() => table.activeOrder && setSelectedTable(table)}
            animate={table.activeOrder?.needsAttention ? {
               boxShadow: ['0px 0px 0px rgba(11,110,79,0)', '0px 0px 20px rgba(11,110,79,0.8)', '0px 0px 0px rgba(11,110,79,0)']
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${table.activeOrder ? 'bg-teal-800 border-teal-700 shadow-xl' : 'bg-teal-950 border-teal-900/40 hover:bg-teal-900/80 hover:border-teal-800'}`}
          >
            <h2 className={`font-playfair text-6xl font-black absolute top-4 right-4 pointer-events-none transition-all ${table.activeOrder ? 'text-white opacity-[0.15]' : 'text-stone-50 opacity-[0.05]'}`}>
              {table.number}
            </h2>
            
            <div className="relative z-10">
              <h3 className={`font-bold text-2xl mb-4 font-playfair flex items-center gap-2 ${table.activeOrder ? 'text-white' : 'text-stone-50/60'}`}>
                <span className={`font-serif ${table.activeOrder ? 'text-gold-500' : 'text-gold-500/60'}`}>T</span>{table.number}
              </h3>

              {table.activeOrder ? (
                <div className="space-y-3 pt-6 border-t border-teal-700/50">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-bold text-stone-50/40">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {table.activeOrder.startTime ? Math.floor((now - table.activeOrder.startTime) / 60000) : table.activeOrder.timeElapsed}m
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat size={12} /> {table.activeOrder.items.length} ITMS
                    </span>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <div className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                      table.activeOrder.status === 'RECEIVED' ? 'bg-gold-500/10 text-gold-500 border-gold-500/30' :
                      table.activeOrder.status === 'CONFIRMED' ? 'bg-teal-700/50 text-teal-300 border-teal-500/20' : 'bg-stone-50/5 border-white/5'
                    }`}>
                      {table.activeOrder.status}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-6 border-t border-teal-800/50 text-stone-50/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Available
                </div>
              )}
            </div>

            {table.activeOrder?.needsAttention && (
               <div className="absolute -top-3 -left-3 w-9 h-9 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] text-white z-20 border-2 border-teal-900 group">
                 <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-75" />
                 <Bell size={16} className="relative z-10" />
               </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Simple Order Detail Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6" onClick={() => setSelectedTable(null)}>
          <div className="bg-teal-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-teal-700/50" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-3xl font-bold text-gold-500">
                Table {selectedTable.number}
              </h2>
              <button 
                onClick={() => setSelectedTable(null)} 
                className="w-10 h-10 rounded-full bg-teal-900 flex items-center justify-center hover:bg-teal-700 transition"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 mb-8">
               {selectedTable.activeOrder.items.map((item: any, i: number) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-teal-700 bg-teal-900/50">
                    <div>
                      <p className="font-semibold">{item.quantity}x {item.name}</p>
                      {item.notes && <p className="text-xs text-stone-50/50 mt-1">Note: {item.notes}</p>}
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full font-bold ${item.status === 'PENDING' ? 'bg-gold-500/20 text-gold-500' : 'bg-teal-700 text-stone-50'}`}>
                      {item.status}
                    </span>
                 </div>
               ))}
            </div>
            <div className="flex gap-4">
              <button 
                className="flex-1 py-3 rounded-full bg-teal-700 font-bold hover:bg-teal-600 transition"
                onClick={() => {
                   const newTables = [...tables];
                   const idx = newTables.findIndex(t => t.id === selectedTable.id);
                   if(newTables[idx].activeOrder) {
                       newTables[idx].activeOrder!.needsAttention = false;
                       newTables[idx].activeOrder!.status = 'CONFIRMED';
                       
                       // Emit status update back to guest
                       if (socket) {
                         socket.emit('update_order_status', { 
                           orderId: selectedTable.activeOrder.id, 
                           status: 'CONFIRMED' 
                         });
                       }
                   }
                   setTables(newTables);
                   setSelectedTable(null);
                }}
              >
                Mark Confirmed
              </button>
              <button 
                className="flex-1 py-3 rounded-full bg-stone-50/10 font-bold hover:bg-stone-50/20 transition"
                onClick={() => {
                   const newTables = [...tables];
                   const idx = newTables.findIndex(t => t.id === selectedTable.id);
                   const tableNum = newTables[idx].number.toString();
                   newTables[idx].activeOrder = null;
                   setTables(newTables);
                   setSelectedTable(null);

                   // Clear all active orders for this table in backend
                   if (socket) {
                     socket.emit('update_order_status', { 
                       orderId: 'BATCH_CLOSE',
                       status: 'CLOSED',
                       tableNumber: tableNum
                     });
                   }
                }}
              >
                Close Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="bg-gold-500 text-teal-900 px-6 py-4 rounded-xl shadow-[0_10px_40px_rgba(212,175,55,0.4)] font-bold flex items-center gap-3 border border-white/20 pointer-events-auto"
            >
              <div className="bg-teal-900 text-gold-500 p-1.5 rounded-full">
                <Bell size={16} className="animate-pulse" />
              </div>
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
