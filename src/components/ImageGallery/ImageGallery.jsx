import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ items, onOpenModal, children }) => (
  <>
    <ul className={styles.ImageGallery}>
      {items.map(el => (
        <ImageGalleryItem
          key={el.id}
          srcImg={el.webformatURL}
          altImg={el.tags}
          bigImg={el.largeImageURL}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
    {children}
  </>
);
