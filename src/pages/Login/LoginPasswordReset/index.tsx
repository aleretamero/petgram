import { FormEvent, useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { PASSWORD_RESET } from '../../../api/api';
import useFetch from '../../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

// Components
import { Input } from '../../../components/Forms/Input';
import { Button } from '../../../components/Forms/Button';
import { Error } from '../../../components/Error';
import { Head } from '../../../components/Head';

export const LoginPasswordReset = () => {
  const [login, setLogin] = useState('');
  const [key, setkey] = useState('');
  const password = useForm();
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setkey(key);
    if (login) setLogin(login);
  }, []);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response?.ok) navigate('/login');
    }
  };

  return (
    <>
      <Head title="Perdeu a senha" />
      <section className="animeLeft">
        <h1 className="title">Resete a Senha</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nova Senha"
            type="text"
            name="password"
            value={password.value}
            error={password.error}
            onChange={password.onChange}
            onBlur={password.onBlur}
          />
          {loading ? (
            <Button disabled>Resetando...</Button>
          ) : (
            <Button>Resetar</Button>
          )}
        </form>
        <Error error={error} />
      </section>
    </>
  );
};
