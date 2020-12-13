import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from './components/Button/Button';
import Container from './components/Container/Container';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchAPI from './api/images-api';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import Spinner from './components/Spinner';
import ScrollTop from './components/ScrollTop/ScrollTop';

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
  const [showModal, setShowModal] = useState(false);
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

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

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
    setShowModal((prevState) => !prevState);
  };

  if (status === Status.PENDING) {
    return (
      <Container>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <ImageGallery
          images={galleryImages}
          openModal={toggleModal}
          onSetImgData={setModalImgData}
        />
        <Spinner loading={true} />;
      </Container>
    );
  }

  if (status === Status.REJECTED && error) {
    return (
      <Container>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <ToastContainer autoClose={4000} />
        <p>{'Whoops... :( '}</p>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Searchbar onSubmit={handleSearchFormSubmit} />

        <ImageGallery
          images={galleryImages}
          openModal={toggleModal}
          onSetImgData={setModalImgData}
        />

        {galleryImages.length > 0 && totalImages > galleryImages.length && (
          <Button onLoadMore={loadMoreHandler} />
        )}

        <ToastContainer autoClose={4000} />

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={largeImageUrl} alt={modalImgTags} />
          </Modal>
        )}
      </Container>
      <ScrollTop />
    </>
  );
};

export default App;
