import styles from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ srcImg, altImg, bigImg, onOpenModal }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        className={styles.ImageGalleryItemImage}
        src={srcImg}
        alt={altImg}
        onClick={() => onOpenModal(bigImg)}
      />
    </li>
  );
};
