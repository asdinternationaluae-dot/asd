import { getInquiries } from '@/app/actions/inquiries';
import styles from '../admin.module.css';
import InquiriesList from './InquiriesList';

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Inquiries</h1>
      </div>

      <InquiriesList initialInquiries={inquiries} />
    </>
  );
}
