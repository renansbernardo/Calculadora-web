import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>7</Button>);
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>7</Button>);
    
    fireEvent.click(screen.getByText('7'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies wide class when wide prop is true', () => {
    render(<Button wide>0</Button>);
    const button = screen.getByText('0');
    expect(button.className).toContain('wide');
  });

  it('sets aria-label when children is a string', () => {
    render(<Button>+</Button>);
    const button = screen.getByText('+');
    expect(button).toHaveAttribute('aria-label', '+');
  });
});
