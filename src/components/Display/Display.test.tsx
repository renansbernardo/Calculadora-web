import { render, screen } from '@testing-library/react';
import { Display } from './Display';

describe('Display Component', () => {
  it('renders the value correctly', () => {
    render(<Display value="123" />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('formats large numbers with thousand separators', () => {
    render(<Display value="1000000" />);
    expect(screen.getByText('1.000.000')).toBeInTheDocument();
  });

  it('displays non-numeric values as is', () => {
    render(<Display value="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    render(<Display value="123" />);
    const display = screen.getByRole('textbox');
    
    expect(display).toHaveAttribute('aria-live', 'polite');
    expect(display).toHaveAttribute('aria-atomic', 'true');
    expect(display).toHaveAttribute('aria-label', 'Resultado da calculadora');
    expect(display).toHaveAttribute('tabIndex', '0');
  });
});
