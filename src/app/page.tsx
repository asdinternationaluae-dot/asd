import { getFeaturedProducts, getProductCount } from '@/app/actions/products';
import ClientHome from '@/components/ClientHome';
import { Product } from '@/lib/types';

export const revalidate = 0; // fetch data fresh on every request

export default async function Home() {
  let featuredProducts: Product[] = [];
  let totalProducts = 0;

  try {
    featuredProducts = await getFeaturedProducts() as Product[];
    totalProducts = await getProductCount();
  } catch (error) {
    console.error('Database connection failed. Showing placeholder data.');
  }
  
  return <ClientHome featuredProducts={featuredProducts} totalProducts={totalProducts} />;
}
