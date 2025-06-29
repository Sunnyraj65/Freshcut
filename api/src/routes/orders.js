import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireCustomer } from '../middleware/requireCustomer.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get user orders
router.get('/', requireCustomer, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get order by ID
router.get('/:id', requireCustomer, async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.userId
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create order
router.post('/', requireCustomer, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;

    const order = await prisma.order.create({
      data: {
        userId: req.user.userId,
        total: parseFloat(total),
        status: 'PENDING',
        shippingAddress,
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.price)
          }))
        }
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;