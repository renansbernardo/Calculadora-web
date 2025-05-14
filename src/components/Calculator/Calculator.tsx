import { useState, useEffect } from 'react';
import styles from './Calculator.module.css';
import { Display } from '../Display/Display';
import { Button } from '../Button/Button';

/** Tipo que define as operações possíveis da calculadora */
type Operation = '+' | '-' | '×' | '÷' | '=' | 'C';

/**
 * Componente principal da calculadora
 * @component
 * @description Implementa uma calculadora com operações básicas, suporte a teclado
 * e recursos de acessibilidade. Gerencia o estado da calculadora e coordena
 * a interação entre o display e os botões.
 * @returns {JSX.Element} Uma calculadora completa com display e teclado numérico
 */
export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<Operation | null>(null);
  const [firstNumber, setFirstNumber] = useState('');
  const [newNumber, setNewNumber] = useState(false);
  // Estado para histórico de operações
  const [history, setHistory] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  /**
   * Manipula a entrada de números na calculadora
   * @param {string} number - O número digitado ou clicado
   */
  const handleNumber = (number: string) => {
    if (newNumber) {
      setDisplay(number);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };
  /**
   * Manipula as operações da calculadora
   * @param {Operation} op - A operação a ser realizada
   * @description Processa as operações matemáticas básicas e controla
   * o fluxo de cálculo, incluindo tratamento de erros como divisão por zero
   */
  const handleOperation = (op: Operation) => {
    if (op === 'C') {
      setDisplay('0');
      setOperation(null);
      setFirstNumber('');
      setNewNumber(false);
      return;
    }

    if (op === '=') {
      if (!operation || !firstNumber) return;
      const num1 = parseFloat(firstNumber);
      const num2 = parseFloat(display);
      let result = 0;
      let operationString = `${firstNumber} ${operation} ${display}`;
      switch (operation) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '×':
          result = num1 * num2;
          break;
        case '÷':
          if (num2 === 0) {
            setDisplay('Error');
            setNewNumber(true);
            setHistory(prev => [
              `${firstNumber} ÷ ${display} = Error (divisão por zero)`,
              ...prev
            ]);
            return;
          }
          result = num1 / num2;
          break;
      }
      // Corrige precisão de decimais (até 8 casas, remove zeros à direita)
      const formattedResult = parseFloat(result.toFixed(8)).toString();
      setDisplay(formattedResult);
      setOperation(null);
      setFirstNumber('');
      setNewNumber(true);
      setHistory(prev => [
        `${operationString} = ${formattedResult}`,
        ...prev
      ]);
      return;
    }

    setOperation(op);
    setFirstNumber(display);
    setNewNumber(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Números e ponto
      if (/^[0-9.]$/.test(event.key)) {
        handleNumber(event.key);
      }
      // Operações
      switch (event.key) {
        case '+':
        case '-':
          handleOperation(event.key as Operation);
          break;
        case '*':
          handleOperation('×');
          break;
        case '/':
          handleOperation('÷');
          break;
        case 'Enter':
          handleOperation('=');
          break;
        case 'Escape':
          handleOperation('C');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, operation, firstNumber, newNumber]); // Dependências necessárias

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Alterna tema manualmente
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <div className={styles.calculator}>
      <button
        aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
        onClick={toggleTheme}
        style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <Display value={display} />
      {/* Histórico de operações */}
      {history.length > 0 && (
        <div className={styles.history} aria-label="Histórico de operações">
          <ul>
            {history.slice(0, 5).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.buttons}>
        <Button onClick={() => handleOperation('C')}>C</Button>
        <Button onClick={() => handleOperation('÷')}>÷</Button>
        <Button onClick={() => handleOperation('×')}>×</Button>
        <Button onClick={() => handleOperation('-')}>-</Button>
        
        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button onClick={() => handleOperation('+')}>+</Button>
        
        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        
        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button onClick={() => handleOperation('=')}>=</Button>
        
        <Button onClick={() => handleNumber('0')} wide>0</Button>
        <Button onClick={() => handleNumber('.')}>.</Button>
      </div>
    </div>
  );
};
