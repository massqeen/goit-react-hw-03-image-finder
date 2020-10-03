import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  urlPreview,
  urlFull,
  tags,
  openModal,
  onSetImgData,
}) => {
  return (
    <li className={styles.item}>
      <img
        src={urlPreview}
        alt={tags}
        className={styles.image}
        onClick={() => {
          onSetImgData({ urlFull, tags });
          openModal();
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;
