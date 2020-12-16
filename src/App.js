import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from './components/Button/Button';
import Container from './components/Container/Container';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchAPI from './helpers/images-api';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import Spinner from './components/Spinner';
import ScrollTop from './components/ScrollTop/ScrollTop';
import scrollToBottom from './helpers/scrollToBottom';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [galleryImages, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [searchQuery, setSearchQuery] = useState();
  const [page, setPage] = useState(1);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [modalImgTags, setModalImgTags] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    (async () => {
      try {
        const response = await fetchAPI(searchQuery, page);
        const { images, totalHits } = response;
        if (!images.length) {
          toast.warn('Sorry, nothing found :(');
          setStatus(Status.IDLE);
          return;
        }
        setImages((prevState) => [...prevState, ...images]);
        setStatus(Status.RESOLVED);
        setTotalImages(totalHits);

        if (page !== 1) {
          scrollToBottom();
        }
      } catch (err) {
        setError(err);
        toast.error(err.message);
        setStatus(Status.REJECTED);
      }
    })();
  }, [searchQuery, page]);

  const loadMoreHandler = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleSearchFormSubmit = (query) => {
    if (query === searchQuery) {
      return;
    }
    setImages([]);
    setPage(1);
    setError(false);
    setSearchQuery(query);
  };

  const setModalImgData = ({ urlFull, tags }) => {
    setLargeImageUrl(urlFull);
    setModalImgTags(tags);
  };

  const toggleModal = () => {
    setLargeImageUrl('');
  };

  return (
    <>
      {' '}
      <Searchbar onSubmit={handleSearchFormSubmit} />
      <Container>
        {status === Status.REJECTED && error && <p>{'Whoops... :( '}</p>}

        <ImageGallery
          images={galleryImages}
          openModal={toggleModal}
          onSetImgData={setModalImgData}
        />

        {status === Status.PENDING && <Spinner loading={true} />}

        {status === Status.RESOLVED && totalImages > galleryImages.length && (
          <Button onLoadMore={loadMoreHandler} />
        )}

        <ToastContainer autoClose={4000} />

        {largeImageUrl && (
          <Modal onClose={toggleModal}>
            <img src={largeImageUrl} alt={modalImgTags} />
          </Modal>
        )}
        <ScrollTop />
      </Container>
    </>
  );
};

export default App;
