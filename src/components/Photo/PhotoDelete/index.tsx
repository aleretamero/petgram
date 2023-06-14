import { PHOTO_DELETE } from '../../../api/api';
import useFetch from '../../../hooks/useFetch';
import styles from './styles.module.css';

export const PhotoDelete = ({ id }: { id: number }) => {
  const { request, loading } = useFetch();

  const handleClick = async () => {
    const confirm = window.confirm('Tem certeza que deseja deletar?');

    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response } = await request(url, options);
      if (response && response.ok) location.reload();
    }
  };

  return (
    <>
      {loading ? (
        <button disabled className={styles.delete}>
          Deletando
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};
