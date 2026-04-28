import { getInquiries } from '@/app/actions/inquiries';
import { Mail, CheckCircle2 } from 'lucide-react';
import styles from '../admin.module.css';

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Inquiries</h1>
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{inquiry.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{inquiry.email}</div>
                </td>
                <td>{inquiry.subject}</td>
                <td>
                  <span className={`badge badge-${inquiry.status.toLowerCase()}`}>
                    {inquiry.status}
                  </span>
                </td>
                <td>
                  <form action={async () => {
                    'use server';
                    const { updateInquiryStatus } = await import('@/app/actions/inquiries');
                    await updateInquiryStatus(inquiry.id, 'REPLIED');
                  }}>
                    <button 
                      type="submit" 
                      className="btn btn-sm btn-secondary"
                      disabled={inquiry.status === 'REPLIED'}
                      style={inquiry.status === 'REPLIED' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                      {inquiry.status === 'REPLIED' ? <CheckCircle2 size={14} /> : <Mail size={14} />} 
                      {inquiry.status === 'REPLIED' ? 'Replied' : 'Mark Replied'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
