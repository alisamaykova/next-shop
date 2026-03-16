import styles from './Card.module.scss';

export const CardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles['card__image-container']}>
        <div className={styles['skeleton__image']} />
      </div>
      <div className={styles['card__content']}>
        <div className={styles['skeleton__caption']} />
        <div className={styles['skeleton__title']} />
        <div className={styles['skeleton__description']} />
        <div className={styles['card__footer']}>
          <div className={styles['skeleton__price']} />
          <div className={styles['skeleton__button']} />
        </div>
      </div>
    </div>
  );
};