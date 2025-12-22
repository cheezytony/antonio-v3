import type { PropsWithChildren } from 'react';
import { createContext, useState } from 'react';

export interface StackContextProps {
  activeItem: StackItem | null;
  setActiveItem: React.Dispatch<React.SetStateAction<StackItem | null>>;
}

export const StackContext = createContext<StackContextProps>({
  activeItem: null,
  setActiveItem: () => {},
});

export function StackContextProvider({ children }: PropsWithChildren) {
  const [activeItem, setActiveItem] = useState<StackItem | null>(null);

  return (
    <StackContext
      value={{
        activeItem,
        setActiveItem,
      }}
    >
      {children}
    </StackContext>
  );
}
