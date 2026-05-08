'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Globe, Shield, Users, Award } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';
import AnimatedCounter from './AnimatedCounter';
import ScrollVideo from './ScrollVideo';
import styles from '../app/page.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  featured: boolean;
}

export default function ClientHome({ 
  featuredProducts, 
  totalProducts 
}: { 
  featuredProducts: Product[], 
  totalProducts: number 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <div className={styles.heroBlob1} />
            <div className={styles.heroBlob2} />
          </div>
          
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.heroContent}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <span className={styles.heroEyebrow}>Welcome to ASD International</span>
                <h1 className={styles.heroTitle}>
                  Innovation for <span className="text-gradient">your health</span>
                </h1>
                <p className={styles.heroDesc}>
                  Discover our premium range of pharmaceutical-grade nutritional supplements, 
                  scientifically formulated for maximum bioavailability and optimal results.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/products" className="btn btn-primary btn-lg">
                    Explore Products
                  </Link>
                  <Link href="/contact" className="btn btn-secondary btn-lg">
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className={styles.heroVisual}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                className={styles.heroImageWrap}
              >
                <div className={styles.heroImageInner}>
                  <motion.video 
                    ref={videoRef}
                    src="/ASD.mp4" 
                    autoPlay 
                    muted 
                    playsInline
                    loop
                    className={styles.heroLogo}
                    style={{ scale: 1.3 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                className={styles.floatingCard1}
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Shield size={20} className={styles.floatIcon} />
                <span>Premium Quality</span>
              </motion.div>
              
              <motion.div 
                className={styles.floatingCard2}
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              >
                <CheckCircle2 size={20} className={styles.floatIcon} />
                <span>Clinically Proven</span>
              </motion.div>
              
              <motion.div 
                className={styles.floatingCard3}
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              >
                <Award size={20} className={styles.floatIcon} />
                <span>Patented Formulas</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SCROLL VIDEO SECTION */}
        <ScrollVideo />

        {/* ABOUT PREVIEW SECTION */}
        <section className={`section ${styles.aboutSection}`}>
          <div className={`container ${styles.aboutContainer}`}>
            <motion.div 
              className={styles.aboutImage}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.aboutImageInner}>
                <Image 
                  src="/img/quality-commitment.png" 
                  alt="Our Commitment to Quality" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.aboutContent}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <SectionHeading 
                eyebrow="ASD Aims & Values"
                title="Dedicated to Advancing Human Health"
              />
              <p className={styles.aboutText}>
                ASD International Medical Requisites LLC is a leading medical company based in the UAE, with ambitious plans to expand its presence across all GCC countries and the Middle East. Our unwavering commitment to quality sets us apart, as we believe that patients in our region deserve nothing but the best service and care.
              </p>
              <p className={styles.aboutText} style={{ marginTop: 'var(--space-4)' }}>
                At ASD International, we believe that optimal health is the foundation of a fulfilling life. 
                Our mission is to develop and deliver innovative, science-backed nutritional supplements that 
                bridge the gap between pharmaceutical rigor and natural wellness.
              </p>
              <ul className={styles.aboutList}>
                <li><CheckCircle2 className={styles.checkIcon} /> Pharmaceutical-grade ingredients</li>
                <li><CheckCircle2 className={styles.checkIcon} /> Advanced delivery systems (chelation, sustained release)</li>
                <li><CheckCircle2 className={styles.checkIcon} /> Formulated by medical experts</li>
              </ul>
              <Link href="/about" className="btn btn-primary">
                Discover Our Story
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FEATURED PRODUCTS SECTION */}
        <section className={`section ${styles.productsSection}`}>
          <div className="container">
            <SectionHeading 
              eyebrow="Our Portfolio"
              title="Featured Supplements"
              subtitle="Explore our most popular science-backed formulas designed to support your health journey."
              centered
            />
            
            <div className={styles.productGrid}>
              {featuredProducts.map((product, i) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  slug={product.slug}
                  description={product.description}
                  category={product.category}
                  imageUrl={product.imageUrl}
                  featured={product.featured}
                  index={i}
                />
              ))}
            </div>
            
            <motion.div 
              className={styles.viewAllWrap}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/products" className="btn btn-secondary btn-lg">
                View All Products <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className={styles.statsSection}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Globe /></div>
                <h3 className={styles.statNumber}>
                  <AnimatedCounter target={15} suffix="+" />
                </h3>
                <p className={styles.statLabel}>Countries Served</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Pill /></div>
                <h3 className={styles.statNumber}>
                  <AnimatedCounter target={totalProducts} />
                </h3>
                <p className={styles.statLabel}>Premium Products</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Users /></div>
                <h3 className={styles.statNumber}>
                  <AnimatedCounter target={500} suffix="k+" />
                </h3>
                <p className={styles.statLabel}>Patients Helped</p>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}><Shield /></div>
                <h3 className={styles.statNumber}>
                  <AnimatedCounter target={100} suffix="%" />
                </h3>
                <p className={styles.statLabel}>Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className={styles.ctaSection}>
          <div className="container">
            <motion.div 
              className={styles.ctaCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.ctaTitle}>Ready to Partner With Us?</h2>
              <p className={styles.ctaDesc}>
                Whether you're a healthcare professional, distributor, or looking for premium supplements, 
                our team is ready to assist you.
              </p>
              <Link href="/contact" className="btn btn-accent btn-lg">
                Get in Touch Today
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// Needed to silence unused import error for Pill
import { Pill } from 'lucide-react';
