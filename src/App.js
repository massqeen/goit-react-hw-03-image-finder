import { Component } from 'react';
import Button from './components/Button/Button';
import Container from './components/Container/Container';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchAPI from './api/images-api';
import Modal from './components/Modal/Modal';
import Searchbar from './components/Searchbar/Searchbar';
import Spinner from './components/Spinner';

class App extends Component {
  state = {
    images: [],
    totalImages: null,
    loading: false,
    error: null,
    searchQuery: 'nature',
    page: 1,
    largeImageUrl: null,
    modalImgTags: null,
    showModal: false,
  };

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    fetchAPI({ searchQuery, page })
      .then(({ totalHits, images }) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
          totalImages: totalHits,
        }));
        if (page !== 1) {
          this.scrollToBottom();
        }
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      error: false,
    });
  };

  setModalImgData = ({ urlFull, tags }) => {
    this.setState({ largeImageUrl: urlFull, modalImgTags: tags });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      totalImages,
      images,
      loading,
      error,
      showModal,
      largeImageUrl,
      modalImgTags,
    } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        {error && <p>{`Whoops, something went wrong. ${error.message}`}</p>}

        {images.length > 0 && (
          <ImageGallery
            images={images}
            openModal={this.toggleModal}
            onSetImgData={this.setModalImgData}
          />
        )}

        {loading && <Spinner />}

        {images.length > 0 && !loading && totalImages > images.length && (
          <Button onLoadMore={this.fetchImages} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageUrl} alt={modalImgTags} />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
