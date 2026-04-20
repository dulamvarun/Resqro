export const MOCK_ORDERS = [
  {
    id: 'ord-1',
    tableId: '1',
    status: 'RECEIVED',
    totalAmount: 2450,
    items: [
      { id: 'i-1', name: 'Truffle Edamame Dumplings', quantity: 1, status: 'PENDING' },
      { id: 'i-2', name: 'Miso Glazed Black Cod', quantity: 1, status: 'PENDING' }
    ],
    timeElapsed: 5,
    needsAttention: true
  },
  {
    id: 'ord-2',
    tableId: '4',
    status: 'CONFIRMED',
    totalAmount: 950,
    items: [
      { id: 'i-3', name: 'Spicy Salmon Tartare', quantity: 1, status: 'CONFIRMED' }
    ],
    timeElapsed: 15,
    needsAttention: false
  }
];

export const MOCK_TABLES = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  number: i + 1,
  activeOrder: null as any
}));

export const STAFF_MENU_ITEMS = [
  // COCKTAILS
  { id: 'sig-1', name: 'Hawaiian Pond', price: 449, category: 'Cocktails', available: true },
  { id: 'sig-2', name: 'Pond Side Punch', price: 459, category: 'Cocktails', available: true },
  { id: 'sig-3', name: 'Resqro Punch', price: 509, category: 'Cocktails', available: true },
  { id: 'sig-4', name: 'Tancho 2.0', price: 559, category: 'Cocktails', available: true },
  { id: 'sig-5', name: 'Asaki', price: 559, category: 'Cocktails', available: true },
  { id: 'sig-6', name: 'Asaki Kiss', price: 559, category: 'Cocktails', available: true },
  { id: 'sig-7', name: 'Resqro Gang', price: 559, category: 'Cocktails', available: true },
  { id: 'sig-8', name: 'Ochiba', price: 609, category: 'Cocktails', available: true },
  { id: 'sig-9', name: 'Kakashi', price: 609, category: 'Cocktails', available: true },
  { id: 'sig-10', name: 'Resqro Tonic', price: 659, category: 'Cocktails', available: true },
  { id: 'sig-11', name: 'Upside Down', price: 1009, category: 'Cocktails', available: true },
  { id: 'sig-12', name: 'Together', price: 1209, category: 'Cocktails', available: true },
  { id: 'cls-1', name: 'Pinacolada', price: 449, category: 'Cocktails', available: true },
  { id: 'high-1', name: 'Long Island Iced Tea', price: 609, category: 'Cocktails', available: true },
  { id: 'sht-1', name: 'Kamikaze', price: 309, category: 'Cocktails', available: true },

  // STARTERS
  { id: 'bite-1', name: 'Peri Peri Fries', price: 259, category: 'Starters', available: true },
  { id: 'bite-2', name: 'Prawn Crackers', price: 259, category: 'Starters', available: true },
  { id: 'sal-2', name: 'Burrata & Pea', price: 439, category: 'Starters', available: true },
  { id: 'sus-3', name: 'Philadelphia Salmon (4pcs)', price: 369, category: 'Starters', available: true },

  // ASIAN
  { id: 'dim-3', name: 'Truffle Edamame Dumplings', price: 659, category: 'Asian', available: true },
  { id: 'dim-1', name: 'Rainbow Crystal Dim Sum', price: 329, category: 'Asian', available: true },
  { id: 'am-3', name: 'Miso Glazed Black Cod', price: 1799, category: 'Asian', available: true },
  { id: 'wok-2', name: 'Korean Crispy Chicken', price: 419, category: 'Asian', available: true },
  { id: 'am-2', name: 'Ramen Chicken', price: 459, category: 'Asian', available: true },

  // GLOBAL / CLAY POT / INDIAN
  { id: 'cp-1', name: 'Paneer Tikka', price: 399, category: 'Clay Pot', available: true },
  { id: 'cp-2', name: 'Purani Delhi Murgh Tikka', price: 439, category: 'Clay Pot', available: true },
  { id: 'glob-3', name: 'Margherita Pizza', price: 409, category: 'Global', available: true },
  { id: 'ind-3', name: 'Butter Chicken', price: 439, category: 'Indian', available: true },
  { id: 'br-1', name: 'Butter Naan', price: 89, category: 'Breads & Rice', available: true },

  // BEVERAGES
  { id: 'mock-1', name: 'Virgin Mojito', price: 309, category: 'Beverages', available: true },
  { id: 'bev-1', name: 'Water Bottle', price: 69, category: 'Beverages', available: true },
  { id: 'bev-3', name: 'Fresh Lime Soda / Water', price: 159, category: 'Beverages', available: true },
  
  // DESSERTS
  { id: 'des-1', name: 'Blueberry Cheesecake', price: 339, category: 'Desserts', available: true },
  { id: 'des-2', name: 'Rasmalai Tres Leches', price: 339, category: 'Desserts', available: true },
];
