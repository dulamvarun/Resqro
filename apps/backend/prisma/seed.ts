import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Cleanup existing
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();

  const c1 = await prisma.category.create({
    data: { name: 'Starters', sortOrder: 1 }
  });
  const c2 = await prisma.category.create({
    data: { name: 'Mains', sortOrder: 2 }
  });
  const c3 = await prisma.category.create({
    data: { name: 'Desserts', sortOrder: 3 }
  });

  await prisma.menuItem.create({
    data: {
      name: 'Truffle Edamame Dumplings',
      price: 650,
      description: 'Delicate crystal dumplings with edamame and truffle oil, gold leaf garnish.',
      isVeg: true,
      isChefsPick: true,
      categoryId: c1.id
    }
  });

  await prisma.menuItem.create({
    data: {
      name: 'Miso Glazed Black Cod',
      price: 1800,
      description: 'Charred miso glaze, yuzu gel, crispy leeks.',
      isVeg: false,
      isChefsPick: true,
      categoryId: c2.id
    }
  });

  console.log('Seed completed');
}

main().catch(console.error).finally(() => prisma.$disconnect());
