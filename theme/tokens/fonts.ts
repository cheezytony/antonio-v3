import { defineTokens } from '@chakra-ui/react';

export const fonts = defineTokens.fonts({
  heading: {
    value:
      '"Funnel Display", "Averia Serif Libre", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  body: {
    value:
      '"Funnel Display", Lato, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  mono: {
    value:
      'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  },
});
