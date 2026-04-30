'use client';

import { useState } from 'react';
import { updatePassword } from '@/app/actions/auth';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      const result = await updatePassword(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Password updated successfully' });
        (e.target as HTMLFormElement).reset();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update password' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ padding: '2rem', maxWidth: '500px' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Change Admin Password</h2>
      
      {message && (
        <div className={`${styles.alert} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input 
            type="password" 
            name="currentPassword" 
            required 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">New Password</label>
          <input 
            type="password" 
            name="newPassword" 
            required 
            className="form-input"
            minLength={8}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm New Password</label>
          <input 
            type="password" 
            name="confirmPassword" 
            required 
            className="form-input"
            minLength={8}
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
