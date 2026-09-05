// src/routes/__root.tsx
/// <reference types="vite/client" />
import { Provider } from '@/components/ui/provider';
import { AppContextProvider } from '@/contexts/app.context';
import { HistoryProvider } from '@/contexts/history.context';
import { Box, Button, Center, Span, Stack, Text } from '@chakra-ui/react';
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import '@/styles/fonts.css';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'theme-color',
        content: '#f06056',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.webmanifest',
      },
      {
        rel: 'dns-prefetch',
        href: 'https://res.cloudinary.com',
      },
      {
        rel: 'preconnect',
        href: 'https://res.cloudinary.com',
      },
      {
        rel: 'preload',
        href: '/fonts/funnel-display-latin-wght-normal.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Chimezie Antonio Okoro',
          url: 'https://antoniookoro.com',
          jobTitle: 'Software Engineer',
          sameAs: [
            'https://github.com/cheezytony',
            'https://linkedin.com/in/antoniookoro',
            'https://twitter.com/antonio_okoro',
          ],
        }),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <Center
      bg="black"
      _light={{ bg: 'white' }}
      minH="100dvh"
      overflow="hidden"
      pos="relative"
    >
      {/* Background glyph number */}
      <Text
        color="white"
        _light={{ color: 'black' }}
        fontSize="clamp(12rem, 40vw, 32rem)"
        fontWeight={800}
        letterSpacing="-0.06em"
        lineHeight={1}
        opacity={0.04}
        pos="absolute"
        pointerEvents="none"
        userSelect="none"
      >
        404
      </Text>

      <Stack align="center" gap={6} pos="relative" textAlign="center" px={6}>
        {/* Logo */}
        <Text
          fontSize={{ base: '1.75rem', md: '2.5rem' }}
          fontWeight="bold"
          letterSpacing="-0.04em"
          lineHeight={1}
        >
          antonio<Span color="#f06056">/</Span>
        </Text>

        {/* Divider */}
        <Box bg="#f06056" h="2px" w="3rem" borderRadius="full" />

        {/* Headline */}
        <Stack gap={2} align="center">
          <Text
            fontSize={{ base: '1rem', md: '1.125rem' }}
            color="white"
            _light={{ color: 'black' }}
            fontWeight={600}
            letterSpacing="-0.01em"
          >
            Page not found
          </Text>
          <Text
            fontSize="0.875rem"
            color="rgb(255 255 255 / 0.4)"
            _light={{ color: 'blackAlpha.500' }}
            maxW="22rem"
          >
            The page you're looking for doesn't exist or has been moved.
          </Text>
        </Stack>

        {/* CTA */}
        <Button
          asChild
          fontSize="sm"
          gap={2}
          py={3}
          px={6}
          variant="outline"
          _hover={{
            bg: '#f06056',
            color: 'white',
            borderColor: '#f06056',
          }}
        >
          <Link to="/">
            <Span>Go home</Span>
          </Link>
        </Button>
      </Stack>
    </Center>
  );
}

function RootComponent() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' });
    }
  }, []);

  return (
    <Provider>
      <HistoryProvider>
        <AppContextProvider>
          <RootDocument>
            <Outlet />
          </RootDocument>
        </AppContextProvider>
      </HistoryProvider>
    </Provider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
