import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Edit2, Check, Plus, Minus } from 'lucide-react';

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem,
  onUpdateQuantity,
  onCustomise,
  onPlaceOrder,
  tableNumber,
  onTableChange
}: any) => {
  const total = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  const [isChangingTable, setIsChangingTable] = useState(false);

  const tables = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#1a1a1a]/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] z-50 bg-[#F7F4EF] shadow-2xl flex flex-col border-l border-teal-900/10"
          >
            <div className="p-6 border-b border-teal-900/10 flex items-center justify-between bg-[url('data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.85\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E')] before:absolute before:inset-0 before:opacity-[0.04] before:pointer-events-none overflow-hidden relative">
               <h2 className="font-playfair text-2xl font-semibold text-teal-900">Your Order</h2>
               <button onClick={onClose} className="p-2 rounded-full bg-teal-900/5 text-teal-900 hover:bg-teal-900/10 transition-colors z-10">
                 <X size={20} />
               </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6 flex-1">
              {/* Table Selection Section */}
              <div className="bg-white/50 rounded-2xl p-4 border border-teal-900/5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-900/40 uppercase tracking-widest">Dining Table</span>
                    <span className="bg-gold-500/10 text-gold-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">Verified</span>
                  </div>
                  <button 
                    onClick={() => setIsChangingTable(!isChangingTable)}
                    className="text-xs font-bold text-gold-600 flex items-center gap-1 hover:underline"
                  >
                    {isChangingTable ? 'Done' : (
                      <>
                        <Edit2 size={12} />
                        Change
                      </>
                    )}
                  </button>
                </div>
                
                {!isChangingTable ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-900 text-white flex items-center justify-center font-bold text-lg">
                      {tableNumber}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-teal-900 leading-none">Table {tableNumber}</p>
                      <p className="text-[10px] text-teal-900/40 font-medium">Resqro</p>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-4 gap-2 mt-3"
                  >
                    {tables.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          onTableChange(t);
                          // We don't close automatically so user can see selection
                        }}
                        className={`py-2 rounded-lg font-bold text-sm transition-all ${
                          tableNumber === t 
                            ? 'bg-teal-900 text-white shadow-lg scale-105' 
                            : 'bg-white text-teal-900/60 border border-teal-900/10 hover:border-teal-900/30'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <div className="py-20 flex flex-col items-center justify-center text-teal-900/50">
                    <p className="font-playfair text-xl mb-2">Your cart is empty</p>
                    <p className="text-sm">Add some items to get started.</p>
                  </div>
                ) : (
                  cartItems.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col pb-5 border-b border-teal-900/10 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-4 mb-4">
                         <div className="flex-1">
                           <h4 className="font-semibold text-teal-950 text-base leading-tight">{item.name}</h4>
                           {item.description && <p className="text-xs text-teal-900/60 leading-relaxed line-clamp-2 mt-1">{item.description}</p>}
                           {item.notes && <p className="text-[11px] text-teal-900/50 font-medium italic mt-1">Note: {item.notes}</p>}
                         </div>
                         <div className="flex items-center bg-[#F7F4EF] border border-[#d2cec4] rounded-full text-stone-800 w-24 justify-between p-1 shadow-sm shrink-0">
                           <button onClick={() => onUpdateQuantity(item, -1, index)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors">
                             {/* @ts-expect-error fix lucide types */}
                             <Minus size={14} strokeWidth={2.5} />
                           </button>
                           <span className="font-bold text-sm text-[#4a3f35]">{item.quantity}</span>
                           <button onClick={() => onUpdateQuantity(item, 1, index)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-stone-200 transition-colors">
                             {/* @ts-expect-error fix lucide types */}
                             <Plus size={14} strokeWidth={2.5} />
                           </button>
                         </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                         <button onClick={() => onCustomise(item, index)} className="text-[13px] font-semibold text-[#5c4a3d] hover:text-gold-600 transition-colors">
                           Customise
                         </button>
                         <span className="font-bold text-lg text-black tracking-tight">₹{item.price * item.quantity}/-</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
 
            {cartItems.length > 0 && (
              <div className="p-6 bg-white border-t border-teal-900/10 shadow-[0_-10px_30px_rgba(11,110,79,0.05)] mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-teal-900 font-semibold block leading-tight">Total Payable</span>
                    <span className="text-[10px] text-teal-900/40 uppercase tracking-widest font-bold font-dm-sans">Incl. all taxes</span>
                  </div>
                  <span className="font-playfair text-3xl font-bold text-gold-500">₹{total}</span>
                </div>
                <button 
                  onClick={onPlaceOrder}
                  className="w-full bg-gold-500 text-white font-bold py-4 rounded-full shadow-[0_4px_14px_rgba(201,151,58,0.4)] hover:shadow-[0_6px_20px_rgba(201,151,58,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Confirm Order
                  <Check size={20} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
