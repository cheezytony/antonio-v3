import { IconArrowRight } from '@/components/icons/icon-arrow-right';
import { IconHome } from '@/components/icons/icon-home';
import { IconX } from '@/components/icons/icon-x';
import { SquareButton } from '@/components/square-button';
import { ROUTES } from '@/content/routes';
import { AppContext } from '@/contexts/app.context';
import { useHistory } from '@/hooks/use-history';
import { SplashScreen } from '@/modules/splash-screen';
import { generateColorVariants } from '@/utils/colors';
import { registerPageSeo } from '@/utils/seo';
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
    createFileRoute,
    useLocation,
    useNavigate,
    useRouter,
    useRouterState,
} from '@tanstack/react-router';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { use, useEffect, useMemo, useRef, useState } from 'react';
import { colors } from '~/theme/tokens/colors';

interface TileProps extends CenterProps {
  route: AppRoute;
  shade?: string;
}

const MotionBox = motion.create(Box);
const MotionCenter = motion.create(Center);

type PageTransitionCustom = { direction: 1 | -1; animate: boolean };

function getSlideDirection(
  fromPathname: string | undefined,
  toPathname: string,
): 1 | -1 {
  const toIndex = ROUTES.findIndex((r) => r.href === toPathname);
  const fromIndex = ROUTES.findIndex((r) => r.href === fromPathname);
  return toIndex >= fromIndex ? 1 : -1;
}

const pageVariants: Variants = {
  initial: ({ direction, animate }: PageTransitionCustom) => ({
    x: animate ? `${direction * 40}%` : 0,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
      opacity: { duration: 0.4, ease: 'easeOut' },
    },
  },
  exit: ({ direction, animate }: PageTransitionCustom) => ({
    x: animate ? `${direction * -40}%` : 0,
    opacity: 0,
    transition: { duration: animate ? 0.2 : 0, ease: [0.55, 0, 1, 0.45] },
  }),
};

export const Route = createFileRoute('/__home')({
  component: RouteComponent,
  head: () =>
    registerPageSeo({
      title: '',
      description: 'Digital Alchemist, gaming specialist and son of Christ',
      pathname: '/',
    }),
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
      aria-label={`Navigate to ${route.title}`}
      aria-current={isActive && 'page'}
      bg={isOnHomepage ? shade || route.color : undefined}
      className="group"
      cursor="pointer"
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
          color={`rgb(255 255 255 / ${isOnHomepage ? 0.64 : 0.6})`}
          _light={
            isOnHomepage
              ? undefined
              : {
                  color: 'blackAlpha.600',
                }
          }
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
              color="white"
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
  const { canHideLoader } = use(AppContext);
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

  // Track the previous pathname via a ref updated after each render.
  // useHistory's `last` lags behind due to its own useEffect, causing wrong
  // direction on the first render after navigation. This pattern avoids that.
  const prevPathnameRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    prevPathnameRef.current = pathname;
  }, [pathname]);
  const prevPathname = prevPathnameRef.current;

  const shouldAnimate =
    pathname !== '/' && !!prevPathname && prevPathname !== '/';

  const direction = useMemo(
    () => getSlideDirection(prevPathname, pathname),
    [pathname],
  );

  const pageTransition = useMemo<PageTransitionCustom>(
    () => ({ direction, animate: shouldAnimate }),
    [direction, shouldAnimate],
  );

  // Get the current leaf route's component constructor from the router.
  // Unlike <Outlet />, this is a plain React component that doesn't subscribe
  // to router context updates, so it can be frozen to the page that was active
  // when the MotionBox was created.
  const router = useRouter();
  const routerAny = router as unknown as Record<
    string,
    Record<string, { options: { component?: ComponentType } }>
  >;
  const leafRouteId = useRouterState({
    select: (s) => [...s.matches].at(-1)?.routeId,
  });
  const CurrentComponent =
    (leafRouteId
      ? routerAny.routesById[leafRouteId].options.component
      : null) ?? null;

  // Sync activePage during render (state-update-during-render pattern).
  // This lets AnimatePresence see the new key in the same commit cycle,
  // without waiting for a useEffect tick.
  const [activePage, setActivePage] = useState<{
    key: string;
    Component: ComponentType;
  } | null>(null);
  const [trackedRouteId, setTrackedRouteId] = useState<string | null>(null);
  if (leafRouteId !== trackedRouteId && leafRouteId && CurrentComponent) {
    setTrackedRouteId(leafRouteId);
    setActivePage({ key: leafRouteId, Component: CurrentComponent });
  }

  const focusedRoute = useMemo(() => {
    return ROUTES[focusedIndex];
  }, [hoveredIndex, isSmallScreen, previousRoute]);

  const accentColor =
    (activeRoute && activeRoute.color) ||
    focusedRoute.color ||
    colors.theme.red.value;

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
    <Box overflowX="clip" overflowY="auto">
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
          <Center
            bg="rgb(0 0 0 / 0.85)"
            pos="absolute"
            inset={0}
            _light={{
              bg: 'rgba(255, 255, 255, 0.84)',
            }}
          >
            {!isOnHomepage && (
              <SquareButton
                accentColor={accentColor}
                aria-label="Go to homepage"
                as={Link}
                href="/"
                pos="absolute"
                hideFrom="md"
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
                aria-label="Close and go to homepage"
                as={Link}
                href="/"
                pos="absolute"
                hideFrom="md"
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
            aria-live="polite"
            aria-atomic="true"
            bg="rgb(0 0 0 / 0.92)"
            _light={{
              bg: 'rgba(255, 255, 255, 0.92)',
            }}
            flexDirection="column"
            flex={1}
            pos="relative"
            overflow="hidden"
          >
            <AnimatePresence
              custom={pageTransition}
              mode="wait"
              initial={false}
            >
              {activePage && (
                <MotionBox
                  key={activePage.key}
                  custom={pageTransition}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  position="absolute"
                  inset={0}
                  display="flex"
                  flexDirection="column"
                  overflowY="auto"
                >
                  <activePage.Component />
                </MotionBox>
              )}
            </AnimatePresence>
          </Flex>

          <Stack
            align="flex-end"
            as="nav"
            bg="rgb(0 0 0 / 0.85)"
            _light={{
              bg: 'rgba(255, 255, 255, 0.84)',
            }}
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
                  _light={{
                    bg: 'blackAlpha.100',
                    color: 'fg.muted',
                  }}
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

      {/* <Cursor /> */}
    </Box>
  );
}
