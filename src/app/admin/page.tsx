import { prisma } from '@/lib/db';
import styles from './admin.module.css';

export default async function AdminDashboard() {
  const [productCount, inquiryCount, newInquiries] = await Promise.all([
    prisma.product.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
  ]);

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Products</h3>
          <p className={styles.statValue}>{productCount}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>Total Inquiries</h3>
          <p className={styles.statValue}>{inquiryCount}</p>
        </div>
        <div className={styles.statCard}>
          <h3 className={styles.statTitle}>New Inquiries</h3>
          <p className={styles.statValue} style={{ color: 'var(--color-primary)' }}>{newInquiries}</p>
        </div>
      </div>
    </>
  );
}
