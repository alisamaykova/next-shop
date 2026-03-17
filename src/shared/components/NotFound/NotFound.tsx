import Link from "next/link";

import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1> 404 </h1>
      <p>Page not found</p>
      <Link href="/" className={styles["root__link"]}>
        <p>Back to home</p>
      </Link>
    </div>
  );
};

export default NotFound;
