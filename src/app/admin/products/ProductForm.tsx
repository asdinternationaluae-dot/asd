'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/app/actions/products';
import { Plus, Trash2, Upload, X } from 'lucide-react';
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

  // Ingredients State
  const initialIngredients = product?.ingredients 
    ? JSON.parse(product.ingredients) 
    : [''];
  const [ingredients, setIngredients] = useState<string[]>(initialIngredients);

  // Image State
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Explicitly add ingredients
    formData.delete('ingredients[]'); // clear any default if exists
    ingredients.forEach(ing => {
      if (ing.trim()) formData.append('ingredients[]', ing.trim());
    });
    
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
      
      <div className={styles.formGrid}>
        {/* Left Column: Basic Info */}
        <div className={styles.col}>
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
              style={{ minHeight: '120px' }}
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
        </div>

        {/* Right Column: Image & Details */}
        <div className={styles.col}>
          <div className="form-group">
            <label className="form-label">Product Image</label>
            <div className={styles.imageUploadArea}>
              {imagePreview ? (
                <div className={styles.previewContainer}>
                  <img src={imagePreview} alt="Preview" className={styles.preview} />
                  <button type="button" onClick={clearImage} className={styles.removeImageBtn}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  className={styles.uploadPlaceholder}
                >
                  <Upload size={24} />
                  <span>Upload Image</span>
                </button>
              )}
              <input 
                type="file" 
                name="imageFile" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            <p className={styles.helpText}>Or provide an external URL:</p>
            <input 
              name="imageUrl" 
              defaultValue={product?.imageUrl} 
              className="form-input"
              placeholder="https://example.com/image.png"
              onChange={(e) => {
                if (e.target.value) setImagePreview(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Benefits</label>
            <textarea 
              name="benefits" 
              defaultValue={product?.benefits} 
              className="form-input"
              placeholder="Enter product benefits (one per line is recommended)"
              style={{ minHeight: '100px' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dosage</label>
            <input 
              name="dosage" 
              defaultValue={product?.dosage} 
              className="form-input"
              placeholder="e.g. 1 capsule daily"
            />
          </div>
        </div>
      </div>

      {/* Full Width Section: Ingredients */}
      <div className={styles.ingredientsSection}>
        <label className="form-label">Ingredients</label>
        <div className={styles.ingredientsGrid}>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientInputGroup}>
              <input 
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="form-input"
                placeholder={`Ingredient ${index + 1}`}
              />
              <button 
                type="button" 
                onClick={() => handleRemoveIngredient(index)}
                className={styles.removeBtn}
                disabled={ingredients.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button 
          type="button" 
          onClick={handleAddIngredient}
          className="btn btn-secondary"
          style={{ marginTop: '1rem', width: 'fit-content' }}
        >
          <Plus size={16} /> Add Ingredient
        </button>
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
