import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../api/api';

export type TypeContext = {
  userLogin: (username: string, password: string) => Promise<void>;
  userLogout: () => Promise<void>;
  data: {
    id: number;
    username: string;
    nome: string;
    email: string;
  } | null;
  error: null | string;
  loading: boolean;
  login: boolean | null;
};

export const UserContext = createContext<TypeContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userLogin = async (username: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Usuário ou senha inválida`);

      const { token } = await response.json();

      localStorage.setItem('token', token);
      await getUser(token);

      navigate('/conta');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setLogin(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);

    localStorage.removeItem('token');
  }, []);

  const getUser = async (token: string) => {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  };

  useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);

          const response = await fetch(url, options);

          if (!response.ok) throw new Error('Token inválido');

          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
