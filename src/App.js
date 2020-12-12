import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Button from './components/Button/Button';
import Container from './components/Container/Container';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchAPI from './api/images-api';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import Spinner from './components/Spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [galleryImages, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null);
  const [searchQuery, setSearchQuery] = useState('nature');
  const [page, setPage] = useState(1);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [modalImgTags, setModalImgTags] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => fetchImages(), [searchQuery]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const fetchImages = () => {
    setStatus(Status.PENDING);

    fetchAPI({ searchQuery, page })
      .then(({ totalHits, images }) => {
        setImages((prevState) => [...prevState, ...images]);
        setPage((prevState) => prevState + 1);
        setTotalImages(totalHits);
        setStatus(Status.RESOLVED);

        if (page !== 1) {
          scrollToBottom();
        }
      })
      .catch((err) => {
        setError(err);
        setStatus(Status.REJECTED);
      });
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

  if (status === Status.REJECTED) {
    return (
      <Container>
        <Searchbar onSubmit={handleSearchFormSubmit} />
        <p>{`Whoops, ${error.message}`}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Searchbar onSubmit={handleSearchFormSubmit} />

      <ImageGallery
        images={galleryImages}
        openModal={toggleModal}
        onSetImgData={setModalImgData}
      />

      {totalImages > galleryImages.length && (
        <Button onLoadMore={fetchImages} />
      )}

      <ToastContainer autoClose={4000} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageUrl} alt={modalImgTags} />
        </Modal>
      )}
    </Container>
  );
};

export default App;
