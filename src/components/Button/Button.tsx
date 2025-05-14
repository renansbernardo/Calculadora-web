import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';
import { playClickSound } from './soundUtils';

/**
 * Interface que define as propriedades do componente Button
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>} Estende as propriedades padrão de um botão HTML
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Conteúdo do botão */
  children: React.ReactNode;
  /** Define se o botão deve ocupar o espaço de duas colunas */
  wide?: boolean;
}

/**
 * Componente de botão reutilizável com suporte a acessibilidade
 * @component
 * @param {ButtonProps} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {boolean} [props.wide] - Se verdadeiro, o botão ocupa duas colunas no grid
 * @returns {JSX.Element} Um botão estilizado com suporte a acessibilidade
 */
export const Button = ({ children, wide, ...props }: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    playClickSound();
    if (props.onClick) props.onClick(e);
  };
  return (
    <button
      className={`${styles.button} ${wide ? styles.wide : ''}`}
      {...props}
      onClick={handleClick}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </button>
  );
};
