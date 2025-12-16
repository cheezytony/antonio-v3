import { AppContext } from '@/contexts/app-context';
import { Cursor } from '@/modules/cursor';
import { SplashScreen } from '@/modules/splash-screen';
import { generateColorVariants } from '@/utils/colors';
import type { CenterProps } from '@chakra-ui/react';
import { Box, Center, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { use, useMemo, useState } from 'react';

interface RouteProps {
  title: string;
  key: string;
  color: string;
  href?: string;
}

interface TileProps extends CenterProps {
  route: RouteProps;
  shade?: string;
}

const PRIMARY_COLOR = '#F06056';

const MotionBox = motion.create(Box);
const MotionCenter = motion.create(Center);

const ROUTES: Array<RouteProps> = [
  {
    title: 'My Bio',
    key: 'bio',
    color: '#F06056',
    href: '/my-bio',
  },
  {
    title: 'Tech Stack',
    key: 'stack',
    color: '#35977D',
    href: '/my-stack',
  },
  {
    title: 'Timeline',
    key: 'timeline',
    color: '#2C95C9',
    href: '/timeline',
  },
  {
    title: 'Projects',
    key: 'projects',
    color: '#BFA436',
    href: '/my-projects',
  },
  {
    title: 'Gaming',
    key: 'gaming',
    color: '#686CDE',
    href: '/gaming',
  },
  {
    title: 'Socials',
    key: 'socials',
    color: '#BF6D36',
    href: '/my-socials',
  },
  {
    title: 'Chat Me',
    key: 'chat-me',
    color: '#833597',
    href: '/contact-me',
  },
];

export const Route = createFileRoute('/__home')({
  component: RouteComponent,
});

function Tile({ route, shade, ...props }: TileProps) {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const isActive = pathname === route.href;
  const isOnHomepage = pathname === '/';

  const handleClick = () => {
    route.href && navigator({ to: route.href });
  };

  const transition = useMemo(() => {
    const transitions = ['color 300ms', 'height 200ms'];

    transitions.push(
      isOnHomepage ? 'background-color 500ms, flex 500ms' : 'flex 200ms',
    );

    return transitions.join(',');
  }, [isOnHomepage]);

  return (
    <Center
      {...props}
      as="button"
      aria-current={isActive && 'page'}
      bg={
        isOnHomepage
          ? { base: route.color, md: shade || route.color }
          : undefined
      }
      className="group"
      flex={1}
      h="full"
      transition={transition}
      w={{ base: 'full', md: 'auto' }}
      _hover={
        isOnHomepage
          ? { flex: 1.5 }
          : { bg: !isActive ? `${route.color}/50` : undefined }
      }
      _currentPage={{
        bg: route.color,
        h: 'calc(100% + 0.5rem)',
        flex: 1.5,
      }}
      onClick={handleClick}
    >
      <HStack gap={1} pos="relative" justify="center">
        <Text
          aria-current={isActive && 'page'}
          color={`rgb(255 255 255 / ${isOnHomepage ? 0.64 : 0.4})`}
          fontSize="0.875rem"
          textTransform="uppercase"
          _currentPage={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 800,
          }}
          _groupHover={{
            color: 'white',
            fontWeight: 800,
            ...(isOnHomepage && {
              left: {
                md: '-0.25rem',
              },
            }),
          }}
          overflow="clip"
          pos="relative"
          left={0}
          transitionDuration="200ms"
          transform="auto"
        >
          {route.title}
        </Text>

        <AnimatePresence>
          {isOnHomepage && (
            <MotionBox
              asChild
              pos="absolute"
              left="100%"
              opacity={0}
              translate="0 0"
              transitionDuration="200ms"
              hideBelow="md"
              _groupHover={{
                opacity: 1,
                translate: '0.25rem 0',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.502 12L5.00195 12M13.002 6C13.002 6 19.0019 10.4189 19.002 12C19.002 13.5812 13.002 18 13.002 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </MotionBox>
          )}
        </AnimatePresence>
      </HStack>
    </Center>
  );
}

function RouteComponent() {
  const { isReady } = use(AppContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isOnHomepage = pathname === '/';

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  const activeRoute = useMemo(
    () => ROUTES.find((route) => route.href === pathname),
    [pathname],
  );

  const hoveredRoute = useMemo(
    () => hoveredIndex !== null && ROUTES[hoveredIndex],
    [hoveredIndex],
  );

  const accentColor =
    (activeRoute && activeRoute.color) ||
    (hoveredRoute && hoveredRoute.color) ||
    PRIMARY_COLOR;

  const colorShades = useMemo(() => {
    if (!hoveredRoute || hoveredIndex === null) return [];

    const hoveredColor = hoveredRoute.color;

    return ROUTES.map((_, index) => {
      if (index === hoveredIndex) return hoveredColor;

      const distance = Math.abs(index - hoveredIndex);

      const variants = generateColorVariants(hoveredColor, 0, 'darker');

      return variants[Math.min(distance, variants.length - 1)];
    });
  }, [hoveredRoute, pathname]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0);
  };

  return (
    <Box overflowX="clip">
      <SplashScreen />

      <Stack
        bg={accentColor}
        direction={{ base: 'column', md: 'row' }}
        gap={0}
        h="100dvh"
        ml="auto"
        transitionDuration="1000ms"
        transitionTimingFunction="ease-in-smooth"
        pos="relative"
        zIndex={1}
        translate={isReady ? '0 0' : { base: '100% 0', md: '0 0 ' }}
        w={isReady ? 'full' : { base: 'full', md: 0 }}
      >
        <Center
          bg="rgb(0 0 0 / 0.85)"
          as="aside"
          flexShrink={0}
          h={{ base: '3.5rem', md: 'auto' }}
          w={{ base: 'full', md: '4.75rem' }}
        >
          <Text
            fontSize="2.5rem"
            fontWeight="bold"
            lineHeight={1.1}
            letterSpacing="-0.02em"
            rotate={{ md: '-90deg' }}
          >
            antonio
            <Box as="span" color={accentColor}>
              /
            </Box>
          </Text>
        </Center>

        <Flex pos="relative" pb={{ md: '3.5rem' }} flex={1}>
          <Flex as="main" bg="rgb(0 0 0 / 92)" flex={1} pos="relative">
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              flex={1}
              key={pathname}
            >
              <Outlet />
            </MotionBox>

            <Box
              asChild
              pos="absolute"
              top={0}
              right={0}
              pointerEvents="none"
              hideBelow="md"
              w="max(20rem, 20%)"
            >
              <svg
                viewBox="0 0 320 864"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_648_2)">
                  <path
                    d="M419.5 784L245.5 784L245.5 293L113.5 293L113.5 105.5L40 105.499L40 -116"
                    stroke="white"
                    strokeOpacity="0.08"
                  />
                  <g filter="url(#filter0_d_648_2)">
                    <path
                      d="M113.5 136.001L113.5 105.501L103 105.5"
                      stroke={accentColor}
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_648_2"
                    x="95"
                    y="97"
                    width="27"
                    height="47"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.941176 0 0 0 0 0.376471 0 0 0 0 0.337255 0 0 0 0.8 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_648_2"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_648_2"
                      result="shape"
                    />
                  </filter>
                  <clipPath id="clip0_648_2">
                    <rect width="320" height="864" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Box>
          </Flex>

          <Stack
            align="flex-end"
            as="nav"
            bg="rgb(0 0 0 / 0.85)"
            bottom="0"
            direction={{ base: 'column', md: 'row' }}
            pos="absolute"
            gap={0}
            h={isOnHomepage ? 'full' : { base: 0, md: '3.5rem' }}
            transitionDuration="200ms"
            w="full"
            overflow="clip"
            translate={isOnHomepage ? {} : { base: '0 100%', md: '0 0 ' }}
          >
            <AnimatePresence>
              {!isOnHomepage && (
                <MotionCenter
                  initial={{ opacity: 0, translateX: '-100%', width: 0 }}
                  animate={{
                    opacity: 1,
                    translateX: 0,
                    width: 56,
                    transition: {
                      delay: 0.2,
                      duration: 0.2,
                      ease: 'easeInOut',
                    },
                  }}
                  as={Link}
                  aspectRatio={1}
                  className="group"
                  key="home-button"
                  hideBelow="md"
                  h="full"
                  _hover={{
                    bg: `${accentColor}/50`,
                  }}
                  {...{ to: '/' }}
                >
                  <Box asChild opacity={0.4} _groupHover={{ opacity: 1 }}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.5 9.99198V12.084C2.5 14.8338 2.5 16.2087 3.35427 17.0631C4.20854 17.9173 5.58347 17.9173 8.33333 17.9173H11.6667C14.4165 17.9173 15.7914 17.9173 16.6457 17.0631C17.5 16.2087 17.5 14.8338 17.5 12.084V9.99198C17.5 8.5909 17.5 7.89043 17.2034 7.28403C16.9068 6.67763 16.3539 6.24755 15.248 5.38741L13.5813 4.09111C11.8609 2.75303 11.0007 2.08398 10 2.08398C8.99925 2.08398 8.13908 2.75303 6.41868 4.09111L4.75201 5.38741C3.64611 6.24755 3.09316 6.67763 2.79658 7.28403C2.5 7.89043 2.5 8.5909 2.5 9.99198Z"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.3333 14.166H6.66663"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                </MotionCenter>
              )}
            </AnimatePresence>

            {ROUTES.map((route, index) => (
              <Tile
                key={route.key}
                route={route}
                shade={colorShades[index]}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </Stack>
        </Flex>

        <AnimatePresence>
          {!isOnHomepage && (
            <Center
              as="button"
              bg="rgb(255 255 255 / 0.05)"
              color="rgb(255 255 255 / 0.4)"
              boxSize="3.5rem"
              pos="absolute"
              top={0}
              right={0}
              transitionDuration="200ms"
              _hover={{
                bg: accentColor,
                color: 'white',
              }}
              _active={{
                bg: accentColor,
                color: 'white',
              }}
              onClick={() => navigate({ to: '/' })}
            >
              <Box asChild>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5.00068 14.9993M14.9993 15L5 5.00071"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
            </Center>
          )}
        </AnimatePresence>
      </Stack>

      <Cursor />
    </Box>
  );
}
