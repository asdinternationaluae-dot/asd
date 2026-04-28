'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './ScrollVideo.module.css';

export default function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax and scale effects
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  
  // Background Image Fade Ins
  const bg1Opacity = useTransform(scrollYProgress, [0, 0.28, 0.35], [1, 1, 0]);
  const bg2Opacity = useTransform(scrollYProgress, [0.28, 0.35, 0.60, 0.68], [0, 1, 1, 0]);
  const bg3Opacity = useTransform(scrollYProgress, [0.60, 0.68, 1], [0, 1, 1]);

  // Text panel fade ins with plateaus for readability
  // [start fade in, fully visible, start fade out, completely hidden]
  const text1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.28, 0.35], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress,       [0.05, 0.15, 0.28, 0.35], [50, 0, 0, -50]);

  const text2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.68], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress,       [0.35, 0.45, 0.60, 0.68], [50, 0, 0, -50]);

  const text3Opacity = useTransform(scrollYProgress, [0.68, 0.78, 0.90, 0.98], [0, 1, 1, 0]);
  const text3Y = useTransform(scrollYProgress,       [0.68, 0.78, 0.90, 0.98], [50, 0, 0, -50]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.stickyWrap}>
        
        <motion.div className={styles.videoPlaceholder} style={{ scale: bgScale }}>
          {/* Dynamic Changing Medical Images */}
          <motion.div 
            className={styles.bgImageLayer} 
            style={{ opacity: bg1Opacity, backgroundImage: 'url(/bg1.png)' }} 
          />
          <motion.div 
            className={styles.bgImageLayer} 
            style={{ opacity: bg2Opacity, backgroundImage: 'url(/bg2.png)' }} 
          />
          <motion.div 
            className={styles.bgImageLayer} 
            style={{ opacity: bg3Opacity, backgroundImage: 'url(/bg3.png)' }} 
          />
          
          {/* Dark overlay to make text readable */}
          <div className={styles.darkOverlay} />
        </motion.div>

        {/* Text Panels */}
        <div className={styles.textLayer}>
          <motion.div 
            className={styles.textPanel} 
            style={{ opacity: text1Opacity, y: text1Y }}
          >
            <h3 className={styles.panelTitle}>Advanced Formulation</h3>
            <p className={styles.panelDesc}>Pharmaceutical-grade ingredients optimized for maximum cellular absorption.</p>
          </motion.div>

          <motion.div 
            className={styles.textPanel} 
            style={{ opacity: text2Opacity, y: text2Y }}
          >
            <h3 className={styles.panelTitle}>Rigorous Testing</h3>
            <p className={styles.panelDesc}>Every batch undergoes strict quality control to ensure purity and potency.</p>
          </motion.div>

          <motion.div 
            className={styles.textPanel} 
            style={{ opacity: text3Opacity, y: text3Y }}
          >
            <h3 className={styles.panelTitle}>Proven Results</h3>
            <p className={styles.panelDesc}>Trusted by healthcare professionals and patients worldwide.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
