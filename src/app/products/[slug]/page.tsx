import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Pill, CheckCircle2, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductBySlug, getSubProducts } from '@/app/actions/products';
import styles from './productDetail.module.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  // Parse JSON strings to arrays
  let benefitsList: string[] = [];
  let ingredientsList: string[] = [];
  try { benefitsList = JSON.parse(product.benefits); } catch (e) { console.error(e) }
  try { ingredientsList = JSON.parse(product.ingredients); } catch (e) { console.error(e) }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.breadcrumbBar}>
          <div className="container">
            <Link href="/products" className={styles.backLink}>
              <ChevronLeft size={20} /> Back to Products
            </Link>
          </div>
        </div>

        <section className={styles.heroSection}>
          <div className={`container ${styles.heroContainer}`}>
            <div className={styles.imageCol}>
              <div className={styles.imageWrap}>
                {product.imageUrl ? (
                  <Image src={product.imageUrl} alt={product.name} fill className={styles.image} priority />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <Pill size={80} strokeWidth={1} />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.contentCol}>
              <span className={`badge badge-primary ${styles.categoryBadge}`}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.description}>{product.longDescription || product.description}</p>

              <div className={styles.ctaBox}>
                <p className={styles.ctaText}>Interested in this product for distribution or clinical use?</p>
                <Link href={`/contact?subject=Product Inquiry: ${product.name}`} className="btn btn-primary btn-lg">
                  Inquire About This Product
                </Link>
              </div>

              <div className={styles.infoGrid}>
                {product.dosage && (
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}><Info size={24} /></div>
                    <div>
                      <h4 className={styles.infoTitle}>Recommended Dosage</h4>
                      <p className={styles.infoText}>{product.dosage}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles.detailsSection}`}>
          <div className={`container ${styles.detailsGrid}`}>
            {benefitsList && benefitsList.length > 0 && (
              <div className={styles.detailBlock}>
                <h3 className={styles.blockTitle}>Key Benefits</h3>
                <ul className={styles.benefitList}>
                  {benefitsList.map((benefit, i) => (
                    <li key={i}>
                      <CheckCircle2 className={styles.checkIcon} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ingredientsList && ingredientsList.length > 0 && (
              <div className={styles.detailBlock}>
                <h3 className={styles.blockTitle}>Active Ingredients</h3>
                <div className={styles.ingredientList}>
                  {ingredientsList.map((ingredient, i) => (
                    <div key={i} className={styles.ingredientItem}>
                      <span className={styles.ingredientDot} />
                      {ingredient}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
