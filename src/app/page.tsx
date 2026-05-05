import { getFeaturedProducts, getProductCount } from '@/app/actions/products';
import ClientHome from '@/components/ClientHome';

export const revalidate = 0; // fetch data fresh on every request

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const totalProducts = await getProductCount();
  
  return <ClientHome featuredProducts={featuredProducts} totalProducts={totalProducts} />;
}
