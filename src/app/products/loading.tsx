import styles from "./loading.module.scss";

import { CardSkeleton } from "@/shared/components/Card/CardSkeleton";
import Text from "@/shared/components/Text";

export default function ProductsLoading() {
  return (
    <div className={styles.root}>
      <div className={styles["root__header"]}>
        <Text view="title">Products</Text>
        <Text view="p-20" color="secondary">
          Loading products...
        </Text>
      </div>

      <div className={styles["root__search--section"]}>
        <div className={styles["root__search--bar"]}>
          <div className={styles["root__search--input"]} />
          <div className={styles["root__search--button"]} />
        </div>
        <div className={styles["root__dropdown"]} />
        <div className={styles["root__total"]} />
      </div>

      <div className={styles["root__grid"]}>
        {Array.from({ length: 9 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
