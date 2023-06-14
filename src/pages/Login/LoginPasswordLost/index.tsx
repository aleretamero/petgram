import { FormEvent } from 'react';
import { Button } from '../../../components/Forms/Button';
import { Input } from '../../../components/Forms/Input';
import { useForm } from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import { PASSWORD_LOST } from '../../../api/api';
import { Error } from '../../../components/Error';
import { Head } from '../../../components/Head';

export const LoginPasswordLost = () => {
  const login = useForm();
  const { data, error, loading, request } = useFetch();

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      request(url, options);
    }
  };

  console.log('data aqui', data, typeof data);

  return (
    <>
      <Head title="Perdeu a senha" />
      <section className="animeLeft">
        <h1 className="title">Perdeu a senha?</h1>
        {data && typeof data === 'string' ? (
          <p style={{ color: '#4c1' }}>{data}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              label="Email / Usuário"
              type="text"
              name="email"
              value={login.value}
              error={login.error}
              onChange={login.onChange}
              onBlur={login.onBlur}
            />
            {loading ? (
              <Button disabled>Enviando...</Button>
            ) : (
              <Button>Enviar Email</Button>
            )}
          </form>
        )}

        <Error error={error} />
      </section>
    </>
  );
};
