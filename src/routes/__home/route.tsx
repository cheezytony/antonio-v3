import { AppContext } from '@/contexts/app-context';
import { Cursor } from '@/modules/cursor';
import { SplashScreen } from '@/modules/splash-screen';
import { generateColorVariants } from '@/utils/colors';
import type { CenterProps } from '@chakra-ui/react';
import { Box, Center, Flex, HStack, Text } from '@chakra-ui/react';
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { use, useMemo, useState } from 'react';

export const Route = createFileRoute('/__home')({
  component: RouteComponent,
});

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

const MotionBox = motion.create(Box);
const MotionCenter = motion.create(Center);

function Tile({ route, shade, ...props }: TileProps) {
  const navigator = useNavigate();
  const { pathname } = useLocation();

  const isActive = pathname === route.href;
  const isOnHomepage = pathname === '/';

  const handleClick = () => {
    route.href && navigator({ to: route.href });
  };

  return (
    <Center
      {...props}
      as="button"
      aria-current={isActive && 'page'}
      bg={isOnHomepage ? shade || route.color : undefined}
      className="group"
      flex={1}
      h="full"
      transition="flex 200ms, color 300ms, height 200ms"
      _hover={isOnHomepage ? { flex: 1.5 } : { bg: route.color }}
      _currentPage={{
        bg: route.color,
        h: 'calc(100% + 0.5rem)',
        flex: 1.5,
      }}
      onClick={handleClick}
    >
      <HStack gap={1}>
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
          }}
          overflow="clip"
        >
          {route.title.split('').map((char, index) => (
            <Box as="span" key={index} pos="relative">
              <Box as="i" opacity={0}>
                {char}
              </Box>
              <Box
                as="span"
                key="initial"
                pos="absolute"
                left={0}
                top={0}
                transform="auto"
                transitionDelay={`${index * 25}ms`}
                transitionDuration="100ms"
                _groupHover={
                  !isOnHomepage
                    ? {
                        translateY: '-100%',
                      }
                    : {}
                }
              >
                {char}
              </Box>
              {!isOnHomepage && (
                <Box
                  as="span"
                  key="hovered"
                  pos="absolute"
                  left={0}
                  top={0}
                  transform="auto"
                  transitionDelay={`${index * 25}ms`}
                  transitionDuration="100ms"
                  translateY="100%"
                  _groupHover={{
                    translateY: '0',
                  }}
                >
                  {char}
                </Box>
              )}
            </Box>
          ))}
        </Text>

        <AnimatePresence>
          {isOnHomepage && (
            <MotionBox
              asChild
              display="none"
              _groupHover={{ display: 'block' }}
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
    <div>
      <SplashScreen />

      <Flex
        h="100dvh"
        bg={accentColor}
        ml="auto"
        transitionDuration="1000ms"
        transitionTimingFunction="ease-in-smooth"
        w={isReady ? 'full' : 0}
      >
        <Center bg="rgb(0 0 0 / 0.85)" as="aside" w="4.75rem">
          <Text
            fontSize="2.5rem"
            fontWeight="bold"
            lineHeight={1.1}
            letterSpacing="-0.02em"
            rotate="-90deg"
          >
            antonio
            <Box as="span" color={accentColor}>
              /
            </Box>
          </Text>
        </Center>

        <Flex pos="relative" pb="3.5rem" flex={1}>
          <Box as="main" bg="rgb(0 0 0 / 92)" flex={1}>
            <Outlet />
          </Box>

          <HStack
            align="flex-end"
            as="nav"
            bg="rgb(0 0 0 / 0.85)"
            bottom="0"
            pos="absolute"
            gap={0}
            h={isOnHomepage ? 'full' : '3.5rem'}
            transitionDuration="200ms"
            w="full"
          >
            <AnimatePresence mode="wait">
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
                  h="full"
                  _hover={{
                    bg: '#F0605677',
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
          </HStack>
        </Flex>
      </Flex>

      <Cursor />
    </div>
  );
}
