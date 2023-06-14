import { Dispatch, SetStateAction, useEffect } from 'react';

import styles from './styles.module.css';

import useFetch from '../../../hooks/useFetch';

// Components
import { Error } from '../../../components/Error';
import { Loading } from '../../../components/Loading';

import { PHOTOS_GET } from '../../../api/api';
import { FeedPhotosItem } from './FeedPhotosItem';

import { TypeDataPhoto } from '../../../types/TypeDataPhoto';
import { isTypeDataPhoto } from '../../../types/TypeData';

type TypeProps = {
  user: string | number;
  page: number;
  setInfinity: Dispatch<SetStateAction<boolean>>;
  setModalPhoto: Dispatch<SetStateAction<TypeDataPhoto | null>>;
};

export const FeedPhotos = ({
  setInfinity,
  setModalPhoto,
  user,
  page,
}: TypeProps) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const fetchPhotos = async () => {
      const total = 6;
      const { url, options } = PHOTOS_GET({
        page,
        total,
        user,
      });
      const { response, json } = await request(url, options);
      if (json && response?.ok && json.length < total) setInfinity(false);
    };

    fetchPhotos();
  }, [request, user, page, setInfinity]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && isTypeDataPhoto(data)) {
    return (
      <ul className={`${styles.feed} animeLeft`}>
        {data.map(photo => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  } else {
    return null;
  }
};
