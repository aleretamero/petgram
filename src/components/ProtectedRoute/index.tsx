import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { login } = useUserContext();

  if (login) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};
