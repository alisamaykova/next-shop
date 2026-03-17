"use client";

import { observer } from "mobx-react-lite";
import { useState } from "react";

import styles from "./PriceRatingFilter.module.scss";

import Button from "@/shared/components/Button/Button";
import Input from "@/shared/components/Input/Input";
import Text from "@/shared/components/Text";

type Props = {
  className?: string;
  minPrice: number | null;
  maxPrice: number | null;
  minRating: number | null;
  onApplyPrice: (min: number | null, max: number | null) => void; // eslint-disable-line no-unused-vars
  onApplyRating: (min: number | null) => void; // eslint-disable-line no-unused-vars
};

const PriceRatingFilter = observer(
  ({ minPrice, maxPrice, minRating, onApplyPrice, onApplyRating }: Props) => {
    const [localMinPrice, setLocalMinPrice] = useState(
      minPrice?.toString() || "",
    );
    const [localMaxPrice, setLocalMaxPrice] = useState(
      maxPrice?.toString() || "",
    );
    const [localMinRating, setLocalMinRating] = useState(
      minRating?.toString() || "",
    );

    const handleApplyPrice = () => {
      onApplyPrice(
        localMinPrice ? Number(localMinPrice) : null,
        localMaxPrice ? Number(localMaxPrice) : null,
      );
    };

    const handleApplyRating = () => {
      onApplyRating(localMinRating ? Number(localMinRating) : null);
    };

    return (
      <div className={styles.filter}>
        <div className={styles.filter__section}>
          <Text view="p-16" weight="bold" className={styles.filter__title}>
            Price
          </Text>
          <div className={styles.filter__row}>
            <Input
              value={localMinPrice}
              onChange={setLocalMinPrice}
              placeholder="Min"
              type="number"
              className={styles.filter__input}
              afterSlot={null}
            />
            <Input
              value={localMaxPrice}
              onChange={setLocalMaxPrice}
              placeholder="Max"
              type="number"
              className={styles.filter__input}
              afterSlot={null}
            />
          </div>
          <Button onClick={handleApplyPrice} className={styles.filter__button}>
            Apply
          </Button>
        </div>

        <div className={styles.filter__section}>
          <Text view="p-16" weight="bold" className={styles.filter__title}>
            Rating
          </Text>
          <div className={styles.filter__row}>
            <Input
              value={localMinRating}
              onChange={setLocalMinRating}
              placeholder="Min rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              className={styles.filter__input}
              afterSlot={null}
            />
          </div>
          <Button onClick={handleApplyRating} className={styles.filter__button}>
            Apply
          </Button>
        </div>
      </div>
    );
  },
);

export default PriceRatingFilter;
