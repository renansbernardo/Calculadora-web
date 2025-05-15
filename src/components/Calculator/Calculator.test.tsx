import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from './Calculator';
import userEvent from '@testing-library/user-event';

describe('Calculator Component', () => {
  it('renders with initial display value of 0', () => {
    render(<Calculator />);
    // Use getByRole to select the display output specifically
    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('0');
  });

  it('performs addition correctly', async () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('5');
  });

  it('performs subtraction correctly', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('2');
  });

  it('performs multiplication correctly', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByRole('button', { name: '4' }));
    fireEvent.click(screen.getByRole('button', { name: '×' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('12');
  });

  it('performs division correctly', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByRole('button', { name: '6' }));
    fireEvent.click(screen.getByRole('button', { name: '÷' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('3');
  });

  it('handles division by zero', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByRole('button', { name: '6' }));
    fireEvent.click(screen.getByRole('button', { name: '÷' }));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('Não é possível dividir por zero!');
  });

  it('clears the display when C is clicked', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: 'C' }));

    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('0');
  });

  it('handles keyboard input', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.keyboard('5');
    await user.keyboard('+');
    await user.keyboard('3');
    await user.keyboard('{Enter}');

    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('8');
  });

  it('handles decimal numbers', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '.' }));
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '.' }));
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));

    const display = screen.getByRole('status', { name: /resultado da calculadora/i });
    expect(display).toHaveTextContent('4');
  });

  it('adds operation to history after calculation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    // O histórico deve conter a operação
    expect(screen.getByText('2 + 3 = 5')).toBeInTheDocument();
  });

  it('shows division by zero error in history', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '6' }));
    fireEvent.click(screen.getByRole('button', { name: '÷' }));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    expect(screen.getByText('6 ÷ 0 = Não é possível dividir por zero!')).toBeInTheDocument();
  });

  it('shows up to 5 most recent operations in history', () => {
    render(<Calculator />);
    for (let i = 1; i <= 6; i++) {
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      fireEvent.click(screen.getByRole('button', { name: '+' }));
      fireEvent.click(screen.getByRole('button', { name: String(i) }));
      fireEvent.click(screen.getByRole('button', { name: '=' }));
    }
    // O histórico deve mostrar apenas as 5 últimas operações
    expect(screen.queryByText('1 + 1 = 2')).not.toBeInTheDocument();
    expect(screen.getByText('1 + 6 = 7')).toBeInTheDocument();
  });
});

describe('Calculator decimal precision', () => {
  it('limits result to 8 decimal places and removes trailing zeros', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '÷' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    const display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('0,333');
    expect(screen.getByText('1 ÷ 3 = 0.33333333')).toBeInTheDocument();
  });

  it('removes trailing zeros after decimal', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '÷' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    const display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('0,5');
    expect(screen.getByText('1 ÷ 2 = 0.5')).toBeInTheDocument();
  });

  it('handles long decimal additions', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '.' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '.' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    const display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('0,3');
    const historyItem = screen.getByText((content) => {
      return (
        typeof content === 'string' &&
        (content.trim() === '0.1 + 0.2 = 0.3' || content.trim() === '.1 + .2 = 0.3')
      );
    });
    expect(historyItem).toBeInTheDocument();
  });

  it('performs percentage operation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    fireEvent.click(screen.getByRole('button', { name: '0' }));
    fireEvent.click(screen.getByRole('button', { name: '%' }));
    const display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('0,5');
  });

  it('toggles sign with ± button', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '8' }));
    fireEvent.click(screen.getByRole('button', { name: '±' }));
    let display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('-8');
    fireEvent.click(screen.getByRole('button', { name: '±' }));
    display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('8');
  });

  it('handles multiple operators', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '-' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    const display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('1');
  });

  it('handles chained operations', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    fireEvent.click(screen.getByRole('button', { name: '×' }));
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    const display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('12');
  });

  it('handles large numbers', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '9' }));
    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: '=' }));
    const display = screen.getByLabelText(/resultado da calculadora/i);
    expect(display).toHaveTextContent('10.000.000');
  });
});
