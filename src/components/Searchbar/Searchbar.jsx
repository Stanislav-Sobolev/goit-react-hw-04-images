import styles from './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';

export const SearchBar = ({ onSubmit }) => (
  <header className={styles.Searchbar}>
    <form className={styles.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={styles.SearchFormButton}>
        <span className={styles.SearchFormButtonLabel}>
          <BsSearch size="18px" />
        </span>
      </button>

      <input
        className={styles.SearchFormInput}
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);
