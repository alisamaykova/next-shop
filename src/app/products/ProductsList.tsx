'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/shared/stores/global/RootStore';
import { useLocalStore } from '@/shared/hooks/useLocalStore';
import { ProductListPageStore } from '@/shared/stores/local/pages/ProductListPageStore';
import Card from '@/shared/components/Card/Card';
import Button from '@/shared/components/Button/Button';
import { Pagination } from '@/shared/components/Pagination/Pagination';
import Text from '@/shared/components/Text';
import Input from '@/shared/components/Input';
import MultiDropdown from '@/shared/components/MultiDropdown/MultiDropdown';
import type { Option } from '@/shared/components/MultiDropdown/MultiDropdown';
import Loader from '@/shared/components/Loader';
import styles from './ProductList.module.scss';

export const ProductList = observer(() => {
  const router = useRouter();
  const { cartStore, queryParamsStore } = useStore();
  const store = useLocalStore(() => new ProductListPageStore(queryParamsStore));
  const [localSearch, setLocalSearch] = useState(store.searchQuery);

  const handleSearch = () => {
    store.applySearch(localSearch);
  };


  const handleCardClick = (documentId: string) => {
    router.push(`/product/${documentId}`);
  };

  const handleFilterChange = (categories: Option[]) => {
    console.log('handleFilterChange received:', categories);
    store.applyFilter(categories);
  };

  if (store.productsMeta.isLoading && store.products.length === 0) {
    return <div className={styles['loader--container']}><Loader size="l" /></div>;
  }

  if (store.productsMeta.isError) {
    return <div className={styles['error--container']}>Error: {store.productsMeta.error}</div>;
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
            className={styles.dropdown}
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
        <div className={styles['root__total--products']}>
          <Text className={styles['root__total--products--text']} view="subtitle">Total products</Text>
          <Text className={styles['root__total--text']} view="p-20" weight='bold' color="accent">{store.total}</Text>
        </div>
      </div>

      <div className={styles['root__grid--container']}>
        {store.productsMeta.isLoading ? (
          <div className={styles['loader--container']}>
            <Loader size='l' />
          </div>) : store.products.length === 0 ? (
            <div className={styles['root__empty--grid']}>
              <Text view='p-20' color='secondary'>
                По данному запросу ничего не найдено
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
                  captionSlot={product.productCategory?.title}
                  title={product.title}
                  subtitle={product.description}
                  contentSlot={`$${product.price}`}
                  onClick={() => handleCardClick(documentId)}
                  actionSlot={<Button onClick={() => cartStore.addItem(product.id)}>
                    Add to cart
                  </Button>
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