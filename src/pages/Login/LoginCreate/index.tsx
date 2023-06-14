import { FormEvent } from 'react';

// Components
import { Input } from '../../../components/Forms/Input';
import { Button } from '../../../components/Forms/Button';
import { Error } from '../../../components/Error';

import { USER_POST } from '../../../api/api';

// Hooks
import { useForm } from '../../../hooks/useForm';
import { useUserContext } from '../../../hooks/useUserContext';
import useFetch from '../../../hooks/useFetch';
import { Head } from '../../../components/Head';

export const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();

  const { userLogin } = useUserContext();
  const { error, loading, request } = useFetch();

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response && response.ok) userLogin(username.value, password.value);
  };

  return (
    <>
      <Head title="Criar Conta" />
      <section className="animeLeft">
        <h1 className="title">Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Usuário"
            type="text"
            name="username"
            value={username.value}
            error={username.error}
            onChange={username.onChange}
            onBlur={username.onBlur}
          />
          <Input
            label="Email"
            type="text"
            name="email"
            value={email.value}
            error={email.error}
            onChange={email.onChange}
            onBlur={email.onBlur}
          />
          <Input
            label="Senha"
            type="text"
            name="password"
            value={password.value}
            error={password.error}
            onChange={password.onChange}
            onBlur={password.onBlur}
          />
          {loading ? (
            <Button disabled>Cadastrando...</Button>
          ) : (
            <Button>Cadastrar</Button>
          )}
          <Error error={error} />
        </form>
      </section>
    </>
  );
};
