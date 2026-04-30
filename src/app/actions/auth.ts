'use server';

import { prisma } from '@/lib/db';
import { getSession, login, logout, requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await login(email, password);

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  redirect('/admin');
}

export async function signOut() {
  await logout();
  redirect('/admin/login');
}

export async function updatePassword(formData: FormData) {
  const session = await getSession();
  if (!session?.email) {
    return { success: false, error: 'Unauthorized' };
  }

  const currentPassword = formData.get('currentPassword') as string;
  const newPassword = formData.get('newPassword') as string;

  const user = await prisma.user.findUnique({
    where: { email: session.email as string },
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
    where: { email: session.email as string },
    data: { passwordHash: newHash },
  });

  return { success: true };
}
