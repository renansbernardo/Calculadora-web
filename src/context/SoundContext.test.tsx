import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SoundProvider, useSound } from './SoundContext';

const TestComponent: React.FC = () => {
  const { soundOn, setSoundOn } = useSound();

  return (
    <div>
      <span data-testid="sound-status">{soundOn ? 'On' : 'Off'}</span>
      <button onClick={() => setSoundOn(!soundOn)}>Toggle Sound</button>
    </div>
  );
};

describe('SoundContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize soundOn from localStorage', () => {
    localStorage.setItem('sound', 'off');
    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    );
    expect(screen.getByTestId('sound-status')).toHaveTextContent('Off');
  });

  it('should update soundOn and localStorage when toggled', async () => {
    render(
      <SoundProvider>
        <TestComponent />
      </SoundProvider>
    );
    expect(screen.getByTestId('sound-status')).toHaveTextContent('On');

    const toggleButton = screen.getByRole('button', { name: 'Toggle Sound' });
    await act(async () => {
      userEvent.click(toggleButton);
    });

    await screen.findByText('Off', { selector: '[data-testid="sound-status"]' });
    expect(screen.getByTestId('sound-status')).toHaveTextContent('Off');
    expect(localStorage.getItem('sound')).toBe('off');
  });
});