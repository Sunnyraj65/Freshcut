import express from 'express';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// GET /categories (public)
router.get('/', async (req, res) => {
  const categories = await req.prisma.category.findMany({ orderBy: { name: 'asc' } });
  res.json(categories);
});

// POST /categories
router.post('/', requireAuth, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  try {
    const category = await req.prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (e) {
    res.status(400).json({ message: 'Duplicate name or invalid data' });
  }
});

// PUT /categories/:id
router.put('/:id', requireAuth, async (req, res) => {
  const { name } = req.body;
  try {
    const category = await req.prisma.category.update({ where: { id: Number(req.params.id) }, data: { name } });
    res.json(category);
  } catch (e) {
    res.status(404).json({ message: 'Category not found' });
  }
});

// DELETE /categories/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await req.prisma.category.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch {
    res.status(404).json({ message: 'Category not found' });
  }
});

export default router;