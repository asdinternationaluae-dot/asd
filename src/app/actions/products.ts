'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAuth } from '@/lib/auth';

export async function getProducts() {
  return prisma.product.findMany({ orderBy: { order: 'asc' } });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { featured: true },
    orderBy: { order: 'asc' },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export async function getSubProducts(familySlug: string) {
  return prisma.product.findMany({
    where: {
      slug: {
        startsWith: `${familySlug}-`,
      },
    },
    orderBy: { order: 'asc' },
  });
}

export async function getProductCategories() {
  const products = await prisma.product.findMany({ select: { category: true } });
  return [...new Set(products.map((p) => p.category))];
}

export async function createProduct(formData: FormData) {
  await requireAuth();

  const name = formData.get('name') as string;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Handle Image Upload
  let imageUrl = formData.get('imageUrl') as string || '';
  const imageFile = formData.get('imageFile') as File;
  
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const mimeType = imageFile.type;
    imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  // Handle Ingredients (One by one)
  const ingredients = formData.getAll('ingredients[]') as string[];
  const ingredientsJson = JSON.stringify(ingredients.filter(i => i.trim() !== ''));

  // Handle Benefits (Normal text)
  const benefits = formData.get('benefits') as string || '';

  await prisma.product.create({
    data: {
      name,
      slug,
      description: formData.get('description') as string,
      longDescription: (formData.get('longDescription') as string) || '',
      category: formData.get('category') as string,
      benefits: benefits,
      ingredients: ingredientsJson,
      dosage: (formData.get('dosage') as string) || '',
      imageUrl,
      featured: formData.get('featured') === 'true',
      order: parseInt(formData.get('order') as string) || 0,
    },
  });

  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAuth();

  const name = formData.get('name') as string;
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  // Handle Image Upload
  let imageUrl = formData.get('imageUrl') as string || '';
  const imageFile = formData.get('imageFile') as File;
  
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const mimeType = imageFile.type;
    imageUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  // Handle Ingredients (One by one)
  const ingredients = formData.getAll('ingredients[]') as string[];
  const ingredientsJson = JSON.stringify(ingredients.filter(i => i.trim() !== ''));

  // Handle Benefits (Normal text)
  const benefits = formData.get('benefits') as string || '';

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      description: formData.get('description') as string,
      longDescription: (formData.get('longDescription') as string) || '',
      category: formData.get('category') as string,
      benefits: benefits,
      ingredients: ingredientsJson,
      dosage: (formData.get('dosage') as string) || '',
      imageUrl,
      featured: formData.get('featured') === 'true',
      order: parseInt(formData.get('order') as string) || 0,
    },
  });

  revalidatePath('/admin/products');
  revalidatePath('/products');
  revalidatePath(`/products/${slug}`);
  return { success: true };
}

export async function deleteProduct(id: string) {
  await requireAuth();
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/products');
  return { success: true };
}
