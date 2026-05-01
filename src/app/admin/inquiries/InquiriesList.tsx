'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Eye, X } from 'lucide-react';
import { updateInquiryStatus } from '@/app/actions/inquiries';
import styles from './InquiriesList.module.css';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
}

export default function InquiriesList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const handleMarkReplied = async (id: string) => {
    const result = await updateInquiryStatus(id, 'REPLIED');
    if (result.success) {
      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: 'REPLIED' } : inq));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status: 'REPLIED' } : null);
      }
    }
  };

  return (
    <>
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
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="btn btn-sm btn-secondary"
                      title="View Message"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button 
                      onClick={() => handleMarkReplied(inquiry.id)}
                      className="btn btn-sm btn-secondary"
                      disabled={inquiry.status === 'REPLIED'}
                      style={inquiry.status === 'REPLIED' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    >
                      {inquiry.status === 'REPLIED' ? <CheckCircle2 size={14} /> : <Mail size={14} />} 
                    </button>
                  </div>
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

      {/* Message Modal */}
      {selectedInquiry && (
        <div className={styles.modalOverlay} onClick={() => setSelectedInquiry(null)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Inquiry Details</h3>
              <button onClick={() => setSelectedInquiry(null)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.infoGrid}>
                <div>
                  <label>From</label>
                  <p>{selectedInquiry.name} ({selectedInquiry.email})</p>
                </div>
                <div>
                  <label>Phone</label>
                  <p>{selectedInquiry.phone || 'N/A'}</p>
                </div>
                <div>
                  <label>Date</label>
                  <p>{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <label>Status</label>
                  <p><span className={`badge badge-${selectedInquiry.status.toLowerCase()}`}>{selectedInquiry.status}</span></p>
                </div>
              </div>
              <div className={styles.messageSection}>
                <label>Subject</label>
                <p className={styles.subject}>{selectedInquiry.subject}</p>
                <label>Message</label>
                <div className={styles.messageContent}>
                  {selectedInquiry.message.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              {selectedInquiry.status !== 'REPLIED' && (
                <button 
                  onClick={() => handleMarkReplied(selectedInquiry.id)}
                  className="btn btn-primary"
                >
                  Mark as Replied
                </button>
              )}
              <button onClick={() => setSelectedInquiry(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
