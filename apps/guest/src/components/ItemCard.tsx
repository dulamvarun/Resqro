import React from 'react';
import { Plus, Minus, Wine } from 'lucide-react';

export const ItemCard = ({ item, quantity, onUpdateQuantity, onAddNote }: any) => {
  return (
    <div className="flex bg-[#F7F4EF] rounded-2xl shadow-premium overflow-hidden mb-4 hover:shadow-lg transition duration-300 relative border border-teal-900/10">
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            {item.isAlcoholic ? (
              <div className="flex items-center gap-1 bg-gold-500/10 text-gold-700 px-1.5 py-0.5 rounded border border-gold-500/20 text-[9px] uppercase font-bold tracking-tighter">
                <Wine size={10} /> Alcohol
              </div>
            ) : (
              <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
              </div>
            )}
            <h3 className="font-playfair text-lg font-bold text-teal-900 leading-tight">{item.name}</h3>
          </div>
          <p className="text-xs text-teal-900/60 mb-3 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-gold-600 font-bold text-xl">₹{item.price}</p>
            
            {quantity > 0 ? (
              <div className="flex items-center bg-gold-500 rounded-full text-white shadow-lg w-28 justify-between p-1.5">
                <button onClick={() => onUpdateQuantity(item, -1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gold-600 transition-colors">
                  {/* @ts-expect-error fix lucide types */}
                  <Minus size={16} />
                </button>
                <span className="font-bold text-base">{quantity}</span>
                <button onClick={() => onUpdateQuantity(item, 1)} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gold-600 transition-colors">
                  {/* @ts-expect-error fix lucide types */}
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onUpdateQuantity(item, 1)} 
                className="flex items-center gap-2 bg-gold-500 text-white font-bold px-6 h-10 rounded-full shadow-md hover:bg-gold-600 hover:shadow-lg transition-all active:scale-95 group"
              >
                {/* @ts-expect-error fix lucide types */}
                ADD <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => onAddNote(item)} 
            className="text-[10px] uppercase tracking-wider text-teal-900/40 hover:text-gold-600 transition-colors flex items-center gap-1.5 font-bold bg-teal-900/5 px-2.5 py-1 rounded-md"
          >
            {/* @ts-expect-error fix lucide types */}
            <Plus size={10} /> Customise
          </button>
        </div>
      </div>
      {item.image && (
        <div className="w-32 h-auto relative overflow-hidden">
          <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gold-500/10 opacity-0 transition duration-300 pointer-events-none" />
        </div>
      )}
    </div>
  );
};
