import { IconArrowRight } from '@/components/icons/icon-arrow-right';
import { RightGlyph } from '@/components/right-glyph';
import { Field } from '@/components/ui/field';
import { submitContactForm } from '@/server/contact';
import { registerPageSeo } from '@/utils/seo';
import {
    Box,
    Button,
    Heading,
    Input,
    Span,
    Stack,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Route = createFileRoute('/__home/contact-me')({
  component: RouteComponent,
  head: () =>
    registerPageSeo({
      title: 'Contact Me',
      description:
        'Drop me a personal message, request a partnership, a compliment or a roast.',
      pathname: '/contact-me',
    }),
});

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

function RouteComponent() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    purpose: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField =
    (field: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      await submitContactForm({ data: values });
      setStatus('success');
      setValues({ name: '', email: '', purpose: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <>
      <Box
        h="full"
        hideFrom="md"
        left={0}
        opacity={0.7}
        pos="absolute"
        w="full"
        zIndex={-1}
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
      </Box>
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
          h="full"
          hideBelow="md"
          left={0}
          md={{ w: 'max(40rem, 40%)', h: 'full', pos: 'sticky', top: 0 }}
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
              fontSize="2.5rem"
              md={{ fontSize: '4rem' }}
            >
              Drop me a line.
            </Heading>
            <Heading
              fontWeight="900"
              color="theme.violet"
              lineHeight={1.1}
              fontSize="1.5rem"
              md={{ fontSize: '2.5rem' }}
            >
              I'll respond in no time.
            </Heading>
          </VStack>

          <VStack asChild align="stretch" gap={20} flex={1}>
            <form onSubmit={handleSubmit}>
              <VStack align="stretch" gap={4}>
                <Field>
                  <Input
                    h="3.5rem"
                    name="name"
                    onChange={updateField('name')}
                    placeholder="Your name"
                    py={4}
                    required
                    size="xl"
                    value={values.name}
                    variant="flushed"
                    css={{
                      '--focus-color': 'var(--chakra-colors-theme-violet)',
                    }}
                  />
                </Field>
                <Field>
                  <Input
                    h="3.5rem"
                    name="email"
                    onChange={updateField('email')}
                    placeholder="Email address"
                    py={4}
                    required
                    size="xl"
                    type="email"
                    value={values.email}
                    variant="flushed"
                    css={{
                      '--focus-color': 'var(--chakra-colors-theme-violet)',
                    }}
                  />
                </Field>
                <Field>
                  <Input
                    h="3.5rem"
                    name="purpose"
                    onChange={updateField('purpose')}
                    placeholder="Purpose"
                    py={4}
                    required
                    size="xl"
                    value={values.purpose}
                    variant="flushed"
                    css={{
                      '--focus-color': 'var(--chakra-colors-theme-violet)',
                    }}
                  />
                </Field>
                <Field>
                  <Textarea
                    name="message"
                    onChange={updateField('message')}
                    placeholder="Your message"
                    h="8.75rem"
                    py={4}
                    required
                    resize="none"
                    size="xl"
                    value={values.message}
                    variant="flushed"
                    css={{
                      '--focus-color': 'var(--chakra-colors-theme-violet)',
                    }}
                  />
                </Field>
              </VStack>

              {status === 'success' && (
                <Text color="theme.violet" fontSize="sm">
                  Thanks for reaching out — I'll get back to you soon.
                </Text>
              )}
              {status === 'error' && (
                <Text color="red.500" fontSize="sm">
                  {errorMessage}
                </Text>
              )}

              <Button
                alignSelf="flex-start"
                disabled={status === 'submitting'}
                fontSize="sm"
                gap={2}
                loading={status === 'submitting'}
                mt="auto"
                py={3}
                px={6}
                type="submit"
                variant="outline"
                _hover={{
                  bg: 'theme.violet',
                  color: 'white',
                }}
              >
                <Span>Send Message</Span>
                <IconArrowRight />
              </Button>
            </form>
          </VStack>
        </MotionVStack>

        <RightGlyph accentColor="theme.violet" />
      </Stack>
    </>
  );
}
