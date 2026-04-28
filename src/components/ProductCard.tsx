'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Pill } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl?: string;
  featured?: boolean;
  index?: number;
}

const categoryColors: Record<string, string> = {
  Minerals: 'badge-primary',
  Vitamins: 'badge-accent',
  Specialty: 'badge-new',
  'Amino Acids': 'badge-read',
  Fertility: 'badge-new',
  'Chelated Minerals': 'badge-primary',
  Musculoskeletal: 'badge-accent',
};

export default function ProductCard({ name, slug, description, category, imageUrl, featured, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Link href={`/products/${slug}`} className={styles.cardLink} aria-label={`View ${name}`}>
        {/* Image */}
        <div className={styles.imageWrap}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <Pill size={48} strokeWidth={1} />
            </div>
          )}
          {featured && (
            <div className={styles.featuredBadge}>Featured</div>
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>
          <span className={`badge ${categoryColors[category] || 'badge-primary'}`}>{category}</span>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.cta}>
            <span>Learn more</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
