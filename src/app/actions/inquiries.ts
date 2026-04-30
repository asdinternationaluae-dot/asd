'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

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

    // Send email notification
    try {
      await transporter.sendMail({
        from: `"ASD Website" <${process.env.EMAIL_FROM}>`,
        to: 'fawzia@asdinternational.co',
        subject: `New Inquiry: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <h3>New Website Inquiry</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send inquiry email:', emailError);
      // We don't fail the submission if email fails, as it's saved in DB
    }

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
