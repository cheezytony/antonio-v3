// import { ReversedBendingLine } from '@/components/line-track';
import { RightGlyph } from '@/components/right-glyph';
import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/__home/my-bio')({
  component: RouteComponent,
});

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

function RouteComponent() {
  return (
    <>
      <Stack
        flexDir="column"
        gap={0}
        md={{
          alignItems: 'flex-start',
          flexDir: 'row',
          h: 'full',
          isolation: 'isolate',
          overflowY: 'auto',
        }}
      >
        <MotionBox
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          h="25rem"
          md={{ w: 'max(35rem, 35%)', h: 'full', pos: 'sticky', top: 0 }}
        >
          <Box
            asChild
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="center"
          >
            <Image
              src="/images/bio-antonio.webp"
              alt="Antonio Okoro"
              layout="fullWidth"
            />
          </Box>
        </MotionBox>

        <MotionVStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          align="stretch"
          gap={5}
          px={5}
          py={10}
          md={{ maxW: '45.25rem', p: '5rem' }}
          w="full"
        >
          <VStack align="stretch" gap={6}>
            <Heading
              fontWeight="900"
              lineHeight={1.0625}
              fontSize="5xl"
              md={{ fontSize: '4rem' }}
            >
              My name is Antonio Okoro.
            </Heading>
            <Heading
              fontWeight="900"
              color="theme.red"
              lineHeight={1.1}
              fontSize="3xl"
              md={{ fontSize: '2.5rem' }}
            >
              I'm a Full-Stack Developer and a Pro Gamer.
            </Heading>
          </VStack>

          <VStack align="stretch" gap={3}>
            <Text fontSize="md" lineHeight={1.5} opacity={0.64}>
              You can call me a keyboard wizard weaving spells of logic,
              vanquishing bugs, and creating tools people love to use but love
              to break even more. A master of turning abstract ideas into
              digital reality. I thrive in the chaos of shifting requirements
              and ever-tight deadlines. Whether it's building from scratch or
              untangling legacy code, I'm always ready to tackle the impossible
              — armed with caffeine, creativity, and an unwavering belief that
              everything is fixable...eventually.
            </Text>
            <Text fontSize="md" lineHeight={1.5} opacity={0.64}>
              A mouse-and-keyboard warrior, ruling virtual realms with precision
              clicks and strategic hotkeys. From FPS duels to RPG adventures, I
              dominate PC gaming with custom setups, high frame rates, and mods
              that push the boundaries. A digital explorer fueled by energy
              drinks and endless ambition, I conquer epic battles, optimize
              builds, and always find a way to squeeze in just one more game.
            </Text>
          </VStack>
        </MotionVStack>
      </Stack>
      <RightGlyph accentColor="theme.red" />

      {/* <LineTrack pos="absolute" right={10} top={0} /> */}
      {/* <ReversedBendingLine /> */}
    </>
  );
}
