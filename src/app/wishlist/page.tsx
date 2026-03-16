'use client';

import { observer } from 'mobx-react-lite';
import { useStore } from '@stores/global/RootStore';
import Card from '@/shared/components/Card/Card';
import Text from '@/shared/components/Text';
import CartControls  from '@/shared/components/CartControls';
import WishlistButton from '@/shared/components/WishlistButton';
import { useRouter } from "next/navigation";
import { RatingStars } from '@/shared/components/RatingStars/RatingStars';
import styles from './WishlistPage.module.scss';

const WishlistPage = observer(() => {
    const { WishlistStore } = useStore();
      const router = useRouter();

     const handleRelatedClick = (documentId: string) => {
        router.push(`/products/${documentId}`);
    };

    if (WishlistStore.items.length === 0) {
        return (
            <div className={styles['root__empty']}>
                <Text view="p-20" color="secondary">Your wishlist is empty</Text>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <Text view="title" className={styles['root__title']}>Wishlist</Text>
            <div className={styles['root__grid']}>
                {WishlistStore.items.map((product) => (
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
        </div>
    );
});

export default WishlistPage;