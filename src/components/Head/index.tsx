import { useEffect } from 'react';

type TypeProps = {
  title: string;
  description?: string;
};

export const Head = ({ title, description }: TypeProps) => {
  useEffect(() => {
    document.title = title + ' | Dogs';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description || '');
  }, [title, description]);

  return <></>;
};
