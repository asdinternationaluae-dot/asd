import { getUsers } from '@/app/actions/users';
import { UserPlus, Trash2, Shield } from 'lucide-react';
import Link from 'next/link';
import styles from '@/app/admin/admin.module.css';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Admin Users</h1>
        <Link href="/admin/users/new" className="btn btn-primary">
          <UserPlus size={18} /> Add New Admin
        </Link>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ fontWeight: 600 }}>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="badge badge-primary">
                    <Shield size={12} style={{ marginRight: '4px' }} />
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <form action={async () => {
                    'use server';
                    const { deleteUser } = await import('@/app/actions/users');
                    await deleteUser(user.id);
                  }}>
                    <button type="submit" className="btn btn-sm" style={{ color: 'var(--color-error)', border: '1px solid var(--color-error)' }}>
                      <Trash2 size={14} />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
