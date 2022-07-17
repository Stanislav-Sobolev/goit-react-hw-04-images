import { Component } from 'react';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { fetchItemsWithQuery } from '../../api/fetchItemsWithQuery';
import styles from './App.module.css';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
    isModalOpen: false,
    bigImg: '',
    error: null,
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchItems();
    }
  };

  onOpenModal = bigImg => {
    this.setState({
      isModalOpen: true,
      bigImg,
    });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  fetchItems = async () => {
    this.setState({ isLoading: true });

    await fetchItemsWithQuery(this.state.query, this.state.page)
      .then(res =>
        this.setState(prev => ({
          items: [...prev.items, ...res],
        }))
      )
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    const queryFromInput = e.target.elements.query.value;

    if (queryFromInput !== this.state.query) {
      this.setState({
        page: 1,
        query: queryFromInput,
        items: [],
      });
    }

    e.target.reset();
  };

  render() {
    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleSubmit} />
        {this.state.isModalOpen && (
          <Modal
            bigImg={this.state.bigImg}
            handleCloseModal={this.handleCloseModal}
          />
        )}
        {this.state.error && (
          <div>
            {this.state.error}
            <p>Sorry, try again.</p>
          </div>
        )}

        <ImageGallery items={this.state.items} onOpenModal={this.onOpenModal}>
          {this.state.isLoading && <Loader />}

          {this.state.items.length > 0 && (
            <LoadMoreBtn onClick={this.loadMore} />
          )}
        </ImageGallery>
      </div>
    );
  }
}
