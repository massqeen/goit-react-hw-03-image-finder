import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onSetImgData }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((img, i) => (
        <ImageGalleryItem
          key={i}
          urlPreview={img.webformatURL}
          urlFull={img.largeImageURL}
          tags={img.tags}
          onSetImgData={onSetImgData}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onSetImgData: PropTypes.func.isRequired,
};

export default ImageGallery;
