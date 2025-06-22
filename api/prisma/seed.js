import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@freshcut.local' },
    update: {},
    create: { email: 'admin@freshcut.local', password: hash }
  });
  console.log('Seeded admin user');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
