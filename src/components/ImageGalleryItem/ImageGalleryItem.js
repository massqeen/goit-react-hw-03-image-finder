import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  urlPreview = 'http://placehold.it/600x400',
  urlFull = 'http://placehold.it/600x400',
  tags = '',
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

ImageGalleryItem.propTypes = {
  urlPreview: PropTypes.string.isRequired,
  urlFull: PropTypes.string.isRequired,
  tags: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  onSetImgData: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
