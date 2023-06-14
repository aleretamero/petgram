import { useEffect, useState } from 'react';

import { FeedModal } from './FeedModal';
import { FeedPhotos } from './FeedPhotos';

import { TypeDataPhoto } from '../../types/TypeDataPhoto';

type TypeProps = {
  user?: number | string;
};

export const Feed = ({ user }: TypeProps) => {
  const [pages, setPages] = useState([1]);
  const [infinity, setInfinity] = useState(true);
  const [modalPhoto, setModalPhoto] = useState<TypeDataPhoto | null>(null);

  useEffect(() => {
    const infinityScroll = () => {
      if (infinity) {
        let wait = false;
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;

        if (scroll > height * 0.85 && !wait) {
          setPages(pages => [...pages, pages.length + 1]);
          wait = true;

          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    };

    addEventListener('wheel', infinityScroll);
    addEventListener('scroll', infinityScroll);
    return () => {
      removeEventListener('wheel', infinityScroll);
      removeEventListener('scroll', infinityScroll);
    };
  }, [infinity]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map(page => (
        <FeedPhotos
          key={page}
          user={user === undefined ? 0 : user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinity={setInfinity}
        />
      ))}
    </div>
  );
};
