'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import styles from './partners.module.css';

const partners = [
  {
    name: 'Fulton Pharma',
    location: 'Italy',
    type: 'Pharmaceutical Partner',
    description: 'A premier European pharmaceutical company. ASD International collaborates with Fulton Pharma to distribute specialized medical lines, including the high-performance INPRO portfolio.'
  }
];

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay} />
          <div className="container">
            <motion.div 
              className={styles.heroContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={styles.heroTitle}>Our Strategic Partners</h1>
              <p className={styles.heroDesc}>
                We collaborate with world-class manufacturers from the UK, Europe, and the USA 
                to bring premium medical innovation and pharmaceutical excellence to the UAE and Middle East.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="section">
          <div className="container">
            <div className={styles.partnersGrid}>
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  className={styles.partnerCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className={styles.partnerBadge}>{partner.type}</span>
                  <h2 className={styles.partnerName}>{partner.name}</h2>
                  <div className={styles.partnerLocation}>{partner.location}</div>
                  <p className={styles.partnerDesc}>{partner.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-secondary max-w-2xl mx-auto italic">
                "Our unwavering commitment to quality sets us apart, as we believe that patients in our region 
                deserve nothing but the best service and care through our global network of excellence."
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
