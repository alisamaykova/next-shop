'use client';

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/stores/global/RootStore';
import Button from '@/shared/components/Button/Button';
import Text from '@/shared/components/Text';
import Loader from '@/shared/components/Loader';
import styles from './CartPage.module.scss';
import Image from 'next/image';
import { RequireAuth } from '@/shared/components/RequireAuth/RequireAuth';

const CartPageContent = observer(() => {
  const { cartStore } = useStore();

  useEffect(() => {
    cartStore.loadCart();
  }, [cartStore]);

  const handleRemoveItem = (productId: number) => {
    cartStore.removeItem(productId);
  };

  const handleAddItem = (productId: number) => {
    cartStore.addItem(productId);
  };

  if (cartStore.cartMeta.isLoading) {
    return <div className={styles['loader--container']}><Loader size='l' /></div>;
  }

  return (
    <div className={styles.root}>
      <Text view="title" className={styles['root__title']}>Shopping Cart</Text>

      {cartStore.items.length === 0 ? (
        <Text view="p-20" color="secondary" className={styles['root__subtitle']}>Your cart is empty</Text>
      ) : (
        <>
          <div className={styles['root__items']}>
            {cartStore.items.map((item) => (
              <div key={item.id} className={styles['root__item']}>
                <Image
                  src={item.product.images?.[0]?.formats?.medium?.url || item.product.images?.[0]?.url || ''}
                  alt={item.product.title} width={80} height={80}
                  className={styles['root__item--image']}
                />
                <div className={styles['root__item--info']}>
                  <Text className={styles['root__item--title--text']} view="p-18" weight="bold">{item.product.title}</Text>
                  <Text view="p-16" color="secondary">${item.product.price}</Text>
                </div>
                <div className={styles['root__item--quantity']}>
                  <Button
                    onClick={() => handleRemoveItem(item.product.id)}
                    className={styles['root__quantity--button']}
                  >−</Button>
                  <Text view="p-16">{item.quantity}</Text>
                  <Button
                    onClick={() => handleAddItem(item.product.id)}
                    className={styles['root__quantity--button']}
                  >+</Button>
                </div>
                <Text view="p-18" weight="bold">
                  ${item.product.price * item.quantity}
                </Text>
              </div>
            ))}
          </div>

          <div className={styles['root__total']}>
            <Text view="p-20" weight="bold">Total:</Text>
            <Text view="p-20" weight="bold" color="accent">
              ${cartStore.totalPrice}
            </Text>
          </div>
        </>
      )}
    </div>
  );
});

export default function CartPage() {
  return (
    <RequireAuth>
      <CartPageContent />
    </RequireAuth>
  )
};