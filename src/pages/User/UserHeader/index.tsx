import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import { UserHeaderNav } from '../UserHeaderNav';
import { useLocation } from 'react-router-dom';

export const UseHeader = () => {
  const [title, setTitle] = useState('');
  const location = useLocation();  

  useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case '/conta/postar':
        setTitle('Poste Sua Foto');
        break;

      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;

      default:
        setTitle('Minha Conta');
        break;
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};
