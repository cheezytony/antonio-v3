import { IconArrowRight } from '@/components/icons/icon-arrow-right';
import { IconHome } from '@/components/icons/icon-home';
import { IconX } from '@/components/icons/icon-x';
import { SquareButton } from '@/components/square-button';
import { ROUTES } from '@/content/routes';
import { AppContext } from '@/contexts/app.context';
import { useHistory } from '@/hooks/use-history';
import { Cursor } from '@/modules/cursor';
import { SplashScreen } from '@/modules/splash-screen';
import { generateColorVariants } from '@/utils/colors';
import type { CenterProps } from '@chakra-ui/react';
import {
  Box,
  Center,
  Flex,
  HStack,
  Span,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  Link,
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { use, useMemo, useState } from 'react';

interface TileProps extends CenterProps {
  route: AppRoute;
  shade?: string;
}

const PRIMARY_COLOR = '#F06056';

const MotionBox = motion.create(Box);
const MotionCenter = motion.create(Center);

export const Route = createFileRoute('/__home')({
  component: RouteComponent,
});

function Tile({ route, shade, ...props }: TileProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = pathname === route.href;
  const isOnHomepage = pathname === '/';

  const handleClick = () => {
    route.href && navigate({ to: route.href });
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
      bg={isOnHomepage ? shade || route.color : undefined}
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
              <IconArrowRight width={24} height={24} />
            </MotionBox>
          )}
        </AnimatePresence>
      </HStack>
    </Center>
  );
}

function RouteComponent() {
  const { canHideLoader, canShowRoute } = use(AppContext);
  const { pathname } = useLocation();
  const { last } = useHistory();

  const [isSmallScreen] = useMediaQuery(['(max-width: 767px)']);

  const isOnHomepage = pathname === '/';

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  const focusedIndex = useMemo(() => {
    if (hoveredIndex) return hoveredIndex;
    return Math.max(
      ROUTES.findIndex((route) => route.href === last?.pathname),
      0,
    );
  }, [hoveredIndex, last]);

  const activeRoute = useMemo(
    () => ROUTES.find((route) => route.href === pathname),
    [pathname],
  );

  const previousRoute = useMemo(
    () => ROUTES.find((route) => route.href === last?.pathname) ?? null,
    [last],
  );

  const focusedRoute = useMemo(() => {
    return ROUTES[focusedIndex];
  }, [hoveredIndex, isSmallScreen, previousRoute]);

  const accentColor =
    (activeRoute && activeRoute.color) || focusedRoute.color || PRIMARY_COLOR;

  const colorShades = useMemo(() => {
    const hoveredColor = focusedRoute.color;

    return ROUTES.map((_, index) => {
      if (index === focusedIndex) return hoveredColor;

      const distance = Math.abs(index - focusedIndex);

      const variants = generateColorVariants(hoveredColor, 0, 'darker');

      return variants[Math.min(distance, variants.length - 1)];
    });
  }, [focusedRoute, pathname]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(0);
  };

  return (
    <Box overflowX="clip" overflowY={canShowRoute ? 'unset' : 'clip'}>
      <SplashScreen />

      <Stack
        bg={accentColor}
        direction={{ base: 'column', md: 'row' }}
        gap={0}
        minH="100dvh"
        h={{ md: '100dvh' }}
        ml="auto"
        pos="relative"
        transitionDuration="1000ms"
        transitionTimingFunction="ease-in-smooth"
        translate={canHideLoader ? '0 0' : { base: '0 100%', md: '0 0' }}
        w={canHideLoader ? 'full' : { base: 'full', md: 0 }}
        zIndex={1}
      >
        <Box
          as="aside"
          bg={accentColor}
          flexShrink={0}
          h={{ base: '3.75rem', md: '3.5rem' }}
          w="full"
          pos="sticky"
          top={0}
          zIndex="sticky"
          md={{
            h: 'auto',
            pos: 'relative',
            top: 'unset',
            w: '4.75rem',
          }}
        >
          <Center bg="rgb(0 0 0 / 0.85)" pos="absolute" inset={0}>
            {!isOnHomepage && (
              <SquareButton
                accentColor={accentColor}
                as={Link}
                href="/"
                pos="absolute"
                hideFrom="sm"
                top={0}
                left={0}
              >
                <IconHome />
              </SquareButton>
            )}

            <Text
              fontSize={{ base: '1.75rem', md: '2.5rem' }}
              fontWeight="bold"
              lineHeight={1.1}
              letterSpacing="-0.02em"
              rotate={{ md: '-90deg' }}
            >
              antonio
              <Span color={accentColor}>/</Span>
            </Text>

            {!isOnHomepage && (
              <SquareButton
                accentColor={accentColor}
                as={Link}
                href="/"
                pos="absolute"
                hideFrom="sm"
                top={0}
                right={0}
              >
                <IconX />
              </SquareButton>
            )}
          </Center>
        </Box>

        <Flex pos="relative" isolation="isolate" pb={{ md: '3.5rem' }} flex={1}>
          <Flex
            as="main"
            bg="rgb(0 0 0 / 0.92)"
            flexDirection="column"
            flex={1}
            pos="relative"
            opacity={canShowRoute ? 1 : 0}
          >
            <Outlet />
          </Flex>

          <Stack
            align="flex-end"
            as="nav"
            bg="rgb(0 0 0 / 0.85)"
            bottom="0"
            direction={{ base: 'column', md: 'row' }}
            gap={0}
            h={isOnHomepage ? 'full' : { base: 0, md: '3.5rem' }}
            pos="absolute"
            transitionDuration="200ms"
            translate={isOnHomepage ? {} : { base: '0 100%', md: '0 0 ' }}
            w="full"
            zIndex="sticky"
            overflow={{ base: isOnHomepage ? 'unset' : 'clip', md: 'unset' }}
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
                  bg="black/88"
                  className="group"
                  color="white/40"
                  key="home-button"
                  hideBelow="md"
                  h="full"
                  _hover={{
                    bg: accentColor,
                    color: 'white',
                  }}
                  {...{ to: '/' }}
                >
                  <IconHome />
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
      </Stack>

      <Cursor />
    </Box>
  );
}
