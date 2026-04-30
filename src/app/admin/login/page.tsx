'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signIn } from '@/app/actions/auth';
import { ShieldCheck, Loader } from 'lucide-react';
import styles from './login.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending} style={{ width: '100%', marginTop: '1rem' }}>
      {pending ? <><Loader size={18} className="spin" /> Signing In...</> : 'Sign In'}
    </button>
  );
}

export default function AdminLogin() {
  const [state, formAction] = useActionState(signIn, null);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrap}>
            <ShieldCheck size={32} />
          </div>
          <h1 className={styles.title}>Admin Login</h1>
          <p className={styles.subtitle}>Secure access to ASD Dashboard</p>
        </div>

        <form action={formAction} className={styles.form}>
          {state?.error && (
            <div className={styles.errorAlert}>
              {state.error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              className="form-input" 
              required 
              defaultValue="fawzia@asdinternational.co"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              className="form-input" 
              required 
              defaultValue="admin@123"
            />
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}
