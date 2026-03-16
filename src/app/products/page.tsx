import { fetchProducts, fetchCategories } from '@/shared/api/server';
import { ProductList } from './ProductsList';
import type { Metadata } from 'next';

type Props = {
  searchParams: Promise<{ page?: string; search?: string; categories?: string }>;
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Товары | Интернет-магазин',
  description: 'Каталог товаров нашего магазина',
};

export default async function ProductsPage({ searchParams }: Props) {
  const { page = '1', search = '', categories = '' } = await searchParams;
  const pageNum = parseInt(page, 10) || 1;
  const categoriesArray = categories ? categories.split(',').filter(Boolean) : []

  try {
    const [productsData, categoriesList] = await Promise.all([
      fetchProducts(pageNum, 9, search, categoriesArray),
      fetchCategories(),
    ]);

    return (
      <ProductList
        initialProducts={productsData.data}
        initialTotal={productsData.meta.pagination.total}
        initialPage={pageNum}
        categories={categoriesList}
        initialSelectedCategories={categoriesArray}
        initialSearch={search}
      />
    )
  } catch (error) {
    console.log("Ошибка:", error)
    return (
      <ProductList
        initialProducts={[]}
        initialTotal={0}
        initialPage={1}
        categories={[]}
        initialSelectedCategories={[]}
        initialSearch=""
      />
    )
  }
} 