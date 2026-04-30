import ProductForm from '../ProductForm';
import styles from '../../admin.module.css';

export default function NewProductPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Add New Product</h1>
      </div>
      <div className="card" style={{ padding: '2rem' }}>
        <ProductForm />
      </div>
    </>
  );
}
