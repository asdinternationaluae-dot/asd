import Link from 'next/link';
import { Package, MessageSquare, LogOut, LayoutDashboard } from 'lucide-react';
import { signOut } from '@/app/actions/auth';
import { getSession } from '@/lib/auth';
import styles from './admin.module.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.brand}>ASD Admin</h2>
          <p className={styles.user}>{session?.name as string}</p>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/admin" className={styles.navLink}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/products" className={styles.navLink}>
            <Package size={20} /> Products
          </Link>
          <Link href="/admin/inquiries" className={styles.navLink}>
            <MessageSquare size={20} /> Inquiries
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <form action={signOut}>
            <button type="submit" className={styles.logoutBtn}>
              <LogOut size={20} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
