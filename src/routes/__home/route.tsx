import { IconArrowRight } from '@/components/icons/icon-arrow-right';
import { IconHome } from '@/components/icons/icon-home';
import { IconX } from '@/components/icons/icon-x';
import { SquareButton } from '@/components/square-button';
import { AppContext } from '@/contexts/app-context';
import { Cursor } from '@/modules/cursor';
import { SplashScreen } from '@/modules/splash-screen';
import { generateColorVariants } from '@/utils/colors';
import type { CenterProps } from '@chakra-ui/react';
import { Box, Center, Flex, HStack, Span, Stack, Text } from '@chakra-ui/react';
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
        pos="relative"
        transitionDuration="1000ms"
        transitionTimingFunction="ease-in-smooth"
        translate={canHideLoader ? '0 0' : { base: '100% 0', md: '0 0 ' }}
        w={canHideLoader ? 'full' : { base: 'full', md: 0 }}
        zIndex={1}
      >
        <Center
          bg="rgb(0 0 0 / 0.85)"
          as="aside"
          flexShrink={0}
          h="3.5rem"
          w="full"
          md={{
            h: 'auto',
            pos: 'relative',
            w: '4.75rem',
          }}
        >
          <Text
            fontSize="2.5rem"
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

        <Flex pos="relative" pb={{ md: '3.5rem' }} flex={1}>
          <Flex
            as="main"
            bg="rgb(0 0 0 / 84)"
            key={pathname}
            flexDirection="column"
            flex={1}
            pos="relative"
          >
            <AnimatePresence>{canShowRoute && <Outlet />}</AnimatePresence>
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
