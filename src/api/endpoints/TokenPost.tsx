import { FormEvent, useState } from 'react';

export const TokenPost = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        setToken(json.token);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p style={{ wordBreak: 'break-all' }}>{token}</p>
      <button>Enviar</button>
    </form>
  );
};
