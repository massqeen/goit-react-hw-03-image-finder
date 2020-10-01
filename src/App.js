import React, { Component } from 'react';
import Container from './components/Container/Container';
import imagesApi from './api/images-api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
    largeImageUrl: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    imagesApi
      .fetchImages({ searchQuery, page })
      .then((images) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = (query) => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, loading, error, showModal } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        {/*{error && (*/}
        {/*  <Notification*/}
        {/*    message={`Whoops, something went wrong: ${error.message}`}*/}
        {/*  />*/}
        {/*)}*/}

        {/*{images.length > 0 && <ImageList images={images} />}*/}
        {/*{loading && <Spinner />}*/}
        <ImageGallery></ImageGallery>
        {images.length > 0 && !loading && (
          <button type="button" onClick={this.fetchImages}>
            Load more
          </button>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>Здесь будет изображение</Modal>
        )}
      </Container>
    );
  }
}

export default App;
