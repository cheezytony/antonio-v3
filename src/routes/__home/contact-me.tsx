import { Field } from '@/components/ui/field';
import {
  Box,
  Button,
  Heading,
  Input,
  Span,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/__home/contact-me')({
  component: RouteComponent,
});

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

function RouteComponent() {
  return (
    <Stack flexDir="column" gap={0} md={{ flexDir: 'row', h: 'full' }}>
      <MotionBox
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        h="12.5rem"
        md={{ w: 'max(40rem, 35%)', h: 'auto' }}
      >
        <Box
          asChild
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
        >
          <Image
            src="/images/contact-me-daft-punk.webp"
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
            Drop me a line.
          </Heading>
          <Heading
            fontWeight="900"
            color="theme.violet"
            lineHeight={1.1}
            fontSize="3xl"
            md={{ fontSize: '2.5rem' }}
          >
            I'll respond in no time.
          </Heading>
        </VStack>

        <VStack asChild align="stretch" gap={20} flex={1}>
          <form onSubmit={(e) => e.preventDefault()}>
            <VStack align="stretch" gap={4}>
              <Field>
                <Input
                  h="3.5rem"
                  placeholder="Your name"
                  py={4}
                  size="xl"
                  variant="flushed"
                  css={{
                    '--focus-color': 'var(--chakra-colors-theme-violet)',
                  }}
                />
              </Field>
              <Field>
                <Input
                  h="3.5rem"
                  placeholder="Email address"
                  py={4}
                  size="xl"
                  variant="flushed"
                  css={{
                    '--focus-color': 'var(--chakra-colors-theme-violet)',
                  }}
                />
              </Field>
              <Field>
                <Input
                  h="3.5rem"
                  placeholder="Purpose"
                  py={4}
                  size="xl"
                  variant="flushed"
                  css={{
                    '--focus-color': 'var(--chakra-colors-theme-violet)',
                  }}
                />
              </Field>
              <Field>
                <Textarea
                  placeholder="Your message"
                  h="8.75rem"
                  py={4}
                  resize="none"
                  size="xl"
                  variant="flushed"
                  css={{
                    '--focus-color': 'var(--chakra-colors-theme-violet)',
                  }}
                />
              </Field>
            </VStack>

            <Button
              alignSelf="flex-start"
              fontSize="sm"
              gap={2}
              mt="auto"
              py={3}
              px={6}
              type="submit"
              variant="outline"
              _hover={{
                bg: 'theme.violet',
              }}
            >
              <Span>Send Message</Span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.335 8L3.33496 8M8.66829 4C8.66829 4 12.6682 6.94593 12.6683 8C12.6683 9.05413 8.6683 12 8.6683 12"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </form>
        </VStack>
      </MotionVStack>
    </Stack>
  );
}
