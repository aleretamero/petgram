import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';

// Components
import { Input } from '../../../components/Forms/Input';
import { Button } from '../../../components/Forms/Button';
import { Error } from '../../../components/Error';
import { Head } from '../../../components/Head';

// Hookes
import { useForm } from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';

import { PHOTO_POST } from '../../../api/api';

type TypeImg = {
  preview?: string;
  raw?: File;
};

export const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm('number');
  const age = useForm('number');

  const navigate = useNavigate();

  const [img, setImg] = useState<TypeImg>({});
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    if (img.raw) formData.append('img', img.raw);
    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);

    const token = localStorage.getItem('token');
    if (token) {
      const { url, options } = PHOTO_POST(formData, token);
      request(url, options);
    }
  };

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    if (input && input.files) {
      setImg({
        preview: URL.createObjectURL(input.files[0]),
        raw: input.files[0],
      });
    }
  };

  return (
   <>
    <Head title='Poste sua foto' />
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          type="text"
          name="name"
          value={name.value}
          error={name.error}
          onChange={name.onChange}
          onBlur={name.onBlur}
        />
        <Input
          label="Peso"
          type="text"
          name="weight"
          value={weight.value}
          error={weight.error}
          onChange={weight.onChange}
          onBlur={weight.onBlur}
        />
        <Input
          label="Idade"
          type="text"
          name="age"
          value={age.value}
          error={age.error}
          onChange={age.onChange}
          onBlur={age.onBlur}
        />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      {img.preview && (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url('${img.preview}')` }}
        ></div>
      )}
    </section></>
  );
};
