import { useState } from 'react';

const typesValidate = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um email válido',
  },
  number: {
    regex: /^\d+$/i,
    message: 'Utilize apenas números',
  },
};

export const useForm = (type?: keyof typeof typesValidate | undefined) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string) => {
    if (type === undefined) return true;
    // if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (typesValidate[type] && !typesValidate[type].regex.test(value)) {
      setError(typesValidate[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const onChange = ({ target }: { target: HTMLInputElement }) => {
    if (error) validate(target.value);
    setValue(target.value);
  };

  return {
    value,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};
