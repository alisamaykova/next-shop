'use client'

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useLocalStore } from "@hooks/useLocalStore";
import { ProductDetailPageStore } from "@stores/local/pages/ProductDetailPageStore";
import { useStore } from "@stores/global/RootStore";
import ArrowSideIcon from "@components/icons/ArrowDownIcon";
import styles from './ProductDetail.module.scss';
import Text from "@components/Text";
import Loader from "@/shared/components/Loader";
import Button from "@components/Button";
import Card from "@/shared/components/Card";
import Image from "next/image";
import { fetchProductsByCategory } from '@api/server'
import { CardSkeleton } from "@/shared/components/Card/CardSkeleton";
import  CartControls  from '@/shared/components/CartControls';
import WishlistButton from '@/shared/components/WishlistButton';
import { RatingStars } from '@/shared/components/RatingStars/RatingStars';

const ProductDetailClient = observer(({ initialProduct }: { initialProduct: any }) => {
    const router = useRouter();
    const { cartStore } = useStore();
    const store = useLocalStore(() => new ProductDetailPageStore());
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loadingRelated, setLoadingRelated] = useState(false);

    useEffect(() => {
        store.setProduct(initialProduct);
    }, [initialProduct, store]);

    useEffect(() => {
        const loadRelated = async () => {
            if (!store.product?.productCategory?.id) return;

            setLoadingRelated(true);
            try {
                const products = await fetchProductsByCategory(
                    store.product.productCategory.id,
                    store.product.id
                );
                setRelatedProducts(products);
            } catch (error) {
                console.error('Failed to load related products', error);
            } finally {
                setLoadingRelated(false);
            }
        };

        loadRelated();
    }, [store.product]);

    const handleBack = () => router.back();
    const handleAddToCart = () => {
        if (store.product) {
            cartStore.addItem(store.product.id);
        }
    };
    const handleRelatedClick = (documentId: string) => {
        router.push(`/products/${documentId}`);
    };

    if (store.productMeta.isLoading) {
        return <div className={styles['loader--container']}><Loader size="l" /></div>;
    }

    if (!store.product) {
        return <div className={styles['not-found']}>Product not found</div>;
    }

    const imageUrl = store.product.images?.[0]?.formats?.medium?.url || store.product.images?.[0]?.url || '';
    return (
        <div className={styles.root}>
            <button onClick={handleBack} className={styles['root__go-back--button']}
            > <ArrowSideIcon className={styles['root__arrow-side-icon']} />
                <Text view="p-20" className={styles['root__go-back--text']}>Back</Text>
            </button>

            <div className={styles['root__product--container']}>
                <div className={styles['root__main--container']}>
                    <div className={styles['root__image--container']}>
                        <Image src={imageUrl}
                            alt={store.product.title} width={600} height={600} className={styles['root__product--image']}

                        />
                    </div>
                    <div className={styles['root__description--container']}>
                        <Text view="title" className={styles['root__product--title']}>{store.product.title}</Text>
                        <Text view="p-20" color="secondary" className={styles['root__product--description']}>{store.product.description}</Text>
                        <Text view="title" className={styles['root__product--price']}>${store.product.price}</Text>
                        <div className={styles['root__button--container']}>
                            <Button className={styles['root__button']} onClick={handleAddToCart}>
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </div>
                {(relatedProducts.length > 0 || loadingRelated) && (
                    <div className={styles['root__related--section']}>
                        <Text view="subtitle" className={styles['root__related--title']}>Relates Items</Text>

                        {loadingRelated ? (
                            <div className={styles['root__related--grid']}>
                                {[1, 2, 3].map((i) => (
                                    <CardSkeleton key={i} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles['root__related--grid']}>
                                {relatedProducts.slice(0, 3).map((product) => (
                                    <Card
                                        key={product.id}
                                        image={
                                            product.images?.[0]?.formats?.medium?.url ||
                                            product.images?.[0]?.url ||
                                            ''
                                        }
                                        captionSlot={
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                {product.productCategory?.title && (
                                                    <span>{product.productCategory.title}</span>
                                                )}
                                                {product.rating && <RatingStars rating={product.rating} />}
                                            </div>
                                        }
                                        title={product.title}
                                        subtitle={product.description}
                                        contentSlot={`$${product.price}`}
                                        onClick={() => handleRelatedClick(product.documentId)}
                                        actionSlot={
                                            <div className={styles['root__card--actions']}>
                                                <CartControls productId={product.id} />
                                                <WishlistButton product={product} />
                                            </div>
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
})

export default ProductDetailClient;