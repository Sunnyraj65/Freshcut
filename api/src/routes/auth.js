import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST /auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await req.prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d'
  });

  res.json({ token });
});

export default router;
