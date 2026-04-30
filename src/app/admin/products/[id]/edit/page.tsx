import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductForm from '../../ProductForm';
import styles from '../../../admin.module.css';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Edit Product: {product.name}</h1>
      </div>
      <div className="card" style={{ padding: '2rem' }}>
        <ProductForm product={product} />
      </div>
    </>
  );
}
