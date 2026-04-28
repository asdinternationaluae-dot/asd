'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import SectionHeading from './SectionHeading';
import styles from '../app/products/products.module.css';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  order: number;
}

export default function ClientProducts({ 
  initialProducts, 
  categories 
}: { 
  initialProducts: Product[];
  categories: string[];
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory ? p.category === activeCategory : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [initialProducts, searchQuery, activeCategory]);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Header Section */}
        <section className={styles.headerSection}>
          <div className="container">
            <SectionHeading 
              eyebrow="Our Portfolio"
              title="Nutritional Supplements"
              subtitle="Browse our comprehensive range of scientifically formulated products designed to support specific health needs."
              centered
            />
            
            {/* Filters & Search */}
            <div className={styles.controlsWrap}>
              <div className={styles.searchBox}>
                <Search size={20} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className={styles.clearBtn}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <div className={styles.categoryScroll}>
                <div className={styles.categoryList}>
                  <button
                    className={`${styles.categoryBtn} ${activeCategory === null ? styles.active : ''}`}
                    onClick={() => setActiveCategory(null)}
                  >
                    All Products
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className={`section ${styles.gridSection}`}>
          <div className="container">
            <div className={styles.resultsCount}>
              Showing <strong>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            
            <motion.div 
              className={styles.productGrid}
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      name={product.name}
                      slug={product.slug}
                      description={product.description}
                      category={product.category}
                      imageUrl={product.imageUrl}
                      featured={product.featured}
                      index={0} // Disable initial stagger to let AnimatePresence handle it
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className={styles.emptyState}>
                <Filter size={48} className={styles.emptyIcon} />
                <h3>No products found</h3>
                <p>Try adjusting your search or category filter.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory(null);
                  }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
