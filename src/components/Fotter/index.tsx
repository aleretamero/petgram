import styles from './styles.module.css';
import { ReactComponent as Dogs } from '../../assets/dogs-footer.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Dogs />
      <p>Alguns direitos reservados.</p>
    </footer>
  );
};
