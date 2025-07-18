import { useState, useEffect, useCallback } from 'react';
import styles from './Calculator.module.css';
import { Display } from '../Display/Display';
import { Button } from '../Button/Button';

/**
 * Tipo que define as operações possíveis da calculadora
 */
type Operation = '+' | '-' | '×' | '÷' | '=' | 'C' | '%' | '±';

const Operation = {
  Add: '+',
  Subtract: '-',
  Multiply: '×',
  Divide: '÷',
  Equals: '=',
  Clear: 'C',
  Percent: '%',
  Sign: '±',
} as const;

type OperationType = typeof Operation[keyof typeof Operation];

/**
 * Componente principal da calculadora
 * @component
 * @description Implementa uma calculadora com operações básicas, suporte a teclado
 * e recursos de acessibilidade. Gerencia o estado da calculadora e coordena
 * a interação entre o display e os botões.
 * @returns {JSX.Element} Uma calculadora completa com display e teclado numérico
 */
export const Calculator = () => {
  type CalculatorNumber = string;
  const [display, setDisplay] = useState<CalculatorNumber>('0');
  const [operation, setOperation] = useState<OperationType | null>(null);
  const [firstNumber, setFirstNumber] = useState<CalculatorNumber>('');
  const [newNumber, setNewNumber] = useState(false);
  // Estado para histórico de operações
  const [history, setHistory] = useState<string[]>([]);

  /**
   * Manipula a entrada de números na calculadora
   * @param {string} number - O número digitado ou clicado
   */
  const handleNumber = useCallback((number: CalculatorNumber) => {
    if (newNumber) {
      setDisplay(number);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? number : (display + number) as CalculatorNumber);
    }
  }, [newNumber, display]);

  const handleOperation = useCallback((op: OperationType) => {
    if (op === 'C') {
      setDisplay('0');
      setOperation(null);
      setFirstNumber('');
      setNewNumber(false);
      return;
    }
    if (op === '±') {
      if (display === '0' || display === 'Error') return;
      setDisplay((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
      return;
    }
    if (op === '%') {
      if (display === '0' || display === 'Error') return;
      setDisplay((prev) => (parseFloat(prev) / 100).toString());
      setNewNumber(true);
      return;
    }
    if (op === '=') {
      if (!operation || !firstNumber) return;
      const num1 = parseFloat(firstNumber as string);
      const num2 = parseFloat(display as string);
      let result: number = 0;
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
            setDisplay('Não é possível dividir por zero!' as CalculatorNumber);
            setNewNumber(true);
            setHistory(prev => [
              `${firstNumber} ÷ ${display} = Não é possível dividir por zero!`,
              ...prev
            ]);
            return;
          }
          result = num1 / num2;
          break;
      }
      // Corrige precisão de decimais (até 8 casas, remove zeros à direita)
      const formattedResult = parseFloat(result.toFixed(8)).toString() as CalculatorNumber;
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
  }, [display, operation, firstNumber, newNumber, setDisplay, setOperation, setFirstNumber, setNewNumber, setHistory]);

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
          handleOperation(event.key as OperationType);
          break;
        case '*':
          handleOperation(Operation.Multiply as OperationType);
          break;
        case '/':
          handleOperation(Operation.Divide as OperationType);
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
  }, [handleNumber, handleOperation]);

  return (
    <div className={styles.calculator}>
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
        <Button onClick={() => handleOperation(Operation.Clear as OperationType)}>C</Button>
        <Button onClick={() => handleOperation(Operation.Sign as OperationType)}>±</Button>
        <Button onClick={() => handleOperation(Operation.Percent as OperationType)}>%</Button>
        <Button onClick={() => handleOperation(Operation.Divide as OperationType)}>÷</Button>
        <Button onClick={() => handleNumber('7')}>7</Button>
        <Button onClick={() => handleNumber('8')}>8</Button>
        <Button onClick={() => handleNumber('9')}>9</Button>
        <Button onClick={() => handleOperation(Operation.Multiply as OperationType)}>×</Button>
        <Button onClick={() => handleNumber('4')}>4</Button>
        <Button onClick={() => handleNumber('5')}>5</Button>
        <Button onClick={() => handleNumber('6')}>6</Button>
        <Button onClick={() => handleOperation(Operation.Subtract as OperationType)}>-</Button>
        <Button onClick={() => handleNumber('1')}>1</Button>
        <Button onClick={() => handleNumber('2')}>2</Button>
        <Button onClick={() => handleNumber('3')}>3</Button>
        <Button onClick={() => handleOperation(Operation.Add as OperationType)}>+</Button>
        <Button onClick={() => handleNumber('0')} wide>0</Button>
        <Button onClick={() => handleNumber('.')}>.</Button>
        <Button onClick={() => handleOperation(Operation.Equals as OperationType)}>=</Button>
      </div>
    </div>
  );
};
