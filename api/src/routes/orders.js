import express from 'express';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
router.use(requireAuth);

// GET /orders
router.get('/', async (req, res) => {
  const orders = await req.prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(orders);
});

// GET /orders/:id
router.get('/:id', async (req, res) => {
  const order = await req.prisma.order.findUnique({ where: { id: Number(req.params.id) } });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

export default router;
