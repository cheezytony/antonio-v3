import { IconArrowUpRight } from '@/components/icons/icon-arrow-up-right';
import { IconX } from '@/components/icons/icon-x';
import { RightGlyph } from '@/components/right-glyph';
import { SquareButton } from '@/components/square-button';
import { PROJECTS } from '@/content/projects';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { registerPageSeo } from '@/utils/seo';
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
  Wrap,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useMemo, useRef, useState } from 'react';

const MotionBox = motion.create(Box);
const MotionSpan = motion.create(Span);

export const Route = createFileRoute('/__home/my-projects')({
  component: RouteComponent,
  head: () =>
    registerPageSeo({
      title: 'My Projects',
      description: 'Browse my gallery of previous and current works.',
    }),
});

function RouteComponent() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<Array<HTMLDivElement>>([]);

  const previousIndexRef = useRef(0);
  const activeIndexRef = useRef(0);

  const directionRef = useRef<1 | -1 | 0>(0);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeItem = useMemo(() => PROJECTS.at(activeIndex), [activeIndex]);

  const counterAnimationVariants = useMemo(
    () => ({
      initial: () => {
        return {
          translateY: directionRef.current > 0 ? '100%' : '-100%',
          scale: 0.9,
        };
      },
      animate: {
        translateY: 0,
        scale: 1,
      },
      exit: () => {
        return {
          translateY: directionRef.current > 0 ? '-100%' : '100%',
          scale: 0.9,
        };
      },
    }),
    [],
  );

  const updateIndex = useCallback((index: number) => {
    previousIndexRef.current = activeIndexRef.current;

    activeIndexRef.current = index;

    directionRef.current =
      activeIndexRef.current > previousIndexRef.current ? 1 : -1;
  }, []);

  useIntersectionObserver(
    itemRef,
    useCallback((entries) => {
      entries.map((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));

          setActiveIndex(index);
          updateIndex(index);
        }
      });
    }, []),
    {
      root: trackRef.current,
      threshold: 0.6,
    },
  );

  return (
    <>
      <Box
        bgGradient="to-r"
        gradientFrom="theme.yellow"
        gradientTo="transparent"
        hideBelow="md"
        opacity={0.17}
        pos="absolute"
        top={0}
        left={0}
        h="full"
        w="max(25rem, 25%)"
      />

      <Stack
        ref={trackRef}
        flexDir="column"
        gap={0}
        // h="full"
        pos="relative"
        w="full"
        md={{
          flexDir: 'row',
          h: 'full',
          isolation: 'isolate',
          overflowY: 'auto',
          scrollbarWidth: '0',
          scrollbar: 'hidden',
          scrollBehavior: 'smooth',
          scrollSnapType: 'y mandatory',
        }}
      >
        <Center
          h="12.5rem"
          hideBelow="md"
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
                    variants={counterAnimationVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
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
                    src={
                      activeItem.screenshots[0] ??
                      'https://placehold.net/shape-600x400.png'
                    }
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
              px={5}
              py={20}
              md={{ h: 'calc(100dvh - 3.5rem)', p: 20 }}
              maxW="50.25rem"
              w="full"
              scrollSnapAlign="center"
            >
              <VStack align="stretch" gap={6}>
                <Square
                  bg="theme.yellow"
                  color="bg"
                  hideFrom="md"
                  size={12}
                  overflow="clip"
                >
                  <Span fontSize="2rem" fontWeight="extrabold">
                    {index + 1}
                  </Span>
                </Square>
                <Heading
                  fontWeight="900"
                  lineHeight={1.0625}
                  fontSize="2.5rem"
                  md={{ fontSize: '4rem' }}
                >
                  {project.title}
                </Heading>
                {project.subtitle && (
                  <Heading
                    fontWeight="900"
                    color="theme.yellow"
                    lineHeight={1.1}
                    fontSize="1.5rem"
                    md={{ fontSize: '2.5rem' }}
                  >
                    {project.subtitle}
                  </Heading>
                )}

                <Wrap gap={1}>
                  {project.tags.map((tag, tagIndex) => (
                    <Box key={tagIndex} bg="theme.yellow/8" px={3} py={2}>
                      {tag}
                    </Box>
                  ))}
                </Wrap>

                <Center hideFrom="md" pl={3} pb={3} pt={10} w="full">
                  {activeItem && (
                    <Box pos="relative" w="full">
                      <Box
                        asChild
                        aspectRatio={640 / 370}
                        border="1px solid"
                        borderColor="theme.yellow"
                        boxShadow="-12px 12px 0px #BFA336"
                        w="full"
                      >
                        <Image
                          src={
                            project.screenshots[0] ??
                            'https://placehold.net/shape-600x400.png'
                          }
                          alt={project.title}
                          layout="fullWidth"
                          srcSet=""
                        />
                      </Box>
                    </Box>
                  )}
                </Center>

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

              <HStack>
                {project.url.map((url, urlIndex) => {
                  const label =
                    typeof url === 'string' ? 'View Project' : url.label;
                  const href = typeof url === 'string' ? url : url.url;

                  return (
                    <Button
                      key={urlIndex}
                      as="a"
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
                      {...{ href, target: '_blank' }}
                    >
                      <Span>{label}</Span>
                      <IconArrowUpRight />
                    </Button>
                  );
                })}
              </HStack>
            </VStack>
          ))}
        </VStack>

        <VStack gap={0} hideBelow="md" ml="auto" pos="sticky" top={0}>
          <SquareButton accentColor="theme.yellow" href="/">
            <IconX />
          </SquareButton>
        </VStack>
      </Stack>

      <RightGlyph accentColor="theme.yellow" />
    </>
  );
}
