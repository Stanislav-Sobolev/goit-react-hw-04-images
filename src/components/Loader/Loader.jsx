import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => (
  <>
    <div className={styles.loaderWrap}>
      <Oval color="#303f9f" secondaryColor="#d1d1d1" height={80} width={80} />
    </div>
  </>
);
