import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';

import { TypeDataPhoto } from '../../../../types/TypeDataPhoto';
import { Image } from '../../../../components/Image';

type TypeProps = {
  photo: TypeDataPhoto;
  setModalPhoto: Dispatch<SetStateAction<TypeDataPhoto | null>>;
};

export const FeedPhotosItem = ({ photo, setModalPhoto }: TypeProps) => {
  return (
    <li className={styles.photo} onClick={() => setModalPhoto(photo)}>
      {photo.src && photo.title && <Image src={photo.src} alt={photo.title} />}
      <span className={styles.view}>{photo.acessos}</span>
    </li>
  );
};
