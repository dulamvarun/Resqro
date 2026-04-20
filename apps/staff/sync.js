const fs = require('fs');

const content = fs.readFileSync('../../guest/src/components/MenuData.ts', 'utf-8');

// A bit hacky but it extracts the arrays directly since they are plain JS objects
const getArray = (regex) => {
  const match = content.match(regex);
  if (!match) return [];
  // Since we know it's a valid simple object literal array without complex variables, eval works for this specific file structure
  return eval(match[1]);
};

try {
  let categories = getArray(/export const MOCK_CATEGORIES = (\[[\s\S]*?\]);/);
  let items = getArray(/export const MOCK_ITEMS = (\[[\s\S]*?\]);/);
  
  if(categories.length && items.length) {
    let mappedItems = items.map(i => {
      let cat = categories.find(c => c.id === i.categoryId);
      return {
        id: i.id,
        name: i.name,
        price: i.price,
        category: cat ? cat.name : 'Uncategorized',
        available: true
      };
    });
    
    let out = `export const MOCK_ORDERS = [
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
  id: \`\${i + 1}\`,
  number: i + 1,
  activeOrder: null
}));

export const STAFF_CATEGORIES = ${JSON.stringify(categories.map(c => c.name), null, 2)};

export const STAFF_MENU_ITEMS = ${JSON.stringify(mappedItems, null, 2)};
`;

    fs.writeFileSync('./src/mockData.ts', out, 'utf-8');
    console.log('Successfully wrote mockData.ts');
  } else {
    console.log('Failed to parse arrays');
  }
} catch (e) {
  console.error(e);
}
