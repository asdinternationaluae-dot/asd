import { getFeaturedProducts } from '@/app/actions/products';
import ClientHome from '@/components/ClientHome';

export const revalidate = 0; // fetch data fresh on every request

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  
  return <ClientHome featuredProducts={featuredProducts} />;
}
