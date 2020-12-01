import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal, onSetImgData }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((img) => (
        <ImageGalleryItem
          key={img.id}
          urlPreview={img.webformatURL}
          urlFull={img.largeImageURL}
          tags={img.tags}
          openModal={openModal}
          onSetImgData={onSetImgData}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  onSetImgData: PropTypes.func.isRequired,
};

export default ImageGallery;
