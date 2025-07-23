import React from 'react';
import cx from 'classnames';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from './ProductSelectors.module.scss';
import {
  ProductColorOption,
  ProductStorageOption,
} from '@/utils/types/products';
import { Body, Small } from '../text';
import RadioTile from '@/components/ui/radio-tile/RadioTile';
import Label from '@/components/ui/label/Label';

interface ProductSelectorsProps {
  colorOptions: ProductColorOption[];
  storageOptions: ProductStorageOption[];
  basePrice: number;
  name: string;
  brand: string;
  selectedColor?: ProductColorOption;
  selectedStorage?: ProductStorageOption;
  onChange: (
    color: ProductColorOption,
    storage: ProductStorageOption,
    price: number
  ) => void;
}

const ProductSelectors: React.FC<ProductSelectorsProps> = ({
  colorOptions,
  storageOptions,
  basePrice,
  name,
  brand,
  selectedColor,
  selectedStorage,
  onChange,
}) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  // Calculate price
  const getPrice = (storage: ProductStorageOption) =>
    storage?.price ?? basePrice;

  const isButtonDisabled = !selectedColor || !selectedStorage;
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;
    const cartItem = {
      id: `${basePrice}-${selectedColor.name}-${selectedStorage.capacity}`,
      name,
      brand,
      imageUrl: selectedColor.imageUrl,
      color: selectedColor.name,
      colorHex: selectedColor.hexCode,
      storage: selectedStorage.capacity,
      price: getPrice(selectedStorage),
    };
    addToCart(cartItem);
    router.push('/cart');
  };

  return (
    <div className={styles.selectorsWrapper}>
      <div className={styles.selector}>
        <Body isUppercase>Storage: How much space do you need?</Body>
        <div
          id="storage-group"
          className={styles.storageOptions}
          role="radiogroup"
          aria-label="Select storage capacity"
        >
          {storageOptions.map((option, idx) => (
            <RadioTile
              key={option.capacity + '-' + idx}
              id={`storage-${option.capacity}-${idx}`}
              name="storage"
              value={option.capacity}
              checked={selectedStorage?.capacity === option.capacity}
              onChange={() =>
                onChange(selectedColor!, option, getPrice(option))
              }
              label={<Body>{option.capacity}</Body>}
              className={cx(
                styles.storageSquare,
                selectedStorage?.capacity === option.capacity && styles.active
              )}
              aria-label={option.capacity}
            />
          ))}
        </div>
        <Label htmlFor="color-group" className={styles.colorLabel}>
          <Body isUppercase>Color: Pick your favourite.</Body>
        </Label>
        <div
          id="color-group"
          className={styles.colorOptions}
          role="radiogroup"
          aria-label="Pick your favourite color"
        >
          {colorOptions.map((option, idx) => {
            const isActive =
              hoveredColor === option.name ||
              selectedColor?.name === option.name;
            return (
              <RadioTile
                key={option.name + '-' + idx}
                id={`color-${option.name}-${idx}`}
                name="color"
                value={option.name}
                checked={selectedColor?.name === option.name}
                onChange={() =>
                  onChange(option, selectedStorage!, getPrice(selectedStorage!))
                }
                label={
                  <div
                    className={styles.colorInner}
                    style={{ backgroundColor: option.hexCode }}
                    onMouseEnter={() => setHoveredColor(option.name)}
                    onMouseLeave={() => setHoveredColor(null)}
                  />
                }
                className={cx(
                  styles.colorSquare,
                  'colorTile',
                  isActive && styles.active
                )}
                aria-label={option.name}
                width={24}
                height={24}
              />
            );
          })}
        </div>
        <div className={styles.selectedColorName}>
          <Body>
            {hoveredColor || (selectedColor && selectedColor.name)
              ? hoveredColor || selectedColor?.name
              : ''}
          </Body>
        </div>
      </div>
      <Button
        disabled={isButtonDisabled}
        kind="Text"
        feedback="Primary"
        onClick={handleAddToCart}
      >
        Añadir al carrito
      </Button>
    </div>
  );
};

export default ProductSelectors;
