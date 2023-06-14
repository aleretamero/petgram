import { FormEvent } from 'react';

import styles from './styles.module.css';
import stylesBtn from '../../../components/Forms/Button/styles.module.css';

import { Link } from 'react-router-dom';

// Components
import { Input } from '../../../components/Forms/Input';
import { Button } from '../../../components/Forms/Button';
import { Error } from '../../../components/Error';

// Hooks
import { useForm } from '../../../hooks/useForm';
import { useUserContext } from '../../../hooks/useUserContext';
import { Head } from '../../../components/Head';

export const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const { userLogin, error, loading } = useUserContext(); 

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
   <>
   <Head title='Login' />
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          label="Senha"
          type="text"
          name="password"
          value={password.value}
          error={password.error}
          onChange={password.onChange}
          onBlur={password.onBlur}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.lostPassword} to="/login/perdeu">
        Perdeu a senha?
      </Link>
      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section></>
  );
};
