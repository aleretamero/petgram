import { ComponentPropsWithRef, SyntheticEvent, useState } from 'react';
import styles from './styles.module.css';

type TypeProps = ComponentPropsWithRef<'img'> & {
  alt: string;
  src: string;
};

export const Image = ({ alt, src, ...props }: TypeProps) => {
  const [skeleton, setSkeleton] = useState(true);

  const handleLoad = (ev: SyntheticEvent<HTMLImageElement>) => {
    setSkeleton(false);
    ev.currentTarget.style.opacity = '1';
  };

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}

      <img
        onLoad={ev => handleLoad(ev)}
        className={styles.img}
        src={src}
        alt={alt}
        {...props}
      />
    </div>
  );
};
