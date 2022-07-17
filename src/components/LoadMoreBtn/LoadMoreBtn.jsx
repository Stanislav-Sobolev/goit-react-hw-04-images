import styles from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <>
      <button className={styles.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </>
  );
};
