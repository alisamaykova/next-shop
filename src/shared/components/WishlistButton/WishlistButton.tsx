'use client';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@stores/global/RootStore';
import HeartIcon from '@/shared/components/icons/HeartIcon/HeartIcon';
import styles from './WishlistButton.module.scss';
import type { Product } from '@/shared/types/Product';

type WishlistButtonProps = {
  product: Product;
  className?: string;
};

const WishlistButton = observer(({ product, className }: WishlistButtonProps) => {
  const router = useRouter();
  const { WishlistStore, authStore } = useStore();
  const [isMounted, setIsMounted] = useState(false);
  
  const isInWishlist = authStore.isAuthenticated && WishlistStore.isInWishlist(product.id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!authStore.isAuthenticated) {
      if (isMounted) {
        router.push('/login');
      } else {
        window.location.href = '/login';
      }
      return;
    }
    
    WishlistStore.toggleItem(product);
  };

  return (
    <button
      className={`${styles.button} ${isInWishlist ? styles.active : ''} ${className || ''}`}
      onClick={handleClick}
    >
      <HeartIcon className={styles.icon} />
    </button>
  );
});

export default WishlistButton;