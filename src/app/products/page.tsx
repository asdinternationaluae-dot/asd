import { getProducts, getProductCategories } from '@/app/actions/products';
import ClientProducts from '@/components/ClientProducts';

export const revalidate = 0;

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getProductCategories();
  
  return <ClientProducts initialProducts={products} categories={categories} />;
}
