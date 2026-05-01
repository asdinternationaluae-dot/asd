'use server';

import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hashSync } from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  await requireAuth();
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createUser(formData: FormData) {
  await requireAuth();

  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as string || 'ADMIN';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  const passwordHash = hashSync(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      role,
    },
  });

  revalidatePath('/admin/users');
  return { success: true };
}

export async function deleteUser(id: string) {
  const session = await requireAuth();
  
  // Prevent deleting self
  if (session.userId === id) {
    throw new Error('Cannot delete your own account');
  }

  await prisma.user.delete({ where: { id } });
  revalidatePath('/admin/users');
  return { success: true };
}
