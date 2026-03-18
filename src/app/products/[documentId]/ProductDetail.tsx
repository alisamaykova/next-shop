"use client";

import Card from "@components/Card";
import CartControls from "@components/CartControls";
import Loader from "@components/Loader";
import { RatingStars } from "@components/RatingStars/RatingStars";
import Text from "@components/Text";
import WishlistButton from "@components/WishlistButton";
import ArrowSideIcon from "@components/icons/ArrowDownIcon";
import { useLocalStore } from "@hooks/useLocalStore";
import { ProductDetailPageStore } from "@stores/local/pages/ProductDetailPageStore";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import styles from "./ProductDetail.module.scss";

type Props = {
  initialProduct: any;
  initialRelatedProducts: any[];
};

const ProductDetailClient = observer(
  ({ initialProduct, initialRelatedProducts }: Props) => {
    const router = useRouter();
    const store = useLocalStore(() => new ProductDetailPageStore());

    useEffect(() => {
      store.setProduct(initialProduct);
    }, [initialProduct, store]);

    const handleBack = () => router.back();
    const handleRelatedClick = (documentId: string) => {
      router.push(`/products/${documentId}`);
    };

    const product = store.product || initialProduct;

    if (store.productMeta.isLoading && !initialProduct) {
      return (
        <div className={styles["loader--container"]}>
          <Loader size="l" />
        </div>
      );
    }

    if (store.productMeta.isError) {
      return (
        <div className={styles["error--container"]}>
          Error: {store.productMeta.error}
        </div>
      );
    }

    if (!product) {
      return <div className={styles["not-found"]}>Product not found</div>;
    }

    const imageUrl =
      product.images?.[0]?.formats?.medium?.url ||
      product.images?.[0]?.url ||
      "";
    return (
      <div className={styles.root}>
        <button
          onClick={handleBack}
          className={styles["root__go-back--button"]}
        >
          {" "}
          <ArrowSideIcon className={styles["root__arrow-side-icon"]} />
          <Text view="p-20" className={styles["root__go-back--text"]}>
            Back
          </Text>
        </button>

        <div className={styles["root__product--container"]}>
          <div className={styles["root__main--container"]}>
            <div className={styles["root__image--container"]}>
              <Image
                src={imageUrl}
                alt={product.title}
                width={600}
                height={600}
                className={styles["root__product--image"]}
              />
            </div>
            <div className={styles["root__description--container"]}>
              <Text view="title" className={styles["root__product--title"]}>
                {product.title}
              </Text>
              <Text
                view="p-20"
                color="secondary"
                className={styles["root__product--description"]}
              >
                {product.description}
              </Text>
              <Text view="title" className={styles["root__product--price"]}>
                ${product.price}
              </Text>
              <div className={styles["root__rating"]}>
                {product.rating && <RatingStars rating={product.rating} />}
              </div>
              <div className={styles["root__actions"]}>
                <CartControls
                  className={styles["root__button"]}
                  productId={product.id}
                />
                <WishlistButton product={product} />
              </div>
            </div>
          </div>
          {initialRelatedProducts.length > 0 && (
            <div className={styles["root__related--section"]}>
              <Text view="subtitle" className={styles["root__related--title"]}>
                You might also like
              </Text>
              <div className={styles["root__related--grid"]}>
                {initialRelatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    image={
                      product.images?.[0]?.formats?.medium?.url ||
                      product.images?.[0]?.url ||
                      ""
                    }
                    captionSlot={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        {product.productCategory?.title && (
                          <span>{product.productCategory.title}</span>
                        )}
                        {product.rating && (
                          <RatingStars rating={product.rating} />
                        )}
                      </div>
                    }
                    title={product.title}
                    subtitle={product.description}
                    contentSlot={`$${product.price}`}
                    onClick={() => handleRelatedClick(product.documentId)}
                    actionSlot={
                      <div className={styles["root__card--actions"]}>
                        <CartControls productId={product.id} />
                        <WishlistButton product={product} />
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default ProductDetailClient;
