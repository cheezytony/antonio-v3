import { IconArrowDown } from '@/components/icons/icon-arrow-down';
import { IconArrowUp } from '@/components/icons/icon-arrow-up';
import { IconX } from '@/components/icons/icon-x';
import { SquareButton } from '@/components/square-button';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { AnimatePresence, motion, useAnimationFrame } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

interface TimelineImage {
  colSpan: number;
  rowSpan: number;
  src: string;
  alt: string;
}

interface Item {
  title: string;
  date: string;
  description: Array<string>;
  images: Array<TimelineImage>;
}

const MotionGridItem = motion.create(GridItem);

export const Route = createFileRoute('/__home/timeline')({
  component: RouteComponent,
});

const TIMELINE: Array<Item> = [
  {
    title: 'My Setup for Gaming & Work.',
    date: 'July 18, 2024',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Fugiat nulla pariatur!',
    ],
    images: [
      {
        colSpan: 2,
        rowSpan: 2,
        src: '/images/timeline-1.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-2.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-3.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-4.png',
        alt: '',
      },
    ],
  },
  {
    title: 'My Setup for Gaming & Work.',
    date: 'July 18, 2024',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Fugiat nulla pariatur!',
    ],
    images: [
      {
        colSpan: 2,
        rowSpan: 2,
        src: '/images/timeline-1.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-2.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-3.png',
        alt: '',
      },
    ],
  },
  {
    title: 'My Setup for Gaming & Work.',
    date: 'July 18, 2024',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Fugiat nulla pariatur!',
    ],
    images: [
      {
        colSpan: 2,
        rowSpan: 2,
        src: '/images/timeline-1.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-2.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-3.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-4.png',
        alt: '',
      },
    ],
  },
  {
    title: 'My Setup for Gaming & Work.',
    date: 'July 18, 2024',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Fugiat nulla pariatur!',
    ],
    images: [
      {
        colSpan: 2,
        rowSpan: 2,
        src: '/images/timeline-1.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-2.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-3.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-4.png',
        alt: '',
      },
    ],
  },
  {
    title: 'My Setup for Gaming & Work.',
    date: 'July 18, 2024',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Fugiat nulla pariatur!',
    ],
    images: [
      {
        colSpan: 2,
        rowSpan: 2,
        src: '/images/timeline-1.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-2.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-3.png',
        alt: '',
      },
    ],
  },
  {
    title: 'My Setup for Gaming & Work.',
    date: 'July 18, 2024',
    description: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Fugiat nulla pariatur!',
    ],
    images: [
      {
        colSpan: 2,
        rowSpan: 2,
        src: '/images/timeline-1.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-2.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 2,
        src: '/images/timeline-3.png',
        alt: '',
      },
      {
        colSpan: 1,
        rowSpan: 1,
        src: '/images/timeline-4.png',
        alt: '',
      },
    ],
  },
];

function RouteComponent() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<Array<HTMLDivElement>>([]);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const progressThumbRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = useMemo(() => TIMELINE[activeIndex], [activeIndex]);

  const scrollTo = ({
    direction,
    index,
  }: {
    direction?: -1 | 1;
    index?: number;
  }) => {
    const trackElement = trackRef.current;
    if (!trackElement) return;

    const nextIndex = Math.max(
      Math.min(
        direction ? activeIndex + direction : index || 0,
        TIMELINE.length - 1,
      ),
      0,
    );

    const item = itemRef.current.at(nextIndex);
    if (!item) return;

    item.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useAnimationFrame(() => {
    const trackElement = trackRef.current;
    const progressTrackElement = progressTrackRef.current;
    const progressThumbElement = progressThumbRef.current;

    if (!trackElement || !progressTrackElement || !progressThumbElement) {
      return;
    }

    const trackHeight = trackElement.scrollHeight;
    const timelineScrollProgress = (trackElement.scrollTop / trackHeight) * 100;

    const progressThumbY =
      (timelineScrollProgress / 100) * progressTrackElement.clientHeight;

    progressThumbElement.style.height = `${(1 / TIMELINE.length) * 100}%`;
    progressThumbElement.style.translate = `-50% ${progressThumbY}px`;
  });

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
    <Stack
      ref={trackRef}
      flexDir="column"
      gap={0}
      pos="relative"
      w="full"
      md={{
        flexDir: 'row',
        h: 'full',
        overflowY: 'auto',
        scrollbar: 'hidden',
        scrollbarWidth: '0',
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory',
      }}
    >
      <Grid
        bg="black"
        h="35dvh"
        hideBelow="md"
        overflow="clip"
        pos="sticky"
        top={0}
        templateColumns="repeat(2, minmax(0, 1fr))"
        templateRows="repeat(4, minmax(0, 1fr))"
        w="full"
        zIndex="sticky"
        md={{
          h: 'auto',
          w: 'max(40rem, 35%)',
        }}
      >
        <AnimatePresence mode="popLayout">
          {activeItem.images.map((image, imageIndex) => (
            <MotionGridItem
              initial={{ opacity: 0, scale: 0.9, zIndex: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                zIndex: 1,
                transition: { delay: 0.1 * imageIndex, duration: 0.2 },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                zIndex: 0,
                transition: { delay: 0.1 * imageIndex, duration: 0.2 },
              }}
              key={`${activeIndex}-${imageIndex}`}
              colSpan={image.colSpan}
              rowSpan={image.rowSpan}
            >
              <Box
                asChild
                h="full"
                w="full"
                objectFit="cover"
                objectPosition="center"
              >
                <Image src={image.src} alt="Antonio Okoro" layout="fullWidth" />
              </Box>
            </MotionGridItem>
          ))}
        </AnimatePresence>
      </Grid>

      <VStack gap={0}>
        {TIMELINE.map((activity, index) => (
          <VStack
            key={index}
            ref={
              ((el: HTMLDivElement) => (itemRef.current[index] = el!)) as any
            }
            align="stretch"
            justify="center"
            data-index={index}
            gap={5}
            flexShrink={0}
            px={5}
            py={10}
            md={{ h: 'calc(100dvh - 3.5rem)', p: '5rem' }}
            maxW="50.25rem"
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
                {activity.title}
              </Heading>
              <Heading
                fontWeight="900"
                color="theme.blue"
                lineHeight={1.1}
                fontSize="3xl"
                md={{ fontSize: '2.5rem' }}
              >
                {activity.date}
              </Heading>
            </VStack>

            <Grid
              bg="black"
              h="35dvh"
              overflow="clip"
              hideFrom="md"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              gridTemplateRows="repeat(4, minmax(0, 1fr))"
              w="full"
            >
              {activity.images.map((image, imageIndex) => (
                <GridItem
                  key={`${activeIndex}-${imageIndex}`}
                  colSpan={image.colSpan}
                  rowSpan={image.rowSpan}
                >
                  <Box
                    asChild
                    h="full"
                    w="full"
                    objectFit="cover"
                    objectPosition="center"
                  >
                    <Image
                      src={image.src}
                      alt="Antonio Okoro"
                      layout="fullWidth"
                    />
                  </Box>
                </GridItem>
              ))}
            </Grid>

            <VStack align="stretch" gap={3}>
              {activity.description.map((paragraph, paragraphIndex) => (
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
        ))}
      </VStack>

      <VStack
        gap={0}
        justify="center"
        hideBelow="md"
        ml="auto"
        pos="sticky"
        top={0}
      >
        <SquareButton as={Link} accentColor="theme.blue" href="/">
          <IconX />
        </SquareButton>

        <VStack
          ref={progressTrackRef}
          gap={0}
          pos="relative"
          h="full"
          maxH="max(23.5rem, 43%)"
          my="auto"
        >
          {TIMELINE.map((_, index) => (
            <Box
              key={index}
              as="button"
              bg="white/8"
              w="0.125rem"
              flex={1}
              _hover={{
                bg: 'theme.blue/50',
                w: '0.25rem',
              }}
              onClick={() => scrollTo({ index })}
            />
          ))}

          <Box
            ref={progressThumbRef}
            bg="theme.blue"
            w="0.375rem"
            pos="absolute"
            top={0}
            left="50%"
            translate="-50% 0"
            boxShadow="0px 0px 8px rgba(44, 149, 201, 0.8)"
          />
        </VStack>

        <VStack gap={0}>
          <SquareButton
            accentColor="theme.blue"
            disabled={activeIndex === 0}
            onClick={() => scrollTo({ direction: -1 })}
          >
            <IconArrowUp />
          </SquareButton>

          <SquareButton
            accentColor="theme.blue"
            disabled={activeIndex >= TIMELINE.length - 1}
            onClick={() => scrollTo({ direction: 1 })}
          >
            <IconArrowDown />
          </SquareButton>
        </VStack>
      </VStack>
    </Stack>
  );
}
