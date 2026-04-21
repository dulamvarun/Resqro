import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const CustomizationModal = ({ item, isOpen, onClose, onAddToCart }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    if (item) {
      setQuantity(item.quantity || 1);
      setNotes(item.notes || '');
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleAdd = () => {
    onAddToCart({ ...item, quantity, notes });
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-[#1a1a1a]/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-[60] bg-[#F7F4EF] rounded-t-3xl md:rounded-3xl p-6 shadow-[0_-8px_30px_rgba(11,110,79,0.12)] max-h-[90vh] overflow-y-auto border border-teal-900/10"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-teal-900/5 text-teal-900 hover:bg-teal-900/10 transition-colors">
              {/* @ts-expect-error fix lucide types */}
              <X size={20} />
            </button>

            <div className="mb-6">
              <h2 className="font-playfair text-2xl font-semibold text-teal-900 mb-2">{item.name}</h2>
              <p className="text-teal-900/70 text-sm">{item.description}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-teal-900 mb-2">Customisation <span className="font-normal text-teal-900/60">(Optional)</span></label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Make it extra spicy..."
                className="w-full bg-transparent border border-teal-900/20 rounded-xl p-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors resize-none h-24"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-teal-900">Quantity</span>
              <div className="flex items-center bg-teal-900/5 rounded-pill p-1 rounded-full">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-teal-900 hover:bg-white shadow-sm transition-all">-</button>
                <span className="w-8 text-center font-semibold text-teal-900">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-teal-900 hover:bg-white shadow-sm transition-all">+</button>
              </div>
            </div>

            <button 
              onClick={handleAdd}
              className="w-full bg-gold-500 text-white font-semibold py-4 rounded-full shadow-[0_4px_14px_rgba(201,151,58,0.4)] hover:shadow-[0_6px_20px_rgba(201,151,58,0.6)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Add to Order - ₹{item.price * quantity}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
