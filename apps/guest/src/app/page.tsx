"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, GlassWater, MapPin } from 'lucide-react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { MOCK_CATEGORIES, MOCK_ITEMS } from '@/components/MenuData';
import { ItemCard } from '@/components/ItemCard';

const CustomizationModal = dynamic(() => import('@/components/CustomizationModal').then(mod => ({ default: mod.CustomizationModal })), { ssr: false });
const CartDrawer = dynamic(() => import('@/components/CartDrawer').then(mod => ({ default: mod.CartDrawer })), { ssr: false });

export default function GuestMenu() {
  const searchParams = useSearchParams();
  const [tableNumber, setTableNumber] = useState(searchParams.get('table') || '7');
  
  const [socket, setSocket] = useState<any>(null);
  const [menu, setMenu] = useState<any[]>(MOCK_ITEMS);
  const [activeCategory, setActiveCategory] = useState(MOCK_CATEGORIES[0].id);
  const [vegActive, setVegActive] = useState(false);
  const [nonVegActive, setNonVegActive] = useState(false);
  const [alcoholActive, setAlcoholActive] = useState(false);
  const [nonAlcoholActive, setNonAlcoholActive] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ items: any[], total: number } | null>(null);
  const [waiterCallStatus, setWaiterCallStatus] = useState<boolean>(false);

  // Drag to scroll logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Initialize Socket
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
    const newSocket = io(backendUrl);
    setSocket(newSocket);

    newSocket.on('menu_updated', (updatedMenu: any[]) => {
      console.log('Live Menu Updated:', updatedMenu);
      setMenu(updatedMenu.filter(m => m.available !== false));
    });

    newSocket.on('order_status_updated', (data: any) => {
      console.log('Status Update:', data);
      // We could update local state here if needed
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSelectItem = (categoryId: string) => {
    setActiveCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load cart from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('resqro_cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Save cart to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('resqro_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item: any) => {
    if (item.cartIndex !== undefined) {
      const newCart = [...cartItems];
      const index = item.cartIndex;
      delete item.cartIndex;
      newCart[index] = item;
      setCartItems(newCart);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const handleUpdateQuantity = (item: any, delta: number, cartIndex?: number) => {
    const updatedCart = [...cartItems];
    let index = cartIndex;
    if (index === undefined) {
      index = updatedCart.findIndex(ci => ci.id === item.id && !ci.notes);
    }

    if (index !== undefined && index >= 0) {
      updatedCart[index].quantity += delta;
      if (updatedCart[index].quantity <= 0) {
        updatedCart.splice(index, 1);
      }
      setCartItems(updatedCart);
    } else if (delta > 0) {
      setCartItems([...updatedCart, { ...item, quantity: delta, notes: '' }]);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const handleCustomiseFromMenu = (item: any) => {
    // Try to find if this item is ALREADY in the cart
    // We prefer the one that has notes, but any instance works as a starting point
    let cartItemIndex = cartItems.findIndex(ci => ci.id === item.id && ci.notes);
    if (cartItemIndex === -1) {
      cartItemIndex = cartItems.findIndex(ci => ci.id === item.id);
    }

    if (cartItemIndex >= 0) {
      const existingInCart = cartItems[cartItemIndex];
      setSelectedItem({ 
        ...existingInCart, 
        cartIndex: cartItemIndex,
        // Ensure values are present for modal
        quantity: existingInCart.quantity || 1,
        notes: existingInCart.notes || '' 
      });
    } else {
      // Fresh customization
      setSelectedItem({ ...item, quantity: 1, notes: '' });
    }
  };

  const handlePlaceOrder = () => {
    const orderData = {
      id: `ord-${Date.now()}`,
      tableNumber,
      items: [...cartItems],
      total: cartTotal,
      status: 'RECEIVED',
      timeElapsed: 0,
      timestamp: new Date().toISOString()
    };

    setLastOrder({ items: orderData.items, total: orderData.total });
    
    // Emit via socket
    if (socket) {
      console.log('Emitting place_order:', orderData);
      socket.emit('place_order', orderData);
      socket.emit('join_order', orderData.id);
    }

    setIsCartOpen(false);
    setOrderConfirmed(true);
    setCartItems([]);
    sessionStorage.removeItem('resqro_cart');
  };

  const handleCallWaiter = () => {
    if (socket) {
      console.log('--- CALLING WAITER ---', { tableNumber });
      socket.emit('call_waiter', { tableNumber });
      setWaiterCallStatus(true);
      setTimeout(() => setWaiterCallStatus(false), 3000);
    } else {
      console.error('--- SOCKET NOT INITIALIZED ---');
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const mockMenuItems = [
  { id: '1', name: 'Truffle Edamame Dumplings', category: 'Asian', price: 650, available: true },
  { id: '2', name: 'Miso Glazed Black Cod', category: 'Asian', price: 1800, available: true },
  { id: '3', name: 'Spicy Salmon Tartare', category: 'Starters', price: 950, available: false },
  { id: '4', name: 'Matcha Lava Cake', category: 'Desserts', price: 550, available: true },
];
  const cartBar = (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-6 right-6 z-50 px-2"
        >
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-teal-950 text-stone-50 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-5 flex items-center justify-between border border-white/5 overflow-hidden group hover:bg-teal-900 transition-colors"
          >
             <div className="absolute inset-0 bg-gold-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
             <div className="flex items-center gap-4 relative z-10">
               <div className="bg-gold-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                 {cartCount}
               </div>
               <div>
                 <span className="font-bold text-lg block leading-none">View Order</span>
                 <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500/80 font-bold mt-1 block">Luxury Dining</span>
               </div>
             </div>
             <div className="flex flex-col items-end relative z-10">
               <span className="text-xs text-stone-50/40 font-bold uppercase tracking-widest mb-1">Total Amount</span>
               <span className="font-playfair text-2xl text-gold-500 font-bold italic">₹{cartTotal}</span>
             </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (orderConfirmed && lastOrder) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#F7F4EF] flex flex-col p-6"
      >
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-24 h-24 rounded-full border border-gold-500/30 flex items-center justify-center mb-6 relative"
          >
             <motion.div 
               animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
               transition={{ repeat: Infinity, duration: 3 }}
               className="absolute inset-0 rounded-full border border-gold-500"
             />
             <CheckCircle size={32} className="text-gold-500" />
          </motion.div>
          <h1 className="font-playfair text-3xl text-teal-900 mb-2 font-bold">Order Confirmed</h1>
          <p className="text-teal-900/60 mb-8 max-w-xs mx-auto">
            Our chefs have started preparing your selections for <strong>Table {tableNumber}</strong>.
          </p>

          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-premium border border-teal-900/5 mb-8">
            <div className="flex items-center justify-between mb-4 border-b border-teal-900/5 pb-4">
              <span className="text-sm font-bold text-teal-900/40 uppercase tracking-widest">Your Summary</span>
              <span className="text-xs bg-teal-900/5 px-2 py-1 rounded text-teal-900 font-bold uppercase tracking-tighter">Est: 15-20 Mins</span>
            </div>
            <div className="space-y-3 mb-6">
              {lastOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-teal-900/80 font-medium">{item.quantity}× {item.name}</span>
                  <span className="text-teal-900/40 font-bold italic">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-teal-900/5">
              <span className="font-bold text-teal-900">Total Charged</span>
              <span className="font-playfair text-xl text-gold-500 font-bold">₹{lastOrder.total}</span>
            </div>
          </div>

          <button 
            onClick={() => setOrderConfirmed(false)}
            className="text-gold-600 font-bold hover:underline"
          >
            Back to Menu
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <main className="min-h-screen pb-32">
      {/* Header with Back Button */}
      <header className="px-6 py-4 relative overflow-hidden flex items-center justify-between">
         <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={12} className="text-gold-500" />
              <p className="text-xs tracking-widest uppercase text-teal-900/60 font-bold">Table {tableNumber}</p>
            </div>
            <h1 className="font-playfair text-2xl text-teal-900 font-black mb-0.5">Resqro</h1>
         </div>
      </header>

      {/* Call Waiter Button - Fixed Position */}
      <button 
        onClick={handleCallWaiter}
        className="fixed bottom-[80px] right-[16px] z-40 bg-teal-900 text-white rounded-full px-6 py-3 flex items-center gap-3 hover:bg-teal-800 hover:-translate-y-1 transition-all duration-300 group active:scale-95 border border-gold-500/30"
      >
        <div className="relative">
          <Bell size={20} className="text-gold-500 group-hover:animate-ring" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-teal-900 animate-pulse" />
        </div>
        <span className="font-bold text-sm tracking-tight text-white">Call Waiter</span>
      </button>

      {/* Waiter Call Toast */}
      <AnimatePresence>
        {waiterCallStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-[140px] left-1/2 z-50 bg-teal-950 text-white px-6 py-3 rounded-2xl shadow-2xl border border-gold-500/30 flex items-center gap-3 whitespace-nowrap"
          >
            <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-bold text-sm tracking-tight">Waiter is on the way to Table {tableNumber}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category & Filter Tabs */}
      <div className="sticky top-0 z-30 bg-[#F7F4EF]/95 backdrop-blur-md border-b border-teal-900/10 px-6 py-4 flex flex-col gap-4 shadow-sm">
        <div 
          ref={scrollRef}
          onMouseDown={(e) => {
            setIsDragging(true);
            if (!scrollRef.current) return;
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
          }}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (!isDragging || !scrollRef.current) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 2;
            scrollRef.current.scrollLeft = scrollLeft - walk;
          }}
          className={`flex items-center gap-6 overflow-x-auto visual-scrollbar mask-gradient-x py-1 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
        >
          {MOCK_CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => handleSelectItem(cat.id)}
              className={`whitespace-nowrap pb-1 border-b-2 transition-all duration-300 ${
                activeCategory === cat.id 
                  ? 'border-gold-500 text-teal-900 font-bold'
                  : 'border-transparent text-teal-900/40 hover:text-teal-900 hover:border-teal-900/20'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dynamic Filters depending on Category Rendering */}
        {(activeCategory === 'cat-cocktails' || activeCategory === 'cat-bar') ? (
           <div className="flex items-center gap-[12px]">
              {/* Alcohol Toggle */}
              <div 
                onClick={() => setAlcoholActive(!alcoholActive)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[rgba(11,110,79,0.2)] bg-[#F7F4EF] cursor-pointer hover:bg-[#efede8] transition-colors shadow-sm"
              >
                <div className="w-5 h-5 flex items-center justify-center rounded-[4px] bg-gold-500/10 border border-gold-500/30">
                  <GlassWater size={14} className="text-gold-600" />
                </div>
                <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${alcoholActive ? 'bg-gold-500' : 'bg-stone-300'}`}>
                  <motion.div 
                    animate={{ x: alcoholActive ? 18 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-md"
                  />
                </div>
              </div>

              {/* Non-Alcohol Toggle */}
              <div 
                onClick={() => setNonAlcoholActive(!nonAlcoholActive)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[rgba(11,110,79,0.2)] bg-[#F7F4EF] cursor-pointer hover:bg-[#efede8] transition-colors shadow-sm"
              >
                <div className="w-5 h-5 flex items-center justify-center rounded-[4px] bg-teal-900/10 border border-teal-900/30 font-black text-[8px] text-teal-900">
                  0%
                </div>
                <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${nonAlcoholActive ? 'bg-teal-900' : 'bg-stone-300'}`}>
                  <motion.div 
                    animate={{ x: nonAlcoholActive ? 18 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-md"
                  />
                </div>
              </div>
           </div>
        ) : (
          <div className="flex items-center gap-[12px]">
             {/* Veg Toggle */}
             <div 
               onClick={() => setVegActive(!vegActive)}
               className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[rgba(11,110,79,0.2)] bg-[#F7F4EF] cursor-pointer hover:bg-[#efede8] transition-colors shadow-sm"
             >
               {/* FSSAI Veg Icon */}
               <div className="w-5 h-5 border-2 border-[#2E7D32] flex items-center justify-center rounded-[4px] bg-white">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#2E7D32]" />
               </div>
               
               {/* Toggle Switch */}
               <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${vegActive ? 'bg-[#2E7D32]' : 'bg-stone-300'}`}>
                 <motion.div 
                   animate={{ x: vegActive ? 18 : 2 }}
                   transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                   className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-md"
                 />
               </div>
             </div>

             {/* Non-Veg Toggle */}
             <div 
               onClick={() => setNonVegActive(!nonVegActive)}
               className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[rgba(11,110,79,0.2)] bg-[#F7F4EF] cursor-pointer hover:bg-[#efede8] transition-colors shadow-sm"
             >
               {/* FSSAI Non-Veg Icon */}
               <div className="w-5 h-5 border-2 border-[#C62828] flex items-center justify-center rounded-[4px] bg-white">
                 <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-[#C62828]" />
               </div>
               
               {/* Toggle Switch */}
               <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${nonVegActive ? 'bg-[#C62828]' : 'bg-stone-300'}`}>
                 <motion.div 
                   animate={{ x: nonVegActive ? 18 : 2 }}
                   transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                   className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-md"
                 />
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Menu List */}
      <div className="p-6">

        {/* Category Items */}
        <div>
          <h2 className="font-playfair text-2xl font-bold text-teal-900 mb-6">
            {MOCK_CATEGORIES.find(c => c.id === activeCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {(activeCategory === 'cat-cocktails' || activeCategory === 'cat-bar') ? (
              <>
                {/* Non-Alcoholic Section */}
                {menu
                  .filter(i => i.categoryId === activeCategory && !i.isAlcoholic)
                  .filter(i => {
                    const showAllAlco = (alcoholActive && nonAlcoholActive) || (!alcoholActive && !nonAlcoholActive);
                    return showAllAlco || nonAlcoholActive;
                  })
                  .length > 0 && (
                  <div className="mt-2 mb-4">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-teal-900/40 font-black mb-4 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-teal-900/10"></span>
                      Non-Alcoholic
                      <span className="flex-1 h-[1px] bg-teal-900/10"></span>
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {menu
                        .filter(i => i.categoryId === activeCategory && !i.isAlcoholic)
                        .filter(i => {
                          const showAllVeg = (vegActive && nonVegActive) || (!vegActive && !nonVegActive);
                          const passesVeg = showAllVeg ? true : (vegActive ? i.isVeg : !i.isVeg);
                          const showAllAlco = (alcoholActive && nonAlcoholActive) || (!alcoholActive && !nonAlcoholActive);
                          const passesAlco = showAllAlco ? true : !i.isAlcoholic;
                          return passesVeg && passesAlco;
                        })
                        .map((item, idx) => (
                          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                            <ItemCard item={item} quantity={cartItems.filter(ci => ci.id === item.id).reduce((sum, ci) => sum + ci.quantity, 0)} onUpdateQuantity={handleUpdateQuantity} onAddNote={handleCustomiseFromMenu} />
                          </motion.div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Alcoholic Section */}
                {menu
                  .filter(i => i.categoryId === activeCategory && i.isAlcoholic)
                  .filter(i => {
                    const showAllAlco = (alcoholActive && nonAlcoholActive) || (!alcoholActive && !nonAlcoholActive);
                    return showAllAlco || alcoholActive;
                  })
                  .length > 0 && (
                  <div className="mt-8 mb-4">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold-600 font-black mb-4 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-gold-500/20"></span>
                      {activeCategory === 'cat-bar' ? 'Bar Menu' : 'Alcoholic'}
                      <span className="flex-1 h-[1px] bg-gold-500/20"></span>
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {menu
                        .filter(i => i.categoryId === activeCategory && i.isAlcoholic)
                        .filter(i => {
                          const showAllVeg = (vegActive && nonVegActive) || (!vegActive && !nonVegActive);
                          const passesVeg = showAllVeg ? true : (vegActive ? i.isVeg : !i.isVeg);
                          const showAllAlco = (alcoholActive && nonAlcoholActive) || (!alcoholActive && !nonAlcoholActive);
                          const passesAlco = showAllAlco ? true : i.isAlcoholic;
                          return passesVeg && passesAlco;
                        })
                        .map((item, idx) => (
                          <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                            <ItemCard item={item} quantity={cartItems.filter(ci => ci.id === item.id).reduce((sum, ci) => sum + ci.quantity, 0)} onUpdateQuantity={handleUpdateQuantity} onAddNote={handleCustomiseFromMenu} />
                          </motion.div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              menu
                .filter(i => activeCategory === MOCK_CATEGORIES[0].id ? (i.isChefsPick || i.categoryId === activeCategory) : i.categoryId === activeCategory)
                .filter(i => {
                  const showAll = (vegActive && nonVegActive) || (!vegActive && !nonVegActive);
                  if (showAll) return true;
                  return vegActive ? i.isVeg : !i.isVeg;
                })
                .map((item, idx) => {
                  const quantityInCart = cartItems.filter(ci => ci.id === item.id).reduce((sum, ci) => sum + ci.quantity, 0);
                  return (
                    <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
                      <ItemCard item={item} quantity={quantityInCart} onUpdateQuantity={handleUpdateQuantity} onAddNote={handleCustomiseFromMenu} />
                    </motion.div>
                  );
                })
            )}
          </div>
        </div>
      </div>

      {/* Bottom Cart Bar - Sticky & Elegant */}
      {cartBar}

      {/* Modals & Drawers */}
      <CustomizationModal 
        isOpen={!!selectedItem} 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCustomise={(item: any, index: number) => setSelectedItem({ ...item, cartIndex: index })}
        onPlaceOrder={handlePlaceOrder}
        tableNumber={tableNumber}
        onTableChange={setTableNumber}
      />
    </main>
  );
}
