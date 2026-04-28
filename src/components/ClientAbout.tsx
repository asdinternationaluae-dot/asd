'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeading from '@/components/SectionHeading';
import { Microscope, Award, Globe2, ShieldCheck } from 'lucide-react';
import styles from '../app/about/about.module.css';

const values = [
  {
    icon: Microscope,
    title: 'Scientific Rigor',
    desc: 'Our formulations are rooted in the latest clinical research, utilizing pharmaceutical-grade ingredients.'
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromising Quality',
    desc: 'From sourcing to manufacturing, we adhere to the strictest international quality control standards.'
  },
  {
    icon: Globe2,
    title: 'Global Accessibility',
    desc: 'We are committed to making premium health solutions accessible to patients worldwide.'
  },
  {
    icon: Award,
    title: 'Continuous Innovation',
    desc: 'We constantly refine our products with advanced delivery systems like chelation and sustained release.'
  }
];

export default function ClientAbout() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Header */}
        <section className={styles.heroSection}>
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.heroContent}
            >
              <h1 className={styles.heroTitle}>Advancing Human Health Through Science</h1>
              <p className={styles.heroDesc}>
                ASD International is a premier pharmaceutical company dedicated to developing 
                innovative, highly effective nutritional supplements that bridge the gap 
                between modern science and natural wellness.
              </p>
            </motion.div>
          </div>
          <div className={styles.heroBg}>
            <div className={styles.heroOverlay} />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className={`section ${styles.missionSection}`}>
          <div className="container">
            <div className={styles.missionGrid}>
              <motion.div 
                className={styles.missionCard}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.cardIcon}>Our Mission</div>
                <h3 className={styles.cardTitle}>Elevating Standards of Care</h3>
                <p className={styles.cardDesc}>
                  To formulate and distribute the highest quality nutritional supplements, empowering individuals 
                  to take control of their health through scientifically proven, safe, and effective products.
                </p>
              </motion.div>
              
              <motion.div 
                className={styles.missionCard}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.cardIcon}>Our Vision</div>
                <h3 className={styles.cardTitle}>A Healthier Global Community</h3>
                <p className={styles.cardDesc}>
                  To be globally recognized as the most trusted and innovative provider of therapeutic 
                  supplements, setting the industry standard for purity, potency, and clinical efficacy.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <SectionHeading 
              eyebrow="Core Values"
              title="The Pillars of Our Success"
              centered
            />
            
            <div className={styles.valuesGrid}>
              {values.map((value, i) => (
                <motion.div 
                  key={value.title}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.valueIconBox}>
                    <value.icon size={28} />
                  </div>
                  <h4 className={styles.valueTitle}>{value.title}</h4>
                  <p className={styles.valueDesc}>{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Excellence */}
        <section className={`section ${styles.mfgSection}`}>
          <div className={`container ${styles.mfgGrid}`}>
            <div className={styles.mfgContent}>
              <SectionHeading 
                eyebrow="Quality Assurance"
                title="Manufacturing Excellence"
              />
              <p className={styles.mfgText}>
                Quality is not just a standard; it is our foundation. All ASD International products are 
                manufactured in state-of-the-art facilities that strictly adhere to Good Manufacturing 
                Practices (GMP).
              </p>
              <p className={styles.mfgText}>
                From the careful selection of raw materials to the final stages of packaging, every step 
                of our process is monitored to guarantee purity, potency, and safety. We utilize advanced 
                technologies, such as sustained-release mechanisms and amino acid chelation, to ensure our 
                supplements deliver maximum therapeutic benefits.
              </p>
            </div>
            <div className={styles.mfgVisual}>
               <div className={styles.mfgPlaceholder}>
                 Quality Control Lab
               </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
