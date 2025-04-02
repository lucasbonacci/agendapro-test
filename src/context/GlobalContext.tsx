import React, { createContext, useState, ReactNode } from 'react';
import { StarWarsCharacter } from '@/types/StarWarsCharacter';

interface GlobalContextType {
  character: StarWarsCharacter | null;
  selectCharacter: (characterData: StarWarsCharacter) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [character, setCharacter] = useState<StarWarsCharacter | null>(null);

  const selectCharacter = (characterData: StarWarsCharacter) => {
    setCharacter(characterData);
  };

  return (
    <GlobalContext.Provider value={{ character, selectCharacter }}>
      {children}
    </GlobalContext.Provider>
  );
};
