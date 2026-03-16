'use client';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@stores/global/RootStore';
import Button from '@/shared/components/Button/Button';
import Text from '@/shared/components/Text';
import styles from './CartControls.module.scss';

type CartControlsProps = {
  productId: number;
  className?: string;
};

const CartControls = observer(({ productId, className }: CartControlsProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { cartStore, authStore } = useStore();
  const quantity = cartStore.getProductQuantity(productId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!authStore.isAuthenticated) {
      if (isMounted) {
        router.push('/login');
      } else {
        window.location.href = '/login';
      }
      return;
    }
    cartStore.addItem(productId);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!authStore.isAuthenticated) {
      if (isMounted) {
        router.push('/login');
      } else {
        window.location.href = '/login';
      }
      return;
    }
    cartStore.removeItem(productId);
  };

  if (quantity === 0) {
    return (
      <Button 
        onClick={handleAdd} 
        className={`${styles.button} ${className || ''}`}
      >
        Add to cart
      </Button>
    );
  }

  return (
    <div className={`${styles.control} ${className || ''}`} onClick={(e) => e.stopPropagation()}>
      <Button onClick={handleRemove} className={styles['control__button']}>−</Button>
      <Text view="p-16" weight="bold" className={styles['control__quantity']}>
        {quantity}
      </Text>
      <Button onClick={handleAdd} className={styles['control__button']}>+</Button>
    </div>
  );
});

export default CartControls