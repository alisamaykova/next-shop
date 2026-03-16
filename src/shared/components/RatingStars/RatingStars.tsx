import React from 'react';
import styles from './RatingStars.module.scss';

type RatingStarsProps = {
  rating: number; 
  size?: number;
};

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16 }) => {
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};