import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import { UseHeader } from './UserHeader';
import { Feed } from '../Feed';
import { UserPhotoPost } from './UserPhotoPost';
import { UserStats } from './UserStats';

import { useUserContext } from '../../hooks/useUserContext';
import { Head } from '../../components/Head';

export const User = () => {
  const { data } = useUserContext();

  return (
    <>
      <Head title="Minha Conta" />
      <section className="container">
        <UseHeader />
        <Routes>
          {data?.id && <Route path="/" element={<Feed user={data.id} />} />}
          <Route path="postar" element={<UserPhotoPost />} />
          <Route path="estatisticas" element={<UserStats />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </section>
    </>
  );
};
