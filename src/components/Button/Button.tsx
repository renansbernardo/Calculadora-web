import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  wide?: boolean;
}

export const Button = ({ children, wide, ...props }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${wide ? styles.wide : ''}`}
      {...props}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
};
