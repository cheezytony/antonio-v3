import { AppContext } from '@/contexts/app.context';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Box, Center, Span, Text } from '@chakra-ui/react';
import { use } from 'react';

const TYPEWRITER_TEXT = 'antonio';
const TYPEWRITER_INTERVAL = 50;
const TYPEWRITER_DELAY = 500;

const ANIMATION_DURATION = 1750;

const CIRCLE_STROKE_DASHARRAY = 4876;

export function SplashScreen() {
  const { canStartLoader } = use(AppContext);

  const text = useTypewriter(TYPEWRITER_TEXT, {
    interval: TYPEWRITER_INTERVAL,
    delay: TYPEWRITER_DELAY,
    index: 0,
  });

  return (
    <Center w="100dvw" h="100dvh" pos="fixed" inset={0}>
      <Box>
        <Text fontSize="5.5rem" fontWeight="bold" letterSpacing="-0.04em">
          {text}
          <Span color="red">/</Span>
        </Text>
      </Box>

      <Box
        asChild
        pos="absolute"
        top="100%"
        left="50%"
        transform="auto"
        translateX="-50%"
        translateY="-20%"
        w="full"
        transitionDuration={`${ANIMATION_DURATION}ms`}
        strokeDasharray={CIRCLE_STROKE_DASHARRAY}
        strokeDashoffset={canStartLoader ? 0 : CIRCLE_STROKE_DASHARRAY}
      >
        <svg
          viewBox="0 0 1920 1920"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_526_570)">
            <circle
              cx="960"
              cy="960"
              r="776"
              stroke="url(#paint0_linear_526_570)"
              strokeWidth="48"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_526_570"
              x="0"
              y="0"
              width="1920"
              height="1920"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="80"
                result="effect1_foregroundBlur_526_570"
              />
            </filter>
            <linearGradient
              id="paint0_linear_526_570"
              x1="960"
              y1="160"
              x2="960"
              y2="1760"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F06056" />
              <stop offset="0.5" stopOpacity="0" />
              <stop offset="1" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </Center>
  );
}
