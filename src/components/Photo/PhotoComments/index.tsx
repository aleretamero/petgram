import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

import { useUserContext } from '../../../hooks/useUserContext';
import { TypeComments } from '../../../types/TypeComments';
import { PhotoCommentsForm } from '../PhotoCommentsForm';

type TypeProps = {
  id: number;
  single: boolean;
  comments: TypeComments;
};

export const PhotoComments = (props: TypeProps) => {
  const [comments, setComments] = useState(() => props.comments);
  const commentsSection = useRef<HTMLUListElement>(null);
  const { login } = useUserContext();

  useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map(comment => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};
