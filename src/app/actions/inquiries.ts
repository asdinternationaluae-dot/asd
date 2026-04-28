'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';

export async function submitInquiry(prevState: unknown, formData: FormData) {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const phone = (formData.get('phone') as string)?.trim() || '';
  const subject = (formData.get('subject') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (message.length < 10) {
    return { success: false, error: 'Message must be at least 10 characters.' };
  }

  try {
    await prisma.inquiry.create({
      data: { name, email, phone, subject, message, status: 'NEW' },
    });
    return { success: true, error: null };
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

export async function getInquiries() {
  await requireAuth();
  return prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function updateInquiryStatus(id: string, status: string) {
  await requireAuth();
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath('/admin/inquiries');
  return { success: true };
}

export async function deleteInquiry(id: string) {
  await requireAuth();
  await prisma.inquiry.delete({ where: { id } });
  revalidatePath('/admin/inquiries');
  return { success: true };
}
