import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { io } from 'socket.io-client';
import { Package, Check, X, Trash2, ChevronDown, ChevronRight, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getCurrentHourLabel = () => {
  const hour = new Date().getHours();
  const ampm = hour >= 12 ? 'pm' : 'am';
  const displayHour = hour % 12 || 12;
  return `${displayHour}${ampm}`;
};

const mockData = [
  { name: '12pm', orders: 12 },
  { name: '1pm', orders: 19 },
  { name: '2pm', orders: 15 },
  { name: '3pm', orders: 8 },
  { name: '4pm', orders: 5 },
  { name: '5pm', orders: 14 },
  { name: '6pm', orders: 28 },
  { name: '7pm', orders: 45 },
  { name: '8pm', orders: 52 },
  { name: '9pm', orders: 41 },
];

import { MOCK_CATEGORIES, MOCK_ITEMS } from '../MenuData';

const initialMappedItems = MOCK_ITEMS.map((i: any) => {
  const cat = MOCK_CATEGORIES.find((c: any) => c.id === i.categoryId);
  return {
    id: i.id,
    name: i.name,
    category: cat ? cat.name : i.categoryId.replace('cat-', ''),
    price: i.price,
    available: (i as any).available !== false,
    isChefsPick: !!(i as any).isChefsPick
  }
});

export default function AdminDashboard() {
  const [items, setItems] = useState<any[]>(initialMappedItems);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [revenue, setRevenue] = useState(142500);
  const [dailyIncome, setDailyIncome] = useState(0); 
  const [orderLogs, setOrderLogs] = useState<any[]>([]);
  const [activeOrdersList, setActiveOrdersList] = useState<any[]>([]);
  const [now, setNow] = useState(Date.now());
  const [chartData, setChartData] = useState(mockData);
  const [toasts, setToasts] = useState<{id: number, message: string}[]>([]);
  const [top5Items, setTop5Items] = useState([
    { name: 'Truffle Edamame Dumplings', count: 100 },
    { name: 'Miso Glazed Black Cod', count: 85 },
    { name: 'Spicy Tuna Crispy Rice', count: 70 },
    { name: 'Matcha Lava Cake', count: 55 },
    { name: 'Yuzu Margarita', count: 40 }
  ]);
  const [socket, setSocket] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: 'Asian', price: 0 });

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  const syncMenuWithSocket = (newItems: any[]) => {
    if (!socket) return;
    socket.emit('update_full_menu', newItems.map(ni => ({
      id: ni.id,
      name: ni.name,
      price: ni.price,
      categoryId: MOCK_CATEGORIES.find(c => c.name === ni.category)?.id || `cat-${ni.category.toLowerCase()}`,
      isVeg: true, // simplified mock logic
      available: ni.available,
      isChefsPick: !!ni.isChefsPick
    })));
  };

  // Initialize Socket
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
    const newSocket = io(backendUrl);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join_staff');
    });

    newSocket.on('order_history', (history: any[]) => {
      setOrderLogs(history);
      const income = history.reduce((sum, o) => sum + o.total, 0);
      setDailyIncome(income);
    });

    newSocket.on('admin_revenue_reset', (activeOrders: any[]) => {
      setOrderLogs([]);
      setDailyIncome(0);
      setActiveOrdersList(activeOrders || []);
      const newChartData = mockData.map(d => ({...d}));
      const newTopItems = [
        { name: 'Truffle Edamame Dumplings', count: 100 },
        { name: 'Miso Glazed Black Cod', count: 85 },
        { name: 'Spicy Tuna Crispy Rice', count: 70 },
        { name: 'Matcha Lava Cake', count: 55 },
        { name: 'Yuzu Margarita', count: 40 }
      ];

      if (activeOrders && activeOrders.length > 0) {
        activeOrders.forEach(order => {
          // Update Chart
          const hourLabel = getCurrentHourLabel();
          const dIdx = newChartData.findIndex(d => d.name === hourLabel);
          if (dIdx >= 0) newChartData[dIdx].orders += 1;

          // Update Top Items
          if (order.items) {
            order.items.forEach((item: any) => {
              const tiIdx = newTopItems.findIndex(ti => ti.name === item.name);
              if (tiIdx >= 0) {
                newTopItems[tiIdx].count += item.quantity;
              } else {
                newTopItems.push({ name: item.name, count: item.quantity });
              }
            });
          }
        });
      }

      setChartData(newChartData);
      setTop5Items(newTopItems.sort((a, b) => b.count - a.count).slice(0, 5));
    });

    newSocket.on('menu_updated', (updatedMenu: any[]) => {
      setItems(updatedMenu.map(m => ({
        id: m.id.toString(),
        name: m.name,
        category: MOCK_CATEGORIES.find(c => c.id === m.categoryId)?.name || m.categoryId.replace('cat-', ''),
        price: m.price,
        available: m.available !== false,
        isChefsPick: !!m.isChefsPick
      })));
    });

    newSocket.on('current_active_orders', (orders: any[]) => {
      setActiveOrdersList(orders || []);
      const newChartData = mockData.map(d => ({...d}));
      const newTopItems = [
        { name: 'Truffle Edamame Dumplings', count: 100 },
        { name: 'Miso Glazed Black Cod', count: 85 },
        { name: 'Spicy Tuna Crispy Rice', count: 70 },
        { name: 'Matcha Lava Cake', count: 55 },
        { name: 'Yuzu Margarita', count: 40 }
      ];

      orders.forEach(order => {
        // Update Chart
        const hourLabel = getCurrentHourLabel();
        const dIdx = newChartData.findIndex(d => d.name === hourLabel);
        if (dIdx >= 0) newChartData[dIdx].orders += 1;

        // Update Top Items
        order.items.forEach((item: any) => {
          const tiIdx = newTopItems.findIndex(ti => ti.name === item.name);
          if (tiIdx >= 0) {
            newTopItems[tiIdx].count += item.quantity;
          } else {
            newTopItems.push({ name: item.name, count: item.quantity });
          }
        });
      });

      setChartData(newChartData);
      setTop5Items(newTopItems.sort((a, b) => b.count - a.count).slice(0, 5));
    });

    newSocket.on('new_order', (order: any) => {
      // Notification
      const newToastId = Date.now();
      setToasts(prev => [...prev, { id: newToastId, message: `Order #${order.id.slice(-4)} Received (₹${order.total})` }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToastId));
      }, 5000);

      // We rely on order_history event to update revenue and logs
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Grouping tables for the occupancy tracker
  const occupiedTables = activeOrdersList.reduce((acc: any, order: any) => {
    if (!acc[order.tableNumber]) {
      acc[order.tableNumber] = {
        tableNumber: order.tableNumber,
        startTime: order.startTime || Date.now(),
        total: 0
      };
    }
    acc[order.tableNumber].total += order.total;
    if (order.startTime && order.startTime < acc[order.tableNumber].startTime) {
       acc[order.tableNumber].startTime = order.startTime;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-teal-900 p-8">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-4xl font-bold mb-2">Admin CMS</h1>
          <p className="text-teal-900/70">Resqro</p>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to reset all session data?')) {
                socket.emit('reset_session');
                setRevenue(142500);
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-red-600 transition shadow-lg"
          >
            Reset Session
          </button>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-teal-900/5 text-center">
             <p className="text-xs text-teal-900/60 uppercase font-semibold mb-1">Total Revenue</p>
             <p className="font-playfair text-2xl font-bold text-gold-500">₹{(revenue + dailyIncome).toLocaleString()}</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-teal-900/5 text-center">
             <p className="text-xs text-teal-900/60 uppercase font-semibold mb-1">Daily Income</p>
             <p className="font-playfair text-2xl font-bold text-teal-700">₹{dailyIncome.toLocaleString()}</p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Analytics Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-900/5">
             <h2 className="font-playfair text-2xl font-semibold mb-6">Hourly Orders Heatmap</h2>
             <div className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#0B6E4F" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#0B6E4F" opacity={0.5} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: '#F7F4EF'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(11,110,79,0.1)' }}
                    />
                    <Bar dataKey="orders" fill="#C9973A" radius={[4, 4, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* Menu Management Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-teal-900/5 overflow-hidden">
             <div className="p-6 border-b border-teal-900/10 flex items-center justify-between">
               <h2 className="font-playfair text-2xl font-semibold">Menu Management</h2>
               <button 
                onClick={() => setShowAddModal(true)}
                className="bg-teal-900 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-800 transition shadow-md"
               >
                 + Add Items
               </button>
             </div>
             <div className="space-y-4">
               {MOCK_CATEGORIES.map(cat => {
                 const catItems = cat.id === 'cat-chefspicks'
                   ? items.filter(i => i.isChefsPick || i.category === cat.name || i.category.toLowerCase() === cat.name.toLowerCase())
                   : items.filter(i => i.category === cat.name || i.category.toLowerCase() === cat.name.toLowerCase());
                 if (catItems.length === 0) return null;
                 
                 const isExpanded = expandedCategories[cat.id];
                 
                 return (
                   <div key={cat.id} className="border border-teal-900/10 rounded-xl overflow-hidden bg-white shadow-sm">
                     <button 
                       onClick={() => setExpandedCategories(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                       className="w-full flex items-center justify-between p-4 bg-[#F7F4EF] hover:bg-[#EFEBE3] transition"
                     >
                       <span className="font-playfair text-xl font-bold text-teal-900">{cat.name} <span className="text-teal-900/40 text-sm ml-2 font-sans">({catItems.length})</span></span>
                       {isExpanded ? <ChevronDown className="text-teal-900/60" /> : <ChevronRight className="text-teal-900/60" />}
                     </button>
                     
                     <AnimatePresence>
                       {isExpanded && (
                         <motion.div
                           initial={{ height: 0 }}
                           animate={{ height: 'auto' }}
                           exit={{ height: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="overflow-x-auto visual-scrollbar w-full">
                           <table className="w-full text-left min-w-[700px]">
                             <thead>
                               <tr className="text-xs text-teal-900/50 uppercase bg-white border-b border-teal-900/5">
                                 <th className="font-medium px-6 py-3">Item Name</th>
                                 <th className="font-medium px-6 py-3">Price</th>
                                 <th className="font-medium px-4 py-3 text-center">Status</th>
                                 <th className="font-medium px-4 py-3 text-center">Deal / Pick</th>
                                 <th className="font-medium px-6 py-3 text-right">Actions</th>
                               </tr>
                             </thead>
                             <tbody>
                               {catItems.map(item => (
                                 <tr key={item.id} className={`border-b border-teal-900/5 hover:bg-teal-50/30 transition-colors`}>
                                   <td className="px-6 py-4 font-semibold text-sm">{item.name}</td>
                                   <td className="px-6 py-4 text-gold-500 font-semibold text-sm">₹{item.price}</td>
                                   <td className="px-4 py-4 text-center">
                                     <div className="flex items-center justify-center gap-1 bg-[#F7F4EF] p-1 rounded-full w-max mx-auto border border-teal-900/10 shadow-inner">
                                       <button
                                         onClick={() => {
                                           if(item.available) return;
                                           const newItems = items.map(i => i.id === item.id ? { ...i, available: true } : i);
                                           setItems(newItems);
                                           syncMenuWithSocket(newItems);
                                         }}
                                         className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${item.available ? 'bg-green-500 text-white shadow-md scale-105' : 'text-stone-300 hover:text-green-500 hover:bg-green-50'}`}
                                         title="Mark Available"
                                       >
                                         <Check size={14} strokeWidth={item.available ? 3 : 2} />
                                       </button>
                                       <button
                                         onClick={() => {
                                           if(!item.available) return;
                                           const newItems = items.map(i => i.id === item.id ? { ...i, available: false } : i);
                                           setItems(newItems);
                                           syncMenuWithSocket(newItems);
                                         }}
                                         className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${!item.available ? 'bg-red-500 text-white shadow-md scale-105' : 'text-stone-300 hover:text-red-500 hover:bg-red-50'}`}
                                         title="Mark Unavailable"
                                       >
                                         <X size={14} strokeWidth={!item.available ? 3 : 2} />
                                       </button>
                                     </div>
                                   </td>
                                   <td className="px-4 py-4 text-center">
                                     <button
                                       onClick={() => {
                                         const newItems = items.map(i => i.id === item.id ? { ...i, isChefsPick: !i.isChefsPick } : i);
                                         setItems(newItems);
                                         syncMenuWithSocket(newItems);
                                       }}
                                       className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mx-auto border border-teal-900/5 ${item.isChefsPick ? 'bg-gold-100 text-gold-500 shadow-sm scale-105' : 'text-stone-300 hover:text-gold-500 hover:bg-gold-50 bg-[#F7F4EF]'}`}
                                       title={item.isChefsPick ? "Remove from Chef's Picks / Deals" : "Add to Chef's Picks / Deals"}
                                     >
                                       <Star size={14} fill={item.isChefsPick ? "currentColor" : "none"} className={item.isChefsPick ? "text-gold-500" : "text-stone-300"} strokeWidth={2} />
                                     </button>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                     <button 
                                      onClick={() => {
                                        if (!confirm(`Are you sure you want to permanently remove ${item.name}?`)) return;
                                        const newItems = items.filter(i => i.id !== item.id);
                                        setItems(newItems);
                                        syncMenuWithSocket(newItems);
                                      }}
                                      className="text-red-500/70 hover:text-red-600 transition p-2 bg-red-50 rounded-lg hover:bg-red-100 inline-flex items-center"
                                      title="Remove completely from menu"
                                     >
                                       <Trash2 size={16} />
                                     </button>
                                   </td>
                                 </tr>
                               ))}
                             </tbody>
                           </table>
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           {/* Occupancy Tracker */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-900/5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-playfair text-xl font-semibold">Live Occupancy</h2>
                <span className="bg-teal-700 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">
                  {Object.keys(occupiedTables).length} Tables
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(occupiedTables).length === 0 ? (
                  <p className="text-sm text-teal-900/40 italic col-span-2">No active tables.</p>
                ) : (
                  Object.values(occupiedTables).map((t: any) => (
                    <div key={t.tableNumber} className="bg-[#F7F4EF] p-3 rounded-xl border border-teal-900/10 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                         <span className="font-playfair font-bold text-lg text-teal-900">T{t.tableNumber}</span>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                           <Clock size={10} />
                           {Math.floor((now - t.startTime) / 60000)}m
                         </span>
                      </div>
                      <div className="text-xs font-semibold text-teal-700/60 uppercase">
                        ₹{t.total}
                      </div>
                    </div>
                  ))
                )}
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-900/5">
             <h2 className="font-playfair text-xl font-semibold mb-4">Top 5 Items</h2>
              <div className="space-y-4">
                {top5Items.map((item, index) => (
                   <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-sm">{index+1}. {item.name}</span>
                    <span className="text-xs text-gold-500 font-bold bg-gold-500/10 px-2 py-1 rounded-md">{item.count} ord</span>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-900/5 h-[400px] flex flex-col">
              <h2 className="font-playfair text-xl font-semibold mb-4">Order Logs (Live)</h2>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 visual-scrollbar">
                {orderLogs.length === 0 ? (
                  <p className="text-sm text-teal-900/40 italic">No orders yet this session...</p>
                ) : (
                  orderLogs.slice().reverse().map((log) => (
                    <div key={log.id} className="p-3 bg-[#F7F4EF] rounded-xl border border-teal-900/5">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-xs text-teal-900">Table {log.tableNumber}</span>
                        <span className="text-[10px] text-teal-900/40 font-bold uppercase">{log.istTime} IST</span>
                      </div>
                      <div className="text-[11px] text-teal-900/70 mb-2">
                        {log.items?.map((it: any) => it.name).join(', ') || 'Item data unavailable'}
                      </div>
                      <div className="font-bold text-gold-500 text-xs">₹{log.total}</div>
                    </div>
                  ))
                )}
              </div>
           </div>
        </div>
      </div>

      {/* Add Item Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-teal-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="font-playfair text-2xl font-bold mb-6">Add New Item</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-teal-900/40 block mb-2">Item Name</label>
                  <input 
                    type="text" 
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="w-full bg-[#F7F4EF] rounded-xl px-4 py-3 border border-teal-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="e.g. Salmon Aburi"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-teal-900/40 block mb-2">Category</label>
                  <select 
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full bg-[#F7F4EF] rounded-xl px-4 py-3 border border-teal-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {MOCK_CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-teal-900/40 block mb-2">Price (₹)</label>
                  <input 
                    type="number" 
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value)})}
                    className="w-full bg-[#F7F4EF] rounded-xl px-4 py-3 border border-teal-900/5 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <button 
                  onClick={() => {
                    const id = `item-${Date.now()}`;
                    const d = { id, ...newItem, available: true };
                    const updatedItems = [...items, d];
                    setItems(updatedItems);
                    syncMenuWithSocket(updatedItems);
                    setShowAddModal(false);
                    setNewItem({ name: '', category: 'Asian', price: 0 });
                  }}
                  className="w-full bg-teal-900 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-teal-800 transition mt-4"
                >
                  Confirm & Add
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Admin Order Toasts */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-teal-900 text-stone-50 px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-4 border border-teal-700/50 pointer-events-auto"
            >
              <div className="bg-gold-500 p-2 rounded-lg">
                {/* @ts-ignore fix lucide type */}
                <Package size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-stone-50/50 uppercase tracking-tighter mb-0.5">Real-time Order</p>
                <p className="text-sm">{toast.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
