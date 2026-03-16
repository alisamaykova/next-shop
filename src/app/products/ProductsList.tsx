'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/stores/global/RootStore';
import { useLocalStore } from '@/shared/hooks/useLocalStore';
import { ProductListPageStore } from '@/shared/stores/local/pages/ProductListPageStore';
import PriceRatingFilter from '@/shared/components/PriceRatingFilter/PriceRatingFilter';
import Card from '@/shared/components/Card/Card';
import Button from '@/shared/components/Button';
import Pagination from '@/shared/components/Pagination';
import Text from '@/shared/components/Text';
import Input from '@/shared/components/Input';
import MultiDropdown from '@/shared/components/MultiDropdown';
import type { Option } from '@/shared/components/MultiDropdown';
import Loader from '@/shared/components/Loader';
import styles from './ProductList.module.scss';
import { CardSkeleton } from '@/shared/components/Card/CardSkeleton';
import CartControls  from '@/shared/components/CartControls';
import WishlistButton from '@/shared/components/WishlistButton';
import { RatingStars } from '@/shared/components/RatingStars/RatingStars';

type Props = {
  initialProducts: any[];
  initialTotal: number;
  initialPage: number;
  categories: Option[];
  initialSelectedCategories: string[];
  initialSearch: string;
};

export const ProductList = observer(({
  initialProducts,
  initialTotal,
  initialPage,
  categories,
  initialSelectedCategories,
  initialSearch,
}: Props) => {
  const router = useRouter();
  const { cartStore, queryParamsStore } = useStore();
  const store = useLocalStore(() => new ProductListPageStore(queryParamsStore));
  const [localSearch, setLocalSearch] = useState(initialSearch);

  useEffect(() => {
    store.setProducts(initialProducts);
    store.setTotal(initialTotal);
    store.setPage(initialPage);
    store.setCategories(categories);
    store.setSelectedCategories(
      categories.filter(cat => initialSelectedCategories.includes(cat.key))
    );
    store.setSearchQuery(initialSearch);
  }, []);

  const handleSearch = () => {
    store.applySearch(localSearch);
    const params = new URLSearchParams(window.location.search);
    params.set('search', localSearch);
    params.set('page', '1');
  };

  const handleCardClick = (documentId: string) => {
    router.push(`/products/${documentId}`);
  };

  const handleFilterChange = (newCategories: Option[]) => {
    store.applyFilter(newCategories);
  };

  const handleApplyPrice = (min: number | null, max: number | null) => {
    store.applyPriceFilter(min, max)
  }

  const handleApplyRating = (min: number | null) => {
    store.applyRatingFilter(min)
  }


  if (store.productsMeta.isLoading && store.products.length === 0) {
    return <div className={styles['loader--container']}><Loader size="l" /></div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <div className={styles.root__title}>
          <Text className={styles['root__title--text']} view="title" color="primary">Products</Text>
        </div>
        <div className={styles.root__subtitle}>
          <Text className={styles['root__subtitle--text']} view="p-20" color="secondary">
            We display products based on the latest products we have, if you want to see our old products please enter the name of the item
          </Text>
        </div>
      </div>

      <div className={styles['root__search--section']}>
        <div className={styles['root__search--bar']}>
          <div className={styles['root__input--container']}>
            <Input
              className={styles['root__search--input']}
              value={localSearch}
              onChange={setLocalSearch}
              placeholder="Search product"
              afterSlot={null}
            />
          </div>
          <Button className={styles['root__search--button']} onClick={handleSearch}>Find now</Button>
        </div>
        <div className={styles['root__dropdown--container']}>
          <MultiDropdown
            className={styles['root__dropdown']}
            options={store.categories || []}
            value={store.selectedCategories}
            onChange={handleFilterChange}
            getTitle={(values) =>
              values.length === 0
                ? 'All categories'
                : values.map(v => v.value).join(', ')
            }
          />
        </div>
        <div className={styles['root__price--rating--container']}>
          <PriceRatingFilter className={styles['root__price--rating--filter']}
          minPrice={store.minPrice}
          maxPrice={store.maxPrice}
          minRating={store.minRating}
          onApplyPrice={handleApplyPrice}
          onApplyRating={handleApplyRating}
        />
        </div>
        <div className={styles['root__total--products']}>
          <Text className={styles['root__total--products--text']} view="subtitle">Total products</Text>
          <Text className={styles['root__total--text']} view="p-20" weight='bold' color="accent">{store.total}</Text>
        </div>
      </div>

      <div className={styles['root__grid--container']}>
        {store.productsMeta.isLoading ? (
          <div className={styles['root__grid']}>
            {Array.from({ length: 9 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>) : store.products.length === 0 ? (
            <div className={styles['root__empty--grid']}>
              <Text view='p-20' color='secondary'>
                No results found
              </Text>
            </div>
          ) : (
          <div className={styles['root__grid']}>
            {store.products.map((product) => {
              const documentId = product.documentId;
              return (
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
                  onClick={() => handleCardClick(documentId)}
                  actionSlot={
                    <div className={styles['root__card--actions']}>
                      <CartControls productId={product.id} />
                      <WishlistButton product={product} />
                    </div>
                  }
                />
              );
            })}
          </div>
        )}
      </div>
      {store.pageCount > 1 && (
        <div className={styles['root__pagination--container']}>
          <Pagination
            currentPage={store.page}
            pageCount={store.pageCount}
            onPageChange={(page) => store.setPage(page)}
          />
        </div>
      )}
    </div>
  );
});