import { fetchProductById } from '@api/server';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetail';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  try{
    const product = await fetchProductById(documentId)
    return{
      title: product.title,
      description : product.description,
    }
  } catch {
    return { title: "Product not found"}
  }
}

export default async function ProductPage({ params }: Props) {
  const { documentId } = await params;
  try{
    const product = await fetchProductById(documentId)
    return <ProductDetailClient initialProduct={product} />
  } catch{
    notFound();
  }
}