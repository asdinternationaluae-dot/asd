'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { submitInquiry } from '@/app/actions/inquiries';
import styles from './ContactForm.module.css';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={pending}
      style={{ width: '100%' }}
      id="contact-submit-btn"
    >
      {pending ? (
        <><Loader size={18} className={styles.spin} /> Sending…</>
      ) : (
        <><Send size={18} /> Send Message</>
      )}
    </button>
  );
}

const subjects = [
  'Product Inquiry',
  'Distribution & Partnership',
  'Medical / Clinical Information',
  'General Question',
  'Other',
];

export default function ContactForm() {
  const [state, formAction] = useActionState(submitInquiry, null);

  return (
    <div className={styles.formWrap}>
      <AnimatePresence>
        {state?.success && (
          <motion.div
            className={styles.successMsg}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            <CheckCircle size={22} />
            <div>
              <strong>Message sent!</strong>
              <p>Thank you for reaching out. Our team will get back to you within 1-2 business days.</p>
            </div>
          </motion.div>
        )}
        {state?.error && (
          <motion.div
            className={styles.errorMsg}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={18} />
            <span>{state.error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!state?.success && (
        <form action={formAction} className={styles.form} noValidate>
          <div className={styles.row}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input id="name" name="name" type="text" className="form-input" placeholder="Dr. John Smith" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input id="email" name="email" type="email" className="form-input" placeholder="john@example.com" required />
            </div>
          </div>

          <div className={styles.row}>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Optional)</span></label>
              <input id="phone" name="phone" type="tel" className="form-input" placeholder="+971 5x xxx xxxx" />
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject *</label>
              <select id="subject" name="subject" className="form-input form-select" required>
                <option value="">Select a subject…</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Message *</label>
            <textarea
              id="message"
              name="message"
              className="form-input form-textarea"
              placeholder="Tell us how we can help you…"
              rows={5}
              required
            />
          </div>

          <SubmitButton />
        </form>
      )}
    </div>
  );
}
