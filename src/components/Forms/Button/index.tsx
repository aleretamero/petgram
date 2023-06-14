import { ComponentPropsWithRef } from 'react';
import styles from './styles.module.css';

type TypeProps = ComponentPropsWithRef<'button'>;

export const Button = ({ children, ...props }: TypeProps) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};
