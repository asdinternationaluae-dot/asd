'use server';

import { login, logout } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function signIn(prevState: unknown, formData: FormData) {
  const email = (formData.get('email') as string)?.trim();
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter your email and password.' };
  }

  try {
    const user = await login(email, password);
    if (!user) {
      return { error: 'Invalid email or password.' };
    }
  } catch {
    return { error: 'Something went wrong. Please try again.' };
  }

  redirect('/admin');
}

export async function signOut() {
  await logout();
  redirect('/admin/login');
}
