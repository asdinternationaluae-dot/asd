import ProfilePage from './ProfilePage';
import styles from '../admin.module.css';

export default function AdminProfilePage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Admin Profile</h1>
      </div>
      <ProfilePage />
    </>
  );
}
