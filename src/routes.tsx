import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { User } from './pages/User';
import { UserProfile } from './pages/User/UserProfile';
import { NotFound } from './pages/NotFound';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Fotter';
import { Photo } from './components/Photo';

import { UserProvider } from './contexts/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute';

export const MyRoutes = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <main className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
};
