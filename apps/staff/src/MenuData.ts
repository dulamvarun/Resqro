export const MOCK_CATEGORIES = [
  { id: 'cat-chefspicks', name: 'Chef\'s Picks', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-starters', name: 'Starters', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-asian', name: 'Asian', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-clay-pot', name: 'Clay Pot', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-global', name: 'Global', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-indian', name: 'Indian', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-breads-rice', name: 'Breads & Rice', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-cocktails', name: 'Cocktails', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-bar', name: 'Beverages', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=600&auto=format&fit=crop' },
  { id: 'cat-desserts', name: 'Desserts', image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?q=80&w=600&auto=format&fit=crop' },
];

export const MOCK_ITEMS = [
  // --- SIGNATURE COCKTAILS (Cocktails) ---
  { id: 'sig-1', name: 'Hawaiian Pond', price: 449, description: 'Vodka, Fresh Coconut Water, Fresh Lime', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-2', name: 'Pond Side Punch', price: 459, description: 'Vodka, Aperol, Gin, Red Wine, Seasonal Cut Fruits', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-3', name: 'Resqro Punch', price: 509, description: 'Tequila, Coconut Puree, Orange Bitters, Dash Grenadine', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-4', name: 'Tancho 2.0', price: 559, description: 'Irish Whisky, Kahlua, Almond Syrup, Falernum Syrup', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-5', name: 'Asaki', price: 559, description: 'Gin, Apple, Cucumber, Green Leaf, Sweet & Sour', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-6', name: 'Asaki Kiss', price: 559, description: 'Gin, Passion Fruit Syrup, Pink Salt, Pineapple Juice, Top Up Chilly Tincher', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-7', name: 'Resqro Gang', price: 559, description: 'Tequila, Tamarind Puree, Agave Syrup', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-8', name: 'Ochiba', price: 609, description: 'Irish Whiskey, Espresso, Demi Glace, Cream', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-9', name: 'Kakashi', price: 609, description: 'Vodka, Limoncello, Passion Fruit, Egg White, Sweet & Sour', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-10', name: 'Resqro Tonic', price: 659, description: 'Gin, Rosemary Infusion, Sour & Tonic', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-11', name: 'Upside Down', price: 1009, description: 'Peach Vodka, Melon Vodka, Orange Infusion, Grenadine, Fruity Beer', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sig-12', name: 'Together', price: 1209, description: 'Vodka, Dark Rum, White Wine, Gin, Tequila, Falernum Syrup, Top Up Ginger Ale', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },

  // --- CLASSIC COCKTAILS (Cocktails) ---
  { id: 'cls-1', name: 'Pinacolada', price: 449, description: 'White Rum, Coconut Syrup, Coconut Cream', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-2', name: 'Chinese Mule', price: 459, description: 'Vodka, Cranberry, Peach, Green Tea, Dry Ginger Ale', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-3', name: 'Margarita', price: 459, description: 'Tequila, Lime, Cointreau', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-4', name: 'Cosmopolitan', price: 459, description: 'Vodka, Cranberry, Lime, Cointreau', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-5', name: 'Whiskey Sour', price: 459, description: 'Whiskey, Orange Juice, Lime, Egg White', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-6', name: 'Espresso Martini', price: 459, description: 'Vodka, Kahlua, Coffee', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-7', name: 'Sangria Glass', price: 809, description: 'Red or White Wine, Fresh Cut Fruits', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-8', name: 'Cuba Libre', price: 449, description: 'Rum & Aerated drink', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-9', name: 'Planters Punch', price: 449, description: 'Rum & Fruity Flavour', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-10', name: 'Martini', price: 459, description: 'Gin & Dry Vermouth', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-11', name: 'Mojito', price: 459, description: 'White Rum, Lime, Simple Syrup, Soda, & Mint', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-12', name: 'Old Fashioned', price: 459, description: 'Whiskey, Agustra, & Sugar', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-13', name: 'Daiquiri', price: 459, description: 'White Rum, Simply Syrup, & Lime', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-14', name: 'Bloody Mary', price: 459, description: 'Vodka, Tomato Juice, Worcester, & Celery Salt', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-15', name: 'Mango Margarita Frozen', price: 459, description: 'Tequila & Mango Crush', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-16', name: 'Mai Tai', price: 499, description: 'White Rum, Orange Juice, Grenadine Syrup, & Top up Dark Rum', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-17', name: 'Mango Mai Tai', price: 499, description: 'White Rum, Mango Juice, Grenadine Syrup, & Top Up Dark Rum', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-18', name: 'White / Black Russian', price: 559, description: 'Vodka, Baileys, & Kahlua', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'cls-19', name: 'Ferrero Rocher Martini', price: 599, description: 'Baileys, Kahlua, Vodka, & Ferrero rocher Chocolate', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },

  // --- HIGH ALTITUDES (Cocktails) ---
  { id: 'high-1', name: 'Long Island Iced Tea', price: 609, description: 'Vodka, White Rum, Gin, Tequila, Cointreau, Topped With Coke', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails', isChefsPick: true },
  { id: 'high-2', name: 'Bullfrog', price: 659, description: 'Top Up With Red Bull', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'high-3', name: 'Resqro LIIT', price: 659, description: 'Top Up With Red Wine', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'high-4', name: 'Caribbean Ice Tea', price: 609, description: 'Caribbean Culture Drink', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'high-5', name: 'Hurricane', price: 609, description: 'Top Up with Passion Fruit & Orange Juice', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },

  // --- SHOOTERS (Cocktails) ---
  { id: 'sht-1', name: 'Kamikaze', price: 309, description: 'Vodka & Triple Sec Mixed With Lime', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sht-2', name: 'Jäger Bomb', price: 609, description: 'Jägermeister & Red Bull', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sht-3', name: 'Melancholic', price: 409, description: 'Vodka, Watermelon, & Muskmelon', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sht-4', name: 'B-52', price: 559, description: 'Coffee, Cream, & Orange Layered', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sht-5', name: 'Brain Hemorrhage', price: 599, description: 'Peach Schnapps, Baileys, & Grenadine Drops', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'sht-6', name: 'Flaming Lamborghini', price: 2799, description: 'Baileys, Kahlua, Vodka, Chocolate Syrup, & Top Flame With Vodka', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },

  // --- PITCHERS (Cocktails) ---
  { id: 'pit-1', name: 'Mojito Pitcher', price: 2509, description: 'White Rum, Fresh Mint, Lime, Soda', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'pit-2', name: 'Sangria Pitcher', price: 3509, description: 'Red or White Wine with Fresh Fruits', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'pit-3', name: 'Electric Lemonade Pitcher', price: 2509, description: 'Vodka, Lime Juice, Blue Curacao', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'pit-4', name: 'Margarita Pitcher', price: 2799, description: 'Tequila, Lime Juice, Sugar Syrup', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },
  { id: 'pit-5', name: 'Long Island Pitcher', price: 2809, description: 'Rum, Vodka, Gin, Lime Juice, Sugar Syrup, Topped with Coke', isVeg: true, isAlcoholic: true, categoryId: 'cat-cocktails' },

  // --- MOCKTAILS (Cocktails - Non-Alcoholic) ---
  { id: 'mock-1', name: 'Virgin Mojito', price: 309, description: 'Mint, Lime, Sweet & Sour - Frozen', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-2', name: 'Kuko Mikan', price: 309, description: 'Cranberry, Fresh Orange, Fresh Basil, & Lime', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-3', name: 'Virgin Rita', price: 309, description: 'Virgin Margarita', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-4', name: 'Koshi Tomar', price: 309, description: 'Fresh Basil, Mint, Lime, Sweet & Sour', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-5', name: 'Virgin Sangria', price: 309, description: 'Seasonal Fruits & Fruit Juice', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-6', name: 'Mango Monster', price: 309, description: 'Mango, Vanilla Ice Cream, & Mango Juice', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-7', name: 'Fruit Punch', price: 309, description: 'Vanilla Ice Cream & Strawberry Blended', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-8', name: 'Guava Twist', price: 309, description: 'Guava Juice, Secret Spices, Sweet & Sour Mix', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-9', name: 'Flavoured Ice Tea', price: 309, description: 'Ask for flavours (Peach, Lemon, etc.)', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },
  { id: 'mock-10', name: 'Virgin Pina Colada', price: 309, description: 'Pineapple Juice & Coconut Cream', isVeg: true, isAlcoholic: false, categoryId: 'cat-cocktails' },

  // --- BAR BITES (Starters) ---
  { id: 'bite-1', name: 'Peri Peri Fries', price: 259, isVeg: true, categoryId: 'cat-starters' },
  { id: 'bite-2', name: 'Prawn Crackers', price: 259, isVeg: false, categoryId: 'cat-starters' },
  { id: 'bite-3', name: 'Truffle Popcorn', price: 269, isVeg: true, categoryId: 'cat-starters' },
  { id: 'bite-4', name: 'Pav Bhaji Fondue', price: 389, isVeg: true, categoryId: 'cat-starters', isChefsPick: true },
  { id: 'bite-5', name: 'Mozzarella Sticks', price: 389, isVeg: true, categoryId: 'cat-starters' },

  // --- SOUPS & SALADS (Starters) ---
  { id: 'soup-1', name: 'Cream of Mushroom', price: 259, isVeg: true, categoryId: 'cat-starters' },
  { id: 'sal-1', name: 'Watermelon & Feta', price: 339, isVeg: true, categoryId: 'cat-starters' },
  { id: 'sal-2', name: 'Burrata & Pea', price: 439, isVeg: true, categoryId: 'cat-starters', isChefsPick: true },

  // --- WINGS (Starters) ---
  { id: 'wing-1', name: 'Peri Peri Wings', price: 379, isVeg: false, categoryId: 'cat-starters' },

  // --- SUSHI (Starters) ---
  { id: 'sus-1', name: 'Tempura Asparagus (4pcs)', price: 239, isVeg: true, categoryId: 'cat-starters' },
  { id: 'sus-2', name: 'Crispy Chicken Roll (4pcs)', price: 269, isVeg: false, categoryId: 'cat-starters' },
  { id: 'sus-3', name: 'Philadelphia Salmon (4pcs)', price: 369, isVeg: false, categoryId: 'cat-starters', isChefsPick: true },

  // --- DIM SUM & BAO (Asian) ---
  { id: 'dim-3', name: 'Truffle Edamame Dumplings', price: 659, isVeg: true, categoryId: 'cat-asian', isChefsPick: true },
  { id: 'dim-1', name: 'Rainbow Crystal Dim Sum', price: 329, isVeg: true, categoryId: 'cat-asian' },
  { id: 'dim-2', name: 'Coriander Prawns Dim Sum', price: 409, isVeg: false, categoryId: 'cat-asian' },
  { id: 'am-3', name: 'Miso Glazed Black Cod', price: 1799, isVeg: false, categoryId: 'cat-asian' },
  { id: 'bao-1', name: 'Red Hot Chicken Bao', price: 459, isVeg: false, categoryId: 'cat-asian' },

  // --- HOT WOK (Asian) ---
  { id: 'wok-1', name: 'Veg Manchurian Dry', price: 349, isVeg: true, categoryId: 'cat-asian' },
  { id: 'wok-2', name: 'Korean Crispy Chicken', price: 419, isVeg: false, categoryId: 'cat-asian', isChefsPick: true },
  { id: 'wok-3', name: 'Chilli Prawns', price: 479, isVeg: false, categoryId: 'cat-asian' },

  // --- ASIAN MAINS (Asian) ---
  { id: 'am-1', name: 'Chilly Garlic Fried Rice (Veg)', price: 299, isVeg: true, categoryId: 'cat-asian' },
  { id: 'am-2', name: 'Ramen Chicken', price: 459, isVeg: false, categoryId: 'cat-asian', isChefsPick: true },

  // --- CLAY POT (Clay Pot) ---
  { id: 'cp-1', name: 'Paneer Tikka', price: 399, isVeg: true, categoryId: 'cat-clay-pot' },
  { id: 'cp-2', name: 'Purani Delhi Murgh Tikka', price: 439, isVeg: false, categoryId: 'cat-clay-pot', isChefsPick: true },
  { id: 'cp-3', name: 'Mutton Seekh Kebab', price: 499, isVeg: false, categoryId: 'cat-clay-pot' },

  // --- SOUTH BITES (Clay Pot) ---
  { id: 'sb-1', name: 'Ghee Roast Cauliflower', price: 359, isVeg: true, categoryId: 'cat-clay-pot' },
  { id: 'sb-2', name: 'Guntur Chicken', price: 419, isVeg: false, categoryId: 'cat-clay-pot' },

  // --- GLOBAL (Global) ---
  { id: 'glob-1', name: 'Avocado Bruschetta', price: 389, isVeg: true, categoryId: 'cat-global' },
  { id: 'glob-2', name: 'Fish & Chips', price: 469, isVeg: false, categoryId: 'cat-global' },
  { id: 'glob-3', name: 'Margherita Pizza', price: 409, isVeg: true, categoryId: 'cat-global' },
  { id: 'glob-4', name: 'Butter Chicken Pizza', price: 509, isVeg: false, categoryId: 'cat-global' },
  { id: 'glob-5', name: 'Juicy Lamb Burger', price: 479, isVeg: false, categoryId: 'cat-global' },
  { id: 'glob-6', name: 'Aglio e Olio Pasta (Veg)', price: 369, isVeg: true, categoryId: 'cat-global' },

  // --- INDIAN MAINS (Indian) ---
  { id: 'ind-1', name: 'Dal Makhani', price: 339, isVeg: true, categoryId: 'cat-indian' },
  { id: 'ind-2', name: 'Paneer Butter Masala', price: 399, isVeg: true, categoryId: 'cat-indian' },
  { id: 'ind-3', name: 'Butter Chicken', price: 439, isVeg: false, categoryId: 'cat-indian', isChefsPick: true },
  { id: 'ind-4', name: 'Mutton Rogan Josh', price: 499, isVeg: false, categoryId: 'cat-indian' },

  // --- BREADS & RICE (Breads & Rice) ---
  { id: 'br-1', name: 'Butter Naan', price: 89, isVeg: true, categoryId: 'cat-breads-rice' },
  { id: 'br-2', name: 'Garlic Naan', price: 99, isVeg: true, categoryId: 'cat-breads-rice' },
  { id: 'br-3', name: 'Chicken Biryani', price: 429, isVeg: false, categoryId: 'cat-breads-rice' },
  { id: 'br-4', name: 'Jeera Rice', price: 229, isVeg: true, categoryId: 'cat-breads-rice' },

  // --- BAR MENU (Bar Menu) ---
  // RUM (30ml)
  { id: 'rum-1', name: 'Captain Morgan', price: 219, description: '30ml (Bottle: ₹3499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'rum-2', name: 'Bacardi White Rum', price: 219, description: '30ml (Bottle: ₹3499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'rum-3', name: 'Bacardi Dark Rum', price: 219, description: '30ml (Bottle: ₹3499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'rum-4', name: 'Old Monk', price: 219, description: '30ml (Bottle: ₹3499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // BRANDY & COGNAC (30ml)
  { id: 'brn-1', name: 'Mansion House', price: 219, description: '30ml (Bottle: ₹3499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'brn-2', name: 'Kyron', price: 249, description: '30ml (Bottle: ₹3999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'brn-3', name: 'Rémy Martin V.S.O.P', price: 509, description: '30ml (Bottle: ₹10999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'brn-4', name: 'Martell V.S.O.P', price: 509, description: '30ml (Bottle: ₹10999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // LIQUEURS (30ml)
  { id: 'liq-1', name: 'Campari', price: 409, description: '30ml (Bottle: ₹6499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'liq-2', name: 'Aperol', price: 409, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'liq-3', name: 'Baileys', price: 409, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'liq-4', name: 'Jägermeister', price: 409, description: '30ml (Bottle: ₹9999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'liq-5', name: 'Cointreau', price: 409, description: '30ml', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'liq-6', name: 'Kahlúa', price: 409, description: '30ml', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // TEQUILA (30ml)
  { id: 'teq-1', name: 'Tequila Silver', price: 359, description: '30ml (Bottle: ₹7999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'teq-2', name: 'Tequila Gold', price: 409, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'teq-3', name: 'Patrón', price: 709, description: '30ml (Bottle: ₹15999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // WINE & SPARKLING
  { id: 'wn-1', name: 'Sula Rosé (Glass)', price: 599, description: 'Bottle: ₹2999', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-2', name: 'Sula Red (Glass)', price: 609, description: 'Bottle: ₹2999', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-3', name: 'Sula White (Glass)', price: 609, description: 'Bottle: ₹2999', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-4', name: 'La Corte Red (Glass)', price: 709, description: 'Bottle: ₹3499', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-5', name: 'La Corte White (Glass)', price: 709, description: 'Bottle: ₹3499', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-6', name: 'Jacob\'s Creek Red (Glass)', price: 709, description: 'Bottle: ₹3499', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-7', name: 'Jacob\'s Creek White (Glass)', price: 709, description: 'Bottle: ₹3499', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-8', name: 'Sula Brut (Bottle)', price: 4009, isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'wn-9', name: 'Chandon Brut (Bottle)', price: 5009, isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // BEER (Pint)
  { id: 'beer-1', name: 'Carlsberg Smooth', price: 259, description: 'Pint (Bucket: ₹1519)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-2', name: 'Kingfisher Premium', price: 229, description: 'Pint (Bucket: ₹1249)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-3', name: 'Kingfisher Ultra', price: 259, description: 'Pint (Bucket: ₹1449)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-4', name: 'Budweiser', price: 259, description: 'Pint (Bucket: ₹1449)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-5', name: 'Ultra Max', price: 269, description: 'Pint (Bucket: ₹1499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-6', name: 'Breezer', price: 289, description: 'Pint (Bucket: ₹1509)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-7', name: 'Heineken', price: 309, description: 'Pint (Bucket: ₹1649)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-8', name: 'Bira White', price: 409, description: 'Pint (Bucket: ₹2349)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-9', name: 'Bira Blonde', price: 429, description: 'Pint (Bucket: ₹2499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-10', name: 'Corona', price: 509, description: 'Pint (Bucket: ₹2749)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-11', name: 'Hoegaarden', price: 609, description: 'Pint (Bucket: ₹3349)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-12', name: 'Draught Beer Glass', price: 209, isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-13', name: 'Draught Beer Pitcher', price: 959, isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'beer-14', name: 'Draught Beer Tower', price: 1709, isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // WHISKY - SINGLE MALTS (30ml)
  { id: 'whi-1', name: 'Indri', price: 399, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-2', name: 'Aberfeldy', price: 599, description: '30ml (Bottle: ₹14999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-3', name: 'Talisker', price: 609, description: '30ml (Bottle: ₹12999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-4', name: 'Glenlivet 12Y', price: 699, description: '30ml (Bottle: ₹15999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-5', name: 'Glenkinchie 12Y', price: 709, description: '30ml (Bottle: ₹15999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-6', name: 'Glenfiddich 12Y', price: 709, description: '30ml (Bottle: ₹15999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // WHISKY - DOMESTIC (30ml)
  { id: 'whi-7', name: 'Teacher\'s Highland', price: 249, description: '30ml (Bottle: ₹5599)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-8', name: 'Teacher\'s 50', price: 259, description: '30ml (Bottle: ₹5599)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-9', name: 'Black Dog 8Y', price: 259, description: '30ml (Bottle: ₹5599)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-10', name: '100 Pipers', price: 259, description: '30ml (Bottle: ₹5599)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-11', name: '100 Pipers 12Y', price: 319, description: '30ml (Bottle: ₹6499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // WHISKY - BLENDED SCOTCH / BOURBON (30ml)
  { id: 'whi-12', name: 'Jim Beam', price: 259, description: '30ml (Bottle: ₹5499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-13', name: 'Ballantine\'s Finest', price: 259, description: '30ml (Bottle: ₹5499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-14', name: 'Jameson', price: 309, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-15', name: 'Jack Daniel\'s', price: 359, description: '30ml (Bottle: ₹7999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-16', name: 'Jameson Black Barrel', price: 399, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-17', name: 'Johnnie Walker Double Black', price: 409, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-18', name: 'Johnnie Walker Black Label', price: 409, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-19', name: 'Chivas Regal 12Y', price: 409, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-20', name: 'Toki', price: 559, description: '30ml (Bottle: ₹11999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-21', name: 'Monkey Shoulder', price: 559, description: '30ml (Bottle: ₹11999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-22', name: 'Johnnie Walker Gold Label', price: 759, description: '30ml (Bottle: ₹16999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'whi-23', name: 'Chivas Regal 18Y', price: 809, description: '30ml (Bottle: ₹17999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // VODKA (30ml)
  { id: 'vod-1', name: 'Smirnoff', price: 219, description: '30ml (Bottle: ₹4499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'vod-2', name: 'Absolut Citron', price: 299, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'vod-3', name: 'Absolut', price: 309, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'vod-4', name: 'Ketel One', price: 309, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'vod-5', name: 'Grey Goose', price: 409, description: '30ml (Bottle: ₹8999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // GIN (30ml)
  { id: 'gin-1', name: 'Great Indian Gin', price: 209, description: '30ml (Bottle: ₹3499)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'gin-2', name: 'Greater Than Dry Gin', price: 289, description: '30ml (Bottle: ₹5999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'gin-3', name: 'Gordon\'s', price: 299, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'gin-4', name: 'Bombay Sapphire', price: 309, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },
  { id: 'gin-5', name: 'Beefeater London', price: 309, description: '30ml (Bottle: ₹6999)', isVeg: true, isAlcoholic: true, categoryId: 'cat-bar' },

  // BEVERAGES
  { id: 'bev-1', name: 'Water Bottle', price: 69, isVeg: true, isAlcoholic: false, categoryId: 'cat-bar' },
  { id: 'bev-2', name: 'Canned Juice', price: 149, isVeg: true, isAlcoholic: false, categoryId: 'cat-bar' },
  { id: 'bev-3', name: 'Fresh Lime Soda / Water', price: 159, isVeg: true, isAlcoholic: false, categoryId: 'cat-bar' },
  { id: 'bev-4', name: 'Aerated Drinks', price: 179, isVeg: true, isAlcoholic: false, categoryId: 'cat-bar' },
  { id: 'bev-5', name: 'Diet Coke', price: 179, isVeg: true, isAlcoholic: false, categoryId: 'cat-bar' },
  { id: 'bev-6', name: 'Tonic Water / Ginger Ale', price: 179, isVeg: true, isAlcoholic: false, categoryId: 'cat-bar' },
  { id: 'bev-7', name: 'Red Bull', price: 259, isVeg: true, isAlcoholic: false, categoryId: 'cat-bar' },

  // --- DESSERTS (Desserts) ---
  { id: 'des-1', name: 'Blueberry Cheesecake', price: 339, isVeg: true, categoryId: 'cat-desserts' },
  { id: 'des-2', name: 'Rasmalai Tres Leches', price: 339, isVeg: true, categoryId: 'cat-desserts', isChefsPick: true },
  { id: 'des-3', name: 'Tiramisu', price: 359, isVeg: true, categoryId: 'cat-desserts' },

  // --- CHEF'S PICKS (Placeholder) ---
  { id: 'deal-1', name: 'Chef\'s Special Platter', price: 1499, description: 'Ask your server for today\'s special selection.', isVeg: false, categoryId: 'cat-chefspicks', isChefsPick: true },
];
