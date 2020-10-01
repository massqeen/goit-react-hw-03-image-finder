import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, tags }) => {
  return (
    <li className={styles.item}>
      <img src={url} alt={tags} className={styles.image} />
    </li>
  );
};

export default ImageGalleryItem;
