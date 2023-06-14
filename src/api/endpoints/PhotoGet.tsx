import { FormEvent, useState } from 'react';

export const PhotoGet = () => {
  const [id] = useState('');
  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    fetch('https://dogsapi.origamid.dev/json/api/photo')
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={e => e.target.value} />
      <button>Enviar</button>
    </form>
  );
};
