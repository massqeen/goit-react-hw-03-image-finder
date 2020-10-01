import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((img) => {
        console.log(img);
        return (
          <ImageGalleryItem
            key={img.id}
            url={img.webformatURL}
            tags={img.tags}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
