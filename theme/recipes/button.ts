import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
  className: 'chakra-button',
  base: {
    display: 'inline-flex',
    appearance: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    position: 'relative',
    borderRadius: 'none',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    borderWidth: '1px',
    borderColor: 'transparent',
    cursor: 'button',
    flexShrink: '0',
    outline: '0',
    lineHeight: '1.2',
    isolation: 'isolate',
    fontWeight: 'medium',
    transitionProperty: 'common',
    transitionDuration: 'moderate',
    focusVisibleRing: 'outside',
    textTransform: 'uppercase',
    _disabled: {
      layerStyle: 'disabled',
    },
    _icon: {
      flexShrink: '0',
    },
  },
  variants: {
    size: {
      sm: {
        h: '9',
        minW: '9',
        px: '3.5',
        textStyle: 'sm',
        gap: '2',
        _icon: {
          width: '4',
          height: '4',
        },
      },
      md: {
        h: '12',
        minW: '12',
        textStyle: 'sm',
        px: '4',
        gap: '2',
        _icon: {
          width: '5',
          height: '5',
        },
      },
      lg: {
        h: '4.125rem',
        minW: '4.125rem',
        textStyle: '2xl',
        px: '4.125rem',
        gap: '3',
        _icon: {
          width: '5',
          height: '5',
        },
      },
    },
    variant: {
      solid: {
        bg: 'colorPalette.solid',
        color: 'colorPalette.contrast',
        _hover: {
          bg: 'colorPalette.solid/90',
        },
        _expanded: {
          bg: 'colorPalette.solid/90',
        },
      },
      subtle: {
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.muted',
        },
        _expanded: {
          bg: 'colorPalette.muted',
        },
      },
      surface: {
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
        shadow: '0 0 0px 1px var(--shadow-color)',
        shadowColor: 'colorPalette.muted',
        _hover: {
          bg: 'colorPalette.muted',
        },
        _expanded: {
          bg: 'colorPalette.muted',
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'colorPalette.muted',
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.subtle',
        },
        _expanded: {
          bg: 'colorPalette.subtle',
        },
      },
      ghost: {
        color: 'colorPalette.fg',
        _hover: {
          bg: 'colorPalette.subtle',
        },
        _expanded: {
          bg: 'colorPalette.subtle',
        },
      },
      plain: {
        color: 'colorPalette.fg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'solid',
  },
});
