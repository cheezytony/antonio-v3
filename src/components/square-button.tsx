import type { ButtonProps, CenterProps } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';

export type SquareButtonProps = CenterProps &
  ButtonProps & {
    accentColor: string;
    children: ReactNode;
    href?: LinkProps['to'];
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
      _focus={{
        outlineOffset: '-1px',
        outlineWidth: '1px',
        outlineStyle: 'groove',
        outlineColor: accentColor,
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
