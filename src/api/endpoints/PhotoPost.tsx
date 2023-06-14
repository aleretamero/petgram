import { ChangeEvent, FormEvent, useState } from 'react';

export const PhotoPost = () => {
  const [token, setToken] = useState('');
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [idade, setIdade] = useState('');
  const [img, setImg] = useState<File | string>('');

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    const formData = new FormData();
    formData.append('img', img);
    formData.append('nome', nome);
    formData.append('peso', peso);
    formData.append('idade', idade);

    fetch('https://dogsapi.origamid.dev/json/api/photo', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })
     
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const input = ev.target;
    if (input && input.files) {
      setImg(input.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="token"
        value={token}
        onChange={e => setToken(e.target.value)}
      />
      <input
        type="text"
        placeholder="nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="peso"
        value={peso}
        onChange={e => setPeso(e.target.value)}
      />
      <input
        type="text"
        placeholder="idade"
        value={idade}
        onChange={e => setIdade(e.target.value)}
      />
      <input type="file" onChange={handleChange} />

      <button>Enviar</button>
    </form>
  );
};
