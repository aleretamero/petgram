import { Dispatch, MouseEvent, SetStateAction, useEffect } from 'react';

import styles from './styles.module.css';

import useFetch from '../../../hooks/useFetch';
import { PHOTO_GET } from '../../../api/api';
import { Error } from '../../../components/Error';
import { Loading } from '../../../components/Loading';
import { PhotoContent } from '../../../components/Photo/PhotoContent';

import { TypeDataPhoto } from '../../../types/TypeDataPhoto';
import { isTypePhotoAndComments } from '../../../types/TypeData';

type TypeProps = {
  photo: TypeDataPhoto;
  setModalPhoto: Dispatch<SetStateAction<TypeDataPhoto | null>>;
};

export const FeedModal = ({ photo, setModalPhoto }: TypeProps) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options).then(res => {
      return res;
    });
  }, [photo, request]);

  const handleOutsideClick = (ev: MouseEvent) => {
    if (ev.target === ev.currentTarget) {
      setModalPhoto(null);
    }
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {isTypePhotoAndComments(data) && <PhotoContent data={data} />}
      {error && <Error error={error} />}
      {loading && <Loading />}
    </div>
  );
};
