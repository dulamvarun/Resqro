import express from 'express';
import http from 'http';
import cors from 'cors';
// import { PrismaClient } from '@prisma/client';
const prisma: any = {
  category: { findMany: async () => [] },
  menuItem: { findUnique: async () => null },
  order: { create: async (data: any) => ({ id: `ord-${Date.now()}`, ...data.data, items: [] }) },
  orderItem: { update: async () => ({}) }
};
import { initRedis } from './redis';
import { initSocket, io } from './socket';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
// const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

initSocket(server);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* REST Endpoints */

// Get menu categories with items
app.get('/api/menu', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        items: {
          where: { isAvailable: true }
        }
      }
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

// Place an order
app.post('/api/orders', async (req, res) => {
  try {
    const { tableId, items } = req.body;
    let totalAmount = 0;
    
    // Calculate total amount
    for (const item of items) {
      const menuItem = await prisma.menuItem.findUnique({ where: { id: item.menuItemId } });
      if (menuItem) {
        totalAmount += menuItem.price * item.quantity;
      }
    }

    const order = await prisma.order.create({
      data: {
        tableId,
        totalAmount,
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            customizations: item.customizations
          }))
        }
      },
      include: {
        items: {
          include: { menuItem: true }
        }
      }
    });

    // Emit real-time event to staff dashboard
    if (io) {
      io.to('staff').emit('new_order', order);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Update order item status (Waiter/Admin)
app.patch('/api/orders/:orderId/items/:itemId', async (req, res) => {
  try {
    const { orderId, itemId } = req.params;
    const { status } = req.body; // PENDING, CONFIRMED, READY, SERVED

    const updatedItem = await prisma.orderItem.update({
      where: { id: itemId },
      data: { status }
    });

    // Notify staff and specific guest room
    if (io) {
      io.to('staff').emit('item_status_updated', { orderId, itemId, status });
      io.to(`order_${orderId}`).emit('item_status_updated', { orderId, itemId, status });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item status' });
  }
});

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  try {
    // await initRedis();
    // await prisma.$connect();
    console.log('Running in MOCK MODE (No DB/Redis)');
  } catch (error) {
    console.warn('⚠️ WARNING: Backend starting in DEMO MODE');
  }

  server.listen(PORT, () => {
    console.log(`Resqro Backend running on port ${PORT}`);
  });
}

bootstrap().catch(console.error);
