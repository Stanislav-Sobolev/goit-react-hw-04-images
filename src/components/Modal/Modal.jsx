import { useEffect } from 'react';
import styles from './Modal.module.css';

export const Modal = ({ handleCloseModal, bigImg }) => {
  const onCloseModal = e => {
    if (e.code === 'Escape' || e.target.nodeName === 'DIV') {
      handleCloseModal();
      document.removeEventListener('keydown', onCloseModal);
      document.removeEventListener('click', onCloseModal);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onCloseModal);
    document.addEventListener('click', onCloseModal);
  });

  return (
    <div className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={bigImg} alt="big preview" />
      </div>
    </div>
  );
};

// export class Modal extends Component {
//   componentDidMount = () => {
//     document.addEventListener('keydown', this.handleCloseModal);
//     document.addEventListener('click', this.handleCloseModal);
//   };

//   handleCloseModal = e => {
//     if (e.code === 'Escape' || e.target.nodeName === 'DIV') {
//       this.props.handleCloseModal();
//       document.removeEventListener('keydown', this.handleCloseModal);
//       document.removeEventListener('click', this.handleCloseModal);
//     }
//   };

//   render() {
//     return (
//       <div className={styles.Overlay}>
//         <div className={styles.Modal}>
//           <img src={this.props.bigImg} alt="big preview" />
//         </div>
//       </div>
//     );
//   }
// }
