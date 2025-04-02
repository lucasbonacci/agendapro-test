// useGlobalContext.ts
import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext debe usarse dentro de un GlobalProvider');
  }
  return context;
};
