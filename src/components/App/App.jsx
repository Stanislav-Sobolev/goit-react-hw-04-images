import { useEffect, useState } from 'react';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import { SearchBar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { fetchItemsWithQuery } from '../../api/fetchItemsWithQuery';
import styles from './App.module.css';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bigImg, setBigImg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchItems(query, page);
    }
  }, [query, page]);

  const onOpenModal = bigImg => {
    setIsModalOpen(true);
    setBigImg(bigImg);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchItems = async (queryArg, pageArg) => {
    setIsLoading(true);

    await fetchItemsWithQuery(queryArg, pageArg)
      .then(res => setItems(prevItems => [...prevItems, ...res]))
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const queryFromInput = e.target.elements.query.value;

    if (queryFromInput !== query) {
      setPage(1);
      setQuery(queryFromInput);
      setItems([]);
    }

    e.target.reset();
  };

  return (
    <div className={styles.App}>
      <SearchBar onSubmit={handleSubmit} />
      {isModalOpen && (
        <Modal bigImg={bigImg} handleCloseModal={handleCloseModal} />
      )}
      {error && (
        <div>
          {error}
          <p>Sorry, try again.</p>
        </div>
      )}

      <ImageGallery items={items} onOpenModal={onOpenModal}>
        {isLoading && <Loader />}

        {items.length > 0 && <LoadMoreBtn onClick={loadMore} />}
      </ImageGallery>
    </div>
  );
};

// export class App extends Component {
//   state = {
//     page: 1,
//     query: '',
//     items: [],
//     isLoading: false,
//     isModalOpen: false,
//     bigImg: '',
//     error: null,
//   };

//   componentDidUpdate = (_, prevState) => {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.query !== this.state.query
//     ) {
//       this.fetchItems();
//     }
//   };

//   onOpenModal = bigImg => {
//     this.setState({
//       isModalOpen: true,
//       bigImg,
//     });
//   };

//   handleCloseModal = () => {
//     this.setState({ isModalOpen: false });
//   };

//   fetchItems = async () => {
//     this.setState({ isLoading: true });

//     await fetchItemsWithQuery(this.state.query, this.state.page)
//       .then(res =>
//         this.setState(prev => ({
//           items: [...prev.items, ...res],
//         }))
//       )
//       .catch(error => {
//         this.setState({ error: error.message });
//       })
//       .finally(() => {
//         this.setState({ isLoading: false });
//       });
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const queryFromInput = e.target.elements.query.value;

//     if (queryFromInput !== this.state.query) {
//       this.setState({
//         page: 1,
//         query: queryFromInput,
//         items: [],
//       });
//     }

//     e.target.reset();
//   };

//   render() {
//     return (
//       <div className={styles.App}>
//         <SearchBar onSubmit={this.handleSubmit} />
//         {this.state.isModalOpen && (
//           <Modal
//             bigImg={this.state.bigImg}
//             handleCloseModal={this.handleCloseModal}
//           />
//         )}
//         {this.state.error && (
//           <div>
//             {this.state.error}
//             <p>Sorry, try again.</p>
//           </div>
//         )}

//         <ImageGallery items={this.state.items} onOpenModal={this.onOpenModal}>
//           {this.state.isLoading && <Loader />}

//           {this.state.items.length > 0 && (
//             <LoadMoreBtn onClick={this.loadMore} />
//           )}
//         </ImageGallery>
//       </div>
//     );
//   }
// }
