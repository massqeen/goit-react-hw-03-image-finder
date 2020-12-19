import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';
import preload from '../../../assets/images/870-300x300-blur_2-grayscale.jpg';

const ImageGalleryItem = ({
  urlPreview = 'http://placehold.it/600x400',
  urlFull = 'http://placehold.it/600x400',
  tags = '',
  onSetImgData,
}) => {
  return (
    <li className={styles.item}>
      <img
        src={preload}
        data-src={urlPreview}
        alt={tags}
        className={`image ${styles.image}`}
        onClick={() => {
          onSetImgData({ urlFull, tags });
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  urlPreview: PropTypes.string.isRequired,
  urlFull: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onSetImgData: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
