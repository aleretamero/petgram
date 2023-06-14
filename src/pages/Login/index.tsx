import styles from './styles.module.css';

import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import { LoginForm } from './LoginForm';
import { LoginCreate } from './LoginCreate';
import { LoginPasswordLost } from './LoginPasswordLost';
import { LoginPasswordReset } from './LoginPasswordReset';

import { useUserContext } from '../../hooks/useUserContext';
import { Head } from '../../components/Head';

export const Login = () => {
  const { login } = useUserContext();

  if (login === true) return <Navigate to="/conta" />;

  return (
   <>
   <Head title='Login' />
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </section></>
  );
};
