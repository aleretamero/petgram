import styles from './styles.module.css';

import { Link } from 'react-router-dom';

import { PhotoComments } from '../PhotoComments';

import { TypePhotoAndComments } from '../../../types/TypePhotoAndComments';
import { useUserContext } from '../../../hooks/useUserContext';
import { isTypeUser } from '../../../types/TypeData';
import { PhotoDelete } from '../PhotoDelete';
import { Image } from '../../Image';

type TypeProps = {
  data: TypePhotoAndComments;
  single?: boolean;
};

export const PhotoContent = ({ data, single }: TypeProps) => {
  const user = useUserContext();

  const { photo, comments } = data;
  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        {photo.src && photo.title && (
          <Image src={photo.src} alt={photo.title} />
        )}
      </div>
      <div className={styles.details}>
        <div>
          <div>
            <p className={styles.author}>
              {isTypeUser(user.data) && user.data.username === photo.author ? (
                <PhotoDelete id={photo.id} />
              ) : (
                <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
              )}

              <span className={styles.views}>{photo.acessos}</span>
            </p>
            <h1 className="title">
              <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
            </h1>
            <ul className={styles.attributes}>
              <li>{photo.peso} Kg</li>
              <li>{photo.idade} anos</li>
            </ul>
          </div>
        </div>
      </div>
      <PhotoComments
        single={single || false}
        id={photo.id}
        comments={comments}
      />
    </div>
  );
};
