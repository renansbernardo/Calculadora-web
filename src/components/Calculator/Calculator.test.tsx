import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from './Calculator';
import userEvent from '@testing-library/user-event';

describe('Calculator Component', () => {
  it('renders with initial display value of 0', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('performs addition correctly', async () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('performs subtraction correctly', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('performs multiplication correctly', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('×'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('performs division correctly', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('handles division by zero', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('6'));
    fireEvent.click(screen.getByText('÷'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('clears the display when C is clicked', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('C'));

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles keyboard input', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.keyboard('5');
    await user.keyboard('+');
    await user.keyboard('3');
    await user.keyboard('{Enter}');

    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('handles decimal numbers', () => {
    render(<Calculator />);
    
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('='));

    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
