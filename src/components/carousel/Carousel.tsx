import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import styles from './Carousel.module.scss';
import React from 'react';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, className }) => (
  <SimpleBar className={styles.carouselWrapper} autoHide={false}>
    <div className={styles.carouselFlex}>
      {React.Children.map(children, (child, idx) => (
        <div className={styles.carouselItem} key={idx}>
          {child}
        </div>
      ))}
    </div>
  </SimpleBar>
);

export default Carousel;
