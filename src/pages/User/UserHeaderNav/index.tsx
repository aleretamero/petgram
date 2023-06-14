import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.css';

// Hooks
import { useUserContext } from '../../../hooks/useUserContext';
import { useMedia } from '../../../hooks/useMedia';

// SVGs
import { ReactComponent as MyPhotos } from '../../../assets/feed.svg';
import { ReactComponent as Stats } from '../../../assets/estatisticas.svg';
import { ReactComponent as AddPhoto } from '../../../assets/adicionar.svg';
import { ReactComponent as Exit } from '../../../assets/sair.svg';

export const UserHeaderNav = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { userLogout } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const mobile = useMedia('(max-width: 40rem)');

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  const handleLogout = () => {
    userLogout();
    navigate('/login');
  };

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.navbar} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <MyPhotos />
          {mobile && 'Minhas Fotos'}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Stats />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to="/conta/postar">
          <AddPhoto />
          {mobile && 'Adicionar Fotos'}
        </NavLink>
        <button onClick={handleLogout}>
          <Exit />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  );
};
