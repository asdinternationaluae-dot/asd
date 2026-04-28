import { getProducts } from '@/app/actions/products';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Products</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ fontWeight: 600 }}>{product.name}</td>
                <td>
                  <span className="badge badge-primary">{product.category}</span>
                </td>
                <td>
                  {product.featured ? (
                    <span className="badge badge-accent">Yes</span>
                  ) : (
                    <span className="badge" style={{ background: 'var(--color-bg-alt)' }}>No</span>
                  )}
                </td>
                <td>{product.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link href={`/admin/products/${product.id}/edit`} className="btn btn-sm btn-secondary">
                      <Edit size={14} /> Edit
                    </Link>
                    <form action={async () => {
                      'use server';
                      const { deleteProduct } = await import('@/app/actions/products');
                      await deleteProduct(product.id);
                    }}>
                      <button type="submit" className="btn btn-sm" style={{ color: 'var(--color-error)', border: '1px solid var(--color-error)' }}>
                        <Trash2 size={14} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No products found. Add your first product!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
