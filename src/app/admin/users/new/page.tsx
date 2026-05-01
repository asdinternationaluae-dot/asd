'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/app/actions/users';
import styles from '@/app/admin/admin.module.css';

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    try {
      await createUser(formData);
      router.push('/admin/users');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Add New Admin User</h1>
      </div>

      <div className="card" style={{ padding: '2rem', maxWidth: '600px' }}>
        {error && <div className="alert error" style={{ marginBottom: '1rem', padding: '1rem', background: '#FEF2F2', color: '#DC2626', borderRadius: '8px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" required className="form-input" placeholder="e.g. Fawzia Al-Sayed" />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" required className="form-input" placeholder="e.g. fawzia@asdinternational.co" />
          </div>

          <div className="form-group">
            <label className="form-label">Temporary Password</label>
            <input type="password" name="password" required className="form-input" minLength={8} />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select name="role" className="form-input">
              <option value="ADMIN">Administrator</option>
              <option value="EDITOR">Editor</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => router.back()} className="btn btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1 }}>
              {loading ? 'Creating...' : 'Create Admin User'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
