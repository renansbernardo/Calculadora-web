import React, { createContext, useState, useEffect, useContext } from 'react';

const useLocalStorage = (key: string, defaultValue: boolean): [boolean, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(() => {
    const saved = localStorage.getItem(key);
    return saved === null ? defaultValue : saved === 'on';
  });

  useEffect(() => {
    localStorage.setItem(key, value ? 'on' : 'off');
  }, [key, value]);

  return [value, setValue];
};

interface SoundContextProps {
  soundOn: boolean;
  setSoundOn: (soundOn: boolean) => void;
}

const SoundContext = createContext<SoundContextProps>({
  soundOn: true,
  setSoundOn: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundOn, setSoundOn] = useLocalStorage('sound', true);

  return (
    <SoundContext.Provider value={{ soundOn, setSoundOn }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);