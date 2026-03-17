import { fetchProductById, fetchProductsByCategory } from "@api/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailClient from "./ProductDetail";

type Props = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  try {
    const product = await fetchProductById(documentId);
    return {
      title: product.title,
      description: product.description,
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { documentId } = await params;
  try {
    const [product, relatedProducts] = await Promise.all([
      fetchProductById(documentId),
      (async () => {
        try {
          const productData = await fetchProductById(documentId);
          return await fetchProductsByCategory(
            productData.productCategory.id,
            productData.id,
            3,
          );
        } catch {
          return [];
        }
      })(),
    ]);

    return (
      <ProductDetailClient
        initialProduct={product}
        initialRelatedProducts={relatedProducts}
      />
    );
  } catch {
    notFound();
  }
}
