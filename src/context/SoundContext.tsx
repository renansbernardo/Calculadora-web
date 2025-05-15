import React, { createContext, useState, useEffect, useContext } from 'react';

interface SoundContextProps {
  soundOn: boolean;
  setSoundOn: (soundOn: boolean) => void;
}

const SoundContext = createContext<SoundContextProps>({
  soundOn: true,
  setSoundOn: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundOn, setSoundOn] = useState(() => {
    const saved = localStorage.getItem('sound');
    return saved === null ? true : saved === 'on';
  });

  useEffect(() => {
    localStorage.setItem('sound', soundOn ? 'on' : 'off');
  }, [soundOn]);

  return (
    <SoundContext.Provider value={{ soundOn, setSoundOn }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);