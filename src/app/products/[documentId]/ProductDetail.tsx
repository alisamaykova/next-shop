'use client'

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams, useRouter } from "next/navigation";
import { useLocalStore } from "@hooks/useLocalStore";
import { ProductDetailPageStore } from "@stores/local/pages/ProductDetailPageStore";
import { useStore } from "@stores/global/RootStore";
import ArrowSideIcon from "@components/icons/ArrowDownIcon";
import styles from './ProductDetail.module.scss';
import Text from "@components/Text";
import Loader from "@components/Loader";
import Button from "@components/Button";
import Image from "next/image";

const ProductDetailClient = observer(({ initialProduct }: { initialProduct: any }) => {
    const router = useRouter();
    const { cartStore } = useStore();
    const store = useLocalStore(() => new ProductDetailPageStore());

    useEffect(() => {
        store.setProduct(initialProduct);
    }, [initialProduct, store]);

    const handleBack = () => router.back();
    const handleAddToCart = () => {
        if (store.product) {
            cartStore.addItem(store.product.id);
        }
    };

    if (store.productMeta.isLoading) {
        return <div className={styles['loader--container']}><Loader size="l" /></div>;
    }

    if (store.productMeta.isError) {
        return <div className={styles['error--container']}>Error: {store.productMeta.error}</div>;
    }

    if (!store.product) {
        return <div className={styles['not-found']}>Product not found</div>;
    }

    const imageUrl = store.product.images?.[0]?.formats?.medium?.url || store.product.images?.[0]?.url || "";
    return (
        <div className={styles.root}>
            <button onClick={handleBack} className={styles['root__go-back--button']}
            > <ArrowSideIcon className={styles['root__arrow-side-icon']} />
                <Text view="p-20" className={styles['root__go-back--text']}>Назад</Text>
            </button>

            <div className={styles['root__product--container']}>
                <div className={styles['root__image--container']}>
                    <Image  src={imageUrl}
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
        </div>
    )
});

export default ProductDetailClient;