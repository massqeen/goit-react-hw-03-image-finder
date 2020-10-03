import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal, onSetImgData }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((img) => {
        console.log(img);
        return (
          <ImageGalleryItem
            key={img.id}
            urlPreview={img.webformatURL}
            urlFull={img.largeImageURL}
            tags={img.tags}
            openModal={openModal}
            onSetImgData={onSetImgData}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
