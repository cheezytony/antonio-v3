'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from '~/theme';
import type { ColorModeProviderProps } from './color-mode';
import { ColorModeProvider } from './color-mode';

export function Provider(props: Readonly<ColorModeProviderProps>) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="antonio-v3-theme"
        {...props}
      />
    </ChakraProvider>
  );
}
