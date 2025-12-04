import { useParallax } from '@/hooks/use-parallax';
import { Header } from '@/modules/header';
import type { FlexProps } from '@chakra-ui/react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const Route = createFileRoute('/_home/bio')({
  component: RouteComponent,
});

const CONTAINER_WIDTH = 1650;

function Programmer({
  onSlide,
  ...props
}: FlexProps & { onSlide: VoidFunction }) {
  const parallax = useParallax(1);

  return (
    <Flex
      direction="column"
      w="full"
      lg={{
        width: '1/2',
      }}
      lgDown={{
        pos: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      {...props}
    >
      <Box
        backgroundColor="#18184E"
        color="white"
        hideFrom="lg"
        h="290px"
        pos="relative"
        isolation="isolate"
      >
        <Box w="full" h="full" pos="absolute" inset={0} zIndex={-1}>
          <Image
            src="/images/bio-programmer.png"
            alt="Programmer"
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>
        <Box
          backgroundColor="#4D4DFF"
          opacity={0.2}
          w="full"
          h="full"
          pos="absolute"
          inset={0}
          zIndex={0}
        />
        <Center pos="relative" w="full" h="full">
          <Heading
            as="h2"
            fontSize="5xl"
            letterSpacing="0.1em"
            lineHeight={1}
            textAlign="center"
          >
            I'm a<br />
            Programmer
          </Heading>
        </Center>
      </Box>

      <Flex
        backgroundColor="#4D4DFF"
        color="white"
        flex={1}
        justify="space-between"
        px={4}
        py={10}
        md={{
          pt: 260,
          px: 8,
          justifyContent: 'flex-start',
        }}
      >
        <Flex
          // align="flex-start"
          direction="column"
          gap={16}
          w={`min(${CONTAINER_WIDTH / 2}px, 100%)`}
          ml="auto"
        >
          <Box pos="relative">
            <Heading
              as="h2"
              pos="absolute"
              hideBelow="md"
              top={0}
              left="50%"
              letterSpacing="0.1em"
              textTransform="uppercase"
              fontSize={{ md: '8xl', '2xl': '8rem' }}
              opacity={0.5}
              zIndex={0}
              transform="auto"
              translateX={`calc(-50% - ${parallax.x / 100}px)`}
              translateY={`calc(-50% - ${parallax.y / 100}px)`}
            >
              Programmer
            </Heading>
            <Text
              fontSize={{ base: 'xl', md: '3xl', '2xl': '4xl' }}
              textShadow="8px 8px 0 rgb(0 0 0 / 0.25)"
              pos="relative"
              transitionDuration="fastest"
              transform="auto"
              translateX={`${parallax.x / 50}px`}
              translateY={`${parallax.y / 50}px`}
              zIndex={1}
            >
              Keyboard wizard weaving spells of logic, vanquishing bugs, and
              creating tools people love to use but love to break even more. A
              master of turning abstract ideas into digital reality, I thrive in
              the chaos of shifting requirements and ever-tight deadlines.
              Whether it&apos;s building from scratch or untangling legacy code,
              I'm always ready to tackle the impossible—armed with caffeine,
              creativity, and an unwavering belief that everything is fixable...
              eventually.
            </Text>
          </Box>

          <Box
            pos="relative"
            display="flex"
            justifyContent="space-between"
            gap={8}
            mt={{ base: 'auto', md: 0 }}
            transform="auto"
            translateX={`${parallax.x / 75}px`}
            translateY={`${parallax.y / 75}px`}
            w="full"
          >
            <Button
              colorPalette="white"
              size={{ base: 'md', md: 'lg' }}
              flexGrow={{ base: 1, md: 0 }}
              color="blue"
              boxShadow="4px 4px 0 rgb(0 0 0 / 0.25)"
            >
              Projects
            </Button>

            <Button
              colorPalette="white"
              size={{ base: 'md', md: 'lg' }}
              color="blue"
              boxShadow="4px 4px 0 rgb(0 0 0 / 0.25)"
              hideFrom="lg"
              transform="auto"
              translateX={{ base: '4', md: '8' }}
              onClick={onSlide}
            >
              {'>>>'}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

function Gamer({ onSlide, ...props }: FlexProps & { onSlide: VoidFunction }) {
  const parallax = useParallax(1);

  return (
    <Flex
      direction="column"
      w="full"
      lg={{
        width: '1/2',
      }}
      lgDown={{
        pos: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      {...props}
    >
      <Box
        backgroundColor="#3D1212"
        color="white"
        hideFrom="lg"
        h="290px"
        pos="relative"
        isolation="isolate"
      >
        <Box w="full" h="full" pos="absolute" inset={0} zIndex={-1}>
          <Image
            src="/images/bio-gamer.png"
            alt="Gamer"
            w="full"
            h="full"
            objectFit="cover"
          />
        </Box>
        <Box
          backgroundColor="#FF4D4D"
          opacity={0.2}
          w="full"
          h="full"
          pos="absolute"
          inset={0}
          zIndex={0}
        />
        <Center pos="relative" w="full" h="full">
          <Heading
            as="h2"
            fontSize="5xl"
            letterSpacing="0.1em"
            lineHeight={1}
            textAlign="center"
          >
            I'm a<br />
            Gamer
          </Heading>
        </Center>
      </Box>

      <Flex
        backgroundColor="#FF4D4D"
        color="white"
        flex={1}
        justify="space-between"
        px={4}
        py={10}
        md={{
          pt: 260,
          px: 8,
          justifyContent: 'flex-start',
        }}
      >
        <Flex
          align="flex-end"
          direction="column"
          gap={16}
          w={`min(${CONTAINER_WIDTH / 2}px, 100%)`}
          mr="auto"
        >
          <Box pos="relative">
            <Heading
              as="h2"
              pos="absolute"
              hideBelow="md"
              top={0}
              left="50%"
              letterSpacing="0.1em"
              textTransform="uppercase"
              fontSize={{ md: '8xl', '2xl': '8rem' }}
              opacity={0.5}
              zIndex={0}
              transform="auto"
              translateX={`calc(-50% - ${parallax.x / 100}px)`}
              translateY={`calc(-50% - ${parallax.y / 100}px)`}
            >
              Gamer
            </Heading>
            <Text
              fontSize={{ base: 'xl', md: '3xl', '2xl': '4xl' }}
              textShadow="8px 8px 0 rgb(0 0 0 / 0.25)"
              pos="relative"
              textAlign="right"
              transitionDuration="fastest"
              transform="auto"
              translateX={`${parallax.x / 50}px`}
              translateY={`${parallax.y / 50}px`}
              zIndex={1}
            >
              Mouse-and-keyboard warrior, ruling virtual realms with precision
              clicks and strategic hotkeys. From FPS duels to RPG adventures,
              they dominate PC gaming with custom setups, high frame rates, and
              mods that push the boundaries. A digital explorer fueled by energy
              drinks and endless ambition, they conquer epic battles, optimize
              builds, and always find a way to squeeze in just one more game.
            </Text>
          </Box>

          <Box
            pos="relative"
            display="flex"
            justifyContent="space-between"
            mt={{ base: 'auto', md: 0 }}
            transform="auto"
            translateX={`${parallax.x / 75}px`}
            translateY={`${parallax.y / 75}px`}
            w="full"
          >
            <Button
              colorPalette="white"
              size={{ base: 'md', md: 'lg' }}
              color="red"
              boxShadow="4px 4px 0 rgb(0 0 0 / 0.25)"
              hideFrom="lg"
              transform="auto"
              translateX={{ base: '-4', md: '-8' }}
              onClick={onSlide}
            >
              {'<<<'}
            </Button>
            <Button
              boxShadow="4px 4px 0 rgb(0 0 0 / 0.25)"
              colorPalette="white"
              color="red"
              flexGrow={{ base: 1, md: 0 }}
              ml="auto"
              size={{ base: 'md', md: 'lg' }}
            >
              Games
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

interface ImageTriangleProps {
  hovered: 'programmer' | 'gamer';
}

const MotionImage = motion.create(Image);

function ImageTriangle({ hovered }: ImageTriangleProps) {
  return (
    <Box
      pos="absolute"
      bottom={0}
      left="50%"
      transform="translateX(-50%)"
      w="min(50%, 864px)"
      aspectRatio={864 / 558}
      clipPath="polygon(50% 0%, 0% 100%, 100% 100%)"
      bgGradient="to-r"
      gradientFrom="#FF4D4D"
      gradientTo="#4D4DFF"
      hideBelow="lg"
    >
      <AnimatePresence mode="wait">
        {hovered === 'programmer' && (
          <MotionImage
            key="programmer"
            transition={{
              duration: 0.35,
            }}
            initial={{ scale: 1.1, translateX: 20, filter: 'blur(10px)' }}
            animate={{ scale: 1, translateX: 0, filter: 'blur(0px)' }}
            exit={{ scale: 1.1, translateX: 20, filter: 'blur(10px)' }}
            src="/images/bio-programmer.png"
            pos="absolute"
            opacity={0.85}
          />
        )}
        {hovered === 'gamer' && (
          <MotionImage
            key="gamer"
            transition={{
              duration: 0.35,
            }}
            initial={{ scale: 1.1, translateX: -20, filter: 'blur(10px)' }}
            animate={{ scale: 1, translateX: 0, filter: 'blur(0px)' }}
            exit={{ scale: 1.1, translateX: -20, filter: 'blur(10px)' }}
            src="/images/bio-gamer.png"
            pos="absolute"
            opacity={0.85}
          />
        )}
      </AnimatePresence>
      <Box
        as="svg"
        fill="none"
        w="full"
        {...{
          viewBox: '0 0 864 558',
          xmlns: 'http://www.w3.org/2000/svg',
        }}
      >
        <g filter="url(#filter0_i_85_672)">
          <path d="M432 0L864 558H0L432 0Z" fill="url(#paint0_linear_85_672)" />
        </g>
        <g filter="url(#filter1_i_85_672)">
          <path d="M432 0L864 558H0L432 0Z" fill="black" fillOpacity="0.2" />
        </g>
        <defs>
          <filter
            id="filter0_i_85_672"
            x="0"
            y="0"
            width="864"
            height="562"
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
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_85_672"
            />
          </filter>
          <filter
            id="filter1_i_85_672"
            x="0"
            y="0"
            width="864"
            height="562"
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
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="8" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_85_672"
            />
          </filter>
          {/* <linearGradient
            id="paint0_linear_85_672"
            x1="0"
            y1="279"
            x2="864"
            y2="279"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4D4DFF" />
            <stop offset="1" stopColor="#FF4D4D" />
          </linearGradient> */}
        </defs>
      </Box>
    </Box>
  );
}

function RouteComponent() {
  const [mode, setMode] = useState<'programmer' | 'gamer'>('programmer');
  const [hoveredMode, setHoveredMode] = useState<'programmer' | 'gamer'>(
    'programmer',
  );

  return (
    <div>
      <Header
        pageTitle={
          <>
            Antonio <br /> is
          </>
        }
        isSticky
      />
      <Flex pos="relative" h="max(100dvh, 900px)" overflowX="clip">
        <Programmer
          smDown={{
            transitionDuration: 'moderate',
            transitionTimingFunction: 'ease-in-out',
            transform: 'auto',
            translateX: mode === 'programmer' ? '0' : '-100%',
          }}
          onSlide={() => setMode('gamer')}
          onMouseMove={() => setHoveredMode('programmer')}
        />

        <Gamer
          smDown={{
            transitionDuration: 'moderate',
            transitionTimingFunction: 'ease-in-out',
            transform: 'auto',
            translateX: mode === 'gamer' ? '0' : '100%',
          }}
          onSlide={() => setMode('programmer')}
          onMouseMove={() => setHoveredMode('gamer')}
        />
        <ImageTriangle hovered={hoveredMode} />
      </Flex>
    </div>
  );
}
