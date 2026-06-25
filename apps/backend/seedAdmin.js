import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedAdmin() {
  console.log('Seeding admin user...');
  const password = await bcrypt.hash('admin123', 10);
  
  // Check if admin exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (existingAdmin) {
    console.log('Admin already exists.');
    return;
  }

  const admin = await prisma.user.create({
    data: { 
      name: 'Admin', 
      username: 'admin', 
      email: 'admin@tracker.local', 
      password, 
      role: 'ADMIN' 
    },
  });
  console.log(`Created admin user: ${admin.username} / admin123`);
}

seedAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
