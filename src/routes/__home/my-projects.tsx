import { IconArrowUpRight } from '@/components/icons/icon-arrow-up-right';
import { IconX } from '@/components/icons/icon-x';
import { RightGlyph } from '@/components/right-glyph';
import { SquareButton } from '@/components/square-button';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Span,
  Square,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

interface Project {
  badges?: Array<string>;
  client?: {
    name: string;
  };
  description: Array<string>;
  screenshots: Array<string>;
  tags: Array<string>;
  title: string;
  url: string;
}

const MotionBox = motion.create(Box);
const MotionSpan = motion.create(Span);

export const Route = createFileRoute('/__home/my-projects')({
  component: RouteComponent,
});

const PROJECTS: Array<Project> = [
  {
    title: 'DanielKoya Website Development',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    screenshots: [
      // 'https://res.cloudinary.com/cheezytony/image/upload/v1664373338/portfolio/cp8daknv6i8jytokcnwa.webp',
      '/images/projects-daniel-koya.png',
    ],
    url: 'https://danielkoya.com/',
    client: {
      name: 'Daniel Koya',
    },
    tags: [],
  },
  {
    title: 'CredPal Product Development',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664373516/portfolio/z7gdqijpheiqdztgbpsh.webp',
    ],
    url: 'https://credpal.com',
    client: {
      name: 'CredPal (Crednet Technologies)',
    },
    tags: ['Web Design', 'Backend', 'Vue.js', 'React Native'],
  },
  {
    title: 'Bootstrap/Vue Datatable NPM Package',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    badges: [
      'https://img.shields.io/npm/dy/bootstrap-vue-datatable?style=for-the-badge',
      'https://img.shields.io/bundlephobia/minzip/bootstrap-vue-datatable?style=for-the-badge',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664377056/Portfolio/rnirbnxwip2qrsaqhvet.webp',
    ],
    url: 'https://www.npmjs.com/bootstrap-vue-datatable',
    tags: [],
  },
  {
    title: 'Mighty NG Product Development',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664373637/portfolio/nxkh7aocsevjy5i4oab5.webp',
    ],
    url: 'https://mighty.ng',
    client: {
      name: 'Mighty Interactive',
    },
    tags: ['Web Design', 'Backend', 'Vue.js', 'React Native'],
  },
  {
    title: 'Mighty Interactive Website Development',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664373704/portfolio/frrc57zscjb5v3w1wnp3.webp',
    ],
    url: 'https://mightyi.com',
    client: {
      name: 'Mighty Interactive',
    },
    tags: ['Web Design', 'Backend', 'Vue.js', 'React Native'],
  },
  {
    title: 'Adlantique Website Design',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664373591/portfolio/cs6nim7v40zlrit6xnez.webp',
    ],
    url: 'https://adlantique.com/',
    client: {
      name: 'Adlantique',
    },
    tags: [],
  },
  {
    title: 'Trifta Website design',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664373448/portfolio/xqokgivxv1pezkjpf6sp.webp',
    ],
    url: 'https://trifta.com/',
    client: {
      name: 'Trifta',
    },
    tags: [],
  },
  {
    title: 'Fluxhub Legal Website Development',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664373405/portfolio/apchxjov4pmxrho3m1x0.webp',
    ],
    url: 'https://fluxhublegal.com/',
    client: {
      name: 'Fluxhub Legal',
    },
    tags: [],
  },
  {
    title: 'Vue3 Form NPM Package',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    badges: [
      'https://img.shields.io/npm/dy/vue3-form?style=for-the-badge',
      'https://img.shields.io/bundlephobia/min/vue3-form?style=for-the-badge',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664377018/Portfolio/vn9t1fnfk1hjsfpitksn.webp',
    ],
    tags: [],
    url: 'https://npmjs.com/vue3-form',
  },
  {
    title: 'Storagedotjs NPM Package',
    description: [
      'Ipsam soluta officiis corrupti aspernatur deserunt asperiores repellendus temporibus dicta quasi est odit quaerat perferendis, maiores corporis qui ducimus repellat unde perspiciatis.',
    ],
    badges: [
      'https://img.shields.io/npm/dy/storagedotjs?style=for-the-badge',
      'https://img.shields.io/bundlephobia/min/storagedotjs?style=for-the-badge',
    ],
    screenshots: [
      'https://res.cloudinary.com/cheezytony/image/upload/v1664377148/Portfolio/tgusatsdh7sabshs1edq1.webp',
    ],
    tags: [],
    url: 'https://npmjs.com/storagedotjs',
  },
];

function RouteComponent() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<Array<HTMLDivElement>>([]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = useMemo(() => PROJECTS.at(activeIndex), [activeIndex]);

  useIntersectionObserver(
    itemRef,
    (entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    },
    {
      root: trackRef.current,
      threshold: 0.6,
    },
  );

  return (
    <>
      <Stack
        flexDir="column"
        gap={0}
        h="full"
        md={{ flexDir: 'row', h: 'full' }}
        w="full"
        ref={trackRef}
        overflowY="auto"
        scrollbarWidth="0"
        scrollbar="hidden"
        scrollBehavior="smooth"
        scrollSnapType="y mandatory"
        pos="relative"
      >
        <Center
          h="12.5rem"
          pl={5}
          py={10}
          w="full"
          md={{
            w: 'max(45rem, 44%)',
            h: 'auto',
            pl: '5rem',
            pos: 'sticky',
            top: 0,
          }}
        >
          {activeItem && (
            <Box pos="relative" w="full">
              <Square
                bg="theme.yellow"
                bottom="100%"
                color="bg"
                left="100%"
                pos="absolute"
                size={12}
                overflow="clip"
              >
                <AnimatePresence mode="popLayout">
                  <MotionSpan
                    initial={{ translateY: '-100%', scale: 0.9 }}
                    animate={{ translateY: 0, scale: 1 }}
                    exit={{ translateY: '100%', scale: 0.9 }}
                    key={activeIndex}
                    fontSize="2rem"
                    fontWeight="extrabold"
                  >
                    {activeIndex + 1}
                  </MotionSpan>
                </AnimatePresence>
              </Square>
              <AnimatePresence mode="wait">
                <MotionBox
                  initial={{ opacity: 0, scale: 0.9, zIndex: 0 }}
                  animate={{ opacity: 1, scale: 1, zIndex: 1 }}
                  asChild
                  key={activeIndex}
                  aspectRatio={640 / 370}
                  border="1px solid"
                  borderColor="theme.yellow"
                  boxShadow="-12px 12px 0px #BFA336"
                  w="full"
                >
                  <Image
                    src={activeItem.screenshots[0]}
                    alt={activeItem.title}
                    layout="fullWidth"
                  />
                </MotionBox>
              </AnimatePresence>
            </Box>
          )}
        </Center>

        <VStack gap={0}>
          {PROJECTS.map((project, index) => (
            <VStack
              key={index}
              ref={
                ((el: HTMLDivElement) => (itemRef.current[index] = el!)) as any
              }
              align="stretch"
              justify="center"
              data-index={index}
              gap={10}
              flexShrink={0}
              h="100dvh"
              px={5}
              py={10}
              md={{ h: 'calc(100dvh - 3.5rem)', p: '5rem' }}
              maxW="40.25rem"
              w="full"
              scrollSnapAlign="center"
            >
              <VStack align="stretch" gap={6}>
                <Heading
                  fontWeight="900"
                  lineHeight={1.0625}
                  fontSize="5xl"
                  md={{ fontSize: '4rem' }}
                >
                  {project.title}
                </Heading>

                <HStack gap={1}>
                  {project.tags.map((tag, tagIndex) => (
                    <Box key={tagIndex} bg="theme.yellow/16" px={3} py={2}>
                      {tag}
                    </Box>
                  ))}
                </HStack>

                <VStack align="stretch" gap={3}>
                  {project.description.map((paragraph, paragraphIndex) => (
                    <Text
                      key={paragraphIndex}
                      fontSize="md"
                      lineHeight={1.5}
                      opacity={0.64}
                    >
                      {paragraph}
                    </Text>
                  ))}
                </VStack>
              </VStack>

              <Button
                alignSelf="flex-start"
                fontSize="sm"
                gap={2}
                py={3}
                px={6}
                type="submit"
                variant="outline"
                _hover={{
                  bg: 'theme.yellow',
                }}
              >
                <Span>View Project</Span>
                <IconArrowUpRight />
              </Button>
            </VStack>
          ))}
        </VStack>

        <VStack gap={0} ml="auto" pos="sticky" top={0}>
          <SquareButton accentColor="theme.yellow" href="/">
            <IconX />
          </SquareButton>
        </VStack>
      </Stack>
      <RightGlyph accentColor="theme.yellow" />
    </>
  );
}
