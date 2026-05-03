'use client';

import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/partners', label: 'Partners' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.12]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className={styles.progressBar}
        style={{ scaleX: useTransform(scrollY, [0, 5000], [0, 1]), transformOrigin: 'left' }}
      />

      <header className={styles.header}>
        <motion.div
          className={styles.backdrop}
          style={{ opacity: bgOpacity }}
        />

        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="ASD International Home">
            <div className={styles.logoImg}>
              <Image src="/ASD-LOGO.png" alt="ASD International" width={130} height={120} style={{ objectFit: 'contain' }} priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className={styles.desktopCta}>
            <a 
              href="https://www.linkedin.com/company/asd-international-medical-requisites" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={20} />
            </a>
            <Link href="/contact" className="btn btn-primary btn-sm">
              Get in Touch
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <nav aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={styles.mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <Link
                      href="/contact"
                      className="btn btn-primary"
                      onClick={() => setMobileOpen(false)}
                      style={{ display: 'inline-flex' }}
                    >
                      Get in Touch
                    </Link>
                    <a 
                      href="https://www.linkedin.com/company/asd-international-medical-requisites" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      style={{ padding: '0.5rem' }}
                    >
                      <LinkedInIcon size={24} />
                    </a>
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
