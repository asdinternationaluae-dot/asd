import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

const products = [
  { name: 'ASD Iron', slug: 'asd-iron' },
  { name: 'ASD Magnesium', slug: 'asd-magnesium' },
  { name: 'ASD Sustained Vit', slug: 'asd-sustained-vit' },
  { name: 'Zinco Q10', slug: 'zinco-q10' },
  { name: 'ASD Carniplex', slug: 'asd-carniplex' },
  { name: 'ASD Magneflex', slug: 'asd-magneflex' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brandCol}>
              <div className={styles.logoWrap}>
                <Image src="/logo-white.png" alt="ASD International" width={130} height={50} />
              </div>
              <p className={styles.tagline}>Innovation for your health</p>
              <p className={styles.brandDesc}>
                ASD International is committed to advancing human health through science-backed
                pharmaceutical-grade nutritional supplements.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={styles.colTitle}>Company</h3>
              <ul className={styles.linkList}>
                <li><Link href="/" className={styles.footerLink}>Home</Link></li>
                <li><Link href="/products" className={styles.footerLink}>Products</Link></li>
                <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
                <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className={styles.colTitle}>Products</h3>
              <ul className={styles.linkList}>
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/products/${p.slug}`} className={styles.footerLink}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className={styles.colTitle}>Contact</h3>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <Phone size={16} />
                  <span>+971 2 245 9549</span>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={16} />
                  <a href="mailto:info@asdinternationaluae.com" className={styles.footerLink}>info@asdinternationaluae.com</a>
                </li>
                <li className={styles.contactItem}>
                  <MapPin size={16} style={{ flexShrink: 0 }} />
                  <span>Block 2-Store No.3, ICAD III, Abu Dhabi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} ASD International. All rights reserved.
            </p>
            <div className={styles.bottomLinks}>
              <Link href="/admin" className={styles.adminLink}>Admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
