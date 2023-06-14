import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import styles from './styles.module.css';

import useFetch from '../../../hooks/useFetch';
import { COMMENT_POST } from '../../../api/api';
import { Error } from '../../Error';
import { ReactComponent as Send } from '../../../assets/enviar.svg';
import { TypeComments } from '../../../types/TypeComments';

type TypeProps = {
  id: number;
  single: boolean;
  setComments: Dispatch<SetStateAction<TypeComments>>;
  comments?: TypeComments;
};

export const PhotoCommentsForm = ({ id, single, setComments }: TypeProps) => {
  const { request, error } = useFetch();
  const [comment, setComment] = useState('');

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();

    const { url, options } = COMMENT_POST(id, { comment });

    const { response, json } = await request(url, options);

    if (response && response.ok) {
      setComment('');
      setComments(comments => [...comments, json]);
    }
  };

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        value={comment}
        onChange={e => setComment(e.target.value)}
        name="comment"
        id="comment"
        placeholder="Comente..."
      ></textarea>
      <button className={styles.button}>
        <Send />
      </button>
      <Error error={error} />
    </form>
  );
};
