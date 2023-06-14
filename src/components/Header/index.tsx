import styles from './styles.module.css';

import { Link } from 'react-router-dom';

import { useUserContext } from '../../hooks/useUserContext';

import { ReactComponent as Dogs } from '../../assets/dogs.svg';
import { isTypeUser } from '../../types/TypeData';

export const Header = () => {
  const { data } = useUserContext();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data && isTypeUser(data) ? (
          <Link className={styles.logo} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.logo} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};
