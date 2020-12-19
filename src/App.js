import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container/Container';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import Spinner from './components/Spinner';
import ScrollTop from './components/ScrollTop/ScrollTop';
import useInfiniteScroll from './hooks/useInfiniteScroll';
import useLazyLoading from './hooks/useLazyLoading';
import useFetch from './hooks/useFetch';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [galleryImages, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('cats');
  const [page, setPage] = useState(1);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [modalImgTags, setModalImgTags] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [isLastPage, setIsLastPage] = useState(false);

  let bottomBoundaryRef = useRef(null);

  useFetch(Status, page, isLastPage, searchQuery, {
    setStatus,
    setImages,
    setTotalPages,
    setError,
  });

  useInfiniteScroll(bottomBoundaryRef, setPage);

  useEffect(() => {
    setIsLastPage(false);
  }, [searchQuery]);

  useEffect(() => {
    if (totalPages === page || totalPages === 1) {
      setIsLastPage(true);
    }
  }, [page, totalPages]);

  useLazyLoading('.image', galleryImages);

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

  const toggleModal = () => setLargeImageUrl('');

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

        <div id="page-bottom-boundary" ref={bottomBoundaryRef} />

        {status === Status.PENDING && <Spinner loading={true} />}

        <ToastContainer autoClose={4000} />

        {largeImageUrl && (
          <Modal onClose={toggleModal}>
            <img src={largeImageUrl} alt={modalImgTags} />
          </Modal>
        )}
        <ScrollTop searchQuery={searchQuery} />
      </Container>
    </>
  );
};

export default App;
