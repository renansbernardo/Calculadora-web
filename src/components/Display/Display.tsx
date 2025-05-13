import styles from './Display.module.css';

interface DisplayProps {
  value: string;
}

export const Display = ({ value }: DisplayProps) => {
  // Formatar números grandes com separador de milhar
  const formatNumber = (num: string) => {
    const number = parseFloat(num);
    if (isNaN(number)) return num;
    return new Intl.NumberFormat('pt-BR').format(number);
  };

  return (
    <div 
      className={styles.display}
      role="textbox"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Resultado da calculadora"
      tabIndex={0}
    >
      {formatNumber(value)}
    </div>
  );
};
