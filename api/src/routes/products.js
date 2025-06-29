import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import upload, { handleFiles } from '../utils/upload.js';

const router = express.Router();

// GET /products?status=live&search=chicken
router.get('/', async (req, res) => {
  try {
    const { status, search, categoryId } = req.query;
    const where = {};
    if (status) where.status = status;
    if (categoryId) where.categoryId = Number(categoryId);
    if (search) where.name = { contains: search, mode: 'insensitive' };

    const products = await req.prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Protect the following routes
router.post('/', requireAuth, upload.array('images', 6), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data);
    const imageUrls = await handleFiles(req.files);

    // Ensure numeric fields are numbers and types match Prisma schema
    const parsedData = {
      status: data.status || 'live',
      ...data,
      targetWeight: Number(data.targetWeight),
      actualWeight: Number(data.actualWeight),
      pricePerKg: Number(data.pricePerKg),
      totalPrice: Number(data.totalPrice),
      categoryId: Number(data.categoryId),
      // Store images as JSON string for SQLite compatibility
      images: JSON.stringify(imageUrls)
    };

    const product = await req.prisma.product.create({ data: parsedData });
    res.status(201).json(product);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Invalid data' });
  }
});

// PUT /products/:id
router.put('/:id', requireAuth, upload.array('images', 6), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data || '{}');
    let imageUrls = [];
    if (req.files?.length) imageUrls = await handleFiles(req.files);

    const updateData = {
      ...data,
      ...(imageUrls.length && { images: JSON.stringify(imageUrls) })
    };

    const product = await req.prisma.product.update({
      where: { id: Number(req.params.id) },
      data: updateData
    });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: 'Invalid data or product not found' });
  }
});

// DELETE /products/:id
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await req.prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;