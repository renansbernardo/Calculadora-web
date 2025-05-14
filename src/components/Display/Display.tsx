import styles from './Display.module.css';

/**
 * Interface que define as propriedades do componente Display
 */
interface DisplayProps {
  /** O valor a ser exibido no display */
  value: string;
}

/**
 * Componente que exibe o resultado e valores da calculadora
 * @component
 * @param {DisplayProps} props - Propriedades do componente
 * @param {string} props.value - O valor a ser exibido no display
 * @returns {JSX.Element} Um display acessível com formatação de números
 */
export const Display = ({ value }: DisplayProps) => {
  // Formatar números grandes com separador de milhar
  const formatNumber = (num: string) => {
    const number = parseFloat(num);
    if (isNaN(number)) return num;
    return new Intl.NumberFormat('pt-BR').format(number);
  };
  return (
    <output 
      className={styles.display}
      aria-label="Resultado da calculadora"
      aria-live="polite"
      aria-atomic="true"
      htmlFor="calculator"
    >
      {formatNumber(value)}
    </output>
  );
};
