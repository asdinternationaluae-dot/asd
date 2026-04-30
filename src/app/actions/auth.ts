'use server';

import { prisma } from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { hashSync, compareSync } from 'bcryptjs';
import { auth } from '@/lib/auth';

export async function updatePassword(formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: 'Unauthorized' };
  }

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || !user.passwordHash) {
    return { success: false, error: 'User not found' };
  }

  const isCorrect = compareSync(currentPassword, user.passwordHash);
  if (!isCorrect) {
    return { success: false, error: 'Incorrect current password' };
  }

  const newHash = hashSync(newPassword, 10);
  await prisma.user.update({
    where: { email: session.user.email },
    data: { passwordHash: newHash },
  });

  return { success: true };
}
