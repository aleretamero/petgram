import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { PHOTO_GET } from '../../api/api';
import { Error } from '../Error';
import { Loading } from '../Loading';
import { PhotoContent } from './PhotoContent';
import { isTypePhotoAndComments } from '../../types/TypeData';
import { Head } from '../Head';

export const Photo = () => {
  const { id } = useParams();

  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    if (id) {
      const { url, options } = PHOTO_GET(Number(id));
      request(url, options);
    }
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data && isTypePhotoAndComments(data))
    return (
      <>
        {data.photo.title && <Head title={data.photo.title} />}
        <section className="container mainContainer">
          <PhotoContent single={true} data={data} />
        </section>
      </>
    );
  else null;
};
