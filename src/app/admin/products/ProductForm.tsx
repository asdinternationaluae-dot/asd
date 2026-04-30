'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/app/actions/products';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    category: string;
    benefits: string;
    ingredients: string;
    dosage: string;
    imageUrl: string;
    featured: boolean;
    order: number;
  };
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className="form-group">
        <label className="form-label">Product Name</label>
        <input 
          name="name" 
          defaultValue={product?.name} 
          required 
          className="form-input"
          placeholder="e.g. ASD IRON"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category</label>
        <input 
          name="category" 
          defaultValue={product?.category} 
          required 
          className="form-input"
          placeholder="e.g. Iron Supplement"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Short Description</label>
        <textarea 
          name="description" 
          defaultValue={product?.description} 
          required 
          className="form-input"
          style={{ minHeight: '80px' }}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Long Description</label>
        <textarea 
          name="longDescription" 
          defaultValue={product?.longDescription} 
          className="form-input"
          style={{ minHeight: '150px' }}
        />
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label className="form-label">Order (for sorting)</label>
          <input 
            type="number" 
            name="order" 
            defaultValue={product?.order || 0} 
            className="form-input"
          />
        </div>
        <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          <input 
            type="checkbox" 
            name="featured" 
            value="true"
            defaultChecked={product?.featured} 
            id="featured"
          />
          <label htmlFor="featured" className="form-label" style={{ marginBottom: 0 }}>Featured Product</label>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input 
          name="imageUrl" 
          defaultValue={product?.imageUrl} 
          className="form-input"
          placeholder="/img/ASDIron.png"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Benefits (JSON array string)</label>
        <textarea 
          name="benefits" 
          defaultValue={product?.benefits || '[]'} 
          className="form-input"
          placeholder='["Benefit 1", "Benefit 2"]'
        />
      </div>

      <div className="form-group">
        <label className="form-label">Ingredients (JSON array string)</label>
        <textarea 
          name="ingredients" 
          defaultValue={product?.ingredients || '[]'} 
          className="form-input"
          placeholder='["Ingredient 1", "Ingredient 2"]'
        />
      </div>

      <div className="form-group">
        <label className="form-label">Dosage</label>
        <input 
          name="dosage" 
          defaultValue={product?.dosage} 
          className="form-input"
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={() => router.back()} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
