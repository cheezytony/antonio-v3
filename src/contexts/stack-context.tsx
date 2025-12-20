import { createContext } from 'react';

export interface StackContextProps {
  activeItem: StackItem | null;
  setActiveItem: React.Dispatch<React.SetStateAction<StackItem | null>>;
}

export const StackContext = createContext<StackContextProps>({
  activeItem: null,
  setActiveItem: () => {},
});
