import type { ButtonProps, CenterProps } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export type SquareButtonProps = CenterProps &
  ButtonProps & {
    accentColor: string;
    children: ReactNode;
    href?: string;
  };

export function SquareButton({
  accentColor,
  children,
  href,
  ...props
}: SquareButtonProps) {
  return (
    <Center
      as={href ? Link : 'button'}
      boxSize="3.5rem"
      bg="white/5"
      color="white/40"
      _active={{
        bg: accentColor,
        color: 'white',
      }}
      _hover={{
        bg: accentColor,
        color: 'white',
      }}
      _disabled={{
        opacity: 0.24,
      }}
      {...{ to: href }}
      {...props}
    >
      {children}
    </Center>
  );
}
