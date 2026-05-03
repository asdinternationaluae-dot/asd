'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteUser } from '@/app/actions/users';
import { useRouter } from 'next/navigation';

export default function DeleteUserButton({ id, name }: { id: string, name: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete admin "${name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteUser(id);
      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="btn btn-sm" 
      style={{ 
        color: 'var(--color-error)', 
        border: '1px solid var(--color-error)',
        opacity: loading ? 0.5 : 1
      }}
    >
      <Trash2 size={14} />
    </button>
  );
}
