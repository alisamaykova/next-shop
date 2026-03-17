import styles from "./loading.module.scss";

export default function ProductDetailLoading() {
  return (
    <div className={styles.root}>
      <div className={styles["root__go-back--button"]} />
      <div className={styles["root__product--container"]}>
        <div className={styles["root__image--container"]} />
        <div className={styles["root_description--container"]}>
          <div className={styles["root__product--title"]} />
          <div className={styles["root__product--description"]} />
          <div className={styles["root__product--price"]} />
          <div className={styles["root__button"]} />
        </div>
      </div>
    </div>
  );
}
