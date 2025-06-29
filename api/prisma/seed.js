import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const beefCategory = await prisma.category.create({
    data: {
      name: 'Beef',
      description: 'Premium beef cuts'
    }
  });

  const porkCategory = await prisma.category.create({
    data: {
      name: 'Pork',
      description: 'Fresh pork products'
    }
  });

  const chickenCategory = await prisma.category.create({
    data: {
      name: 'Chicken',
      description: 'Farm-fresh chicken'
    }
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Ribeye Steak',
        description: 'Premium ribeye steak, perfectly marbled',
        price: 24.99,
        stock: 50,
        categoryId: beefCategory.id,
        imageUrl: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg'
      },
      {
        name: 'Ground Beef',
        description: 'Fresh ground beef, 80/20 lean',
        price: 8.99,
        stock: 100,
        categoryId: beefCategory.id,
        imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
      },
      {
        name: 'Pork Chops',
        description: 'Thick cut pork chops',
        price: 12.99,
        stock: 75,
        categoryId: porkCategory.id,
        imageUrl: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg'
      },
      {
        name: 'Chicken Breast',
        description: 'Boneless, skinless chicken breast',
        price: 9.99,
        stock: 80,
        categoryId: chickenCategory.id,
        imageUrl: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });