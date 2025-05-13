import { useState, useEffect } from 'react';
import styles from './Calculator.module.css';
import { Display } from '../Display/Display';
import { Button } from '../Button/Button';

type Operation = '+' | '-' | '×' | '÷' | '=' | 'C';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState<Operation | null>(null);
  const [firstNumber, setFirstNumber] = useState('');
  const [newNumber, setNewNumber] = useState(false);

  const handleNumber = (number: string) => {
    if (newNumber) {
      setDisplay(number);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

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
            return;
          }
          result = num1 / num2;
          break;
      }

      setDisplay(result.toString());
      setOperation(null);
      setFirstNumber('');
      setNewNumber(true);
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

  return (
    <div className={styles.calculator}>
      <Display value={display} />
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
