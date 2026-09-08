import { RightGlyph } from '@/components/right-glyph';
import { WRITING } from '@/content/writing';
import { registerPageSeo } from '@/utils/seo';
import { Heading, Stack, Text, VStack, Wrap } from '@chakra-ui/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/__home/writing')({
  component: RouteComponent,
  head: () =>
    registerPageSeo({
      title: 'Writing',
      description:
        'Notes on ledgers, payments and the systems that have to stay correct when the outside world goes quiet.',
      pathname: '/writing',
    }),
});

const MotionVStack = motion.create(VStack);

function RouteComponent() {
  return (
    <>
      <Stack
        flexDir="column"
        gap={0}
        w="full"
        md={{ h: 'full', overflowY: 'auto' }}
      >
        <MotionVStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          align="stretch"
          gap={10}
          px={5}
          py={10}
          md={{ maxW: '50.25rem', p: '5rem' }}
          w="full"
        >
          <VStack align="stretch" gap={6}>
            <Heading
              fontWeight="900"
              lineHeight={1.0625}
              fontSize="2.5rem"
              md={{ fontSize: '4rem' }}
            >
              Writing
            </Heading>
            <Heading
              fontWeight="900"
              color="theme.green"
              lineHeight={1.1}
              fontSize="1.5rem"
              md={{ fontSize: '2.5rem' }}
            >
              Notes on systems that have to stay correct.
            </Heading>
          </VStack>

          <VStack align="stretch" gap={0}>
            {WRITING.map((entry) => (
              <VStack
                key={entry.slug}
                align="stretch"
                gap={3}
                py={8}
                borderTopWidth="1px"
                borderColor="whiteAlpha.200"
                _light={{ borderColor: 'blackAlpha.100' }}
                _last={{ borderBottomWidth: '1px' }}
              >
                <Text
                  fontSize="xs"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  opacity={0.48}
                >
                  {entry.date} &middot; {entry.readingTime}
                </Text>

                <Heading
                  asChild
                  fontWeight="900"
                  fontSize="1.75rem"
                  lineHeight={1.15}
                  md={{ fontSize: '2.25rem' }}
                  _hover={{ color: 'theme.green' }}
                  transition="color 0.2s"
                >
                  <Link
                    to="/writing/$slug"
                    params={{ slug: entry.slug }}
                  >
                    {entry.title}
                  </Link>
                </Heading>

                <Text fontSize="md" lineHeight={1.5} opacity={0.64}>
                  {entry.dek}
                </Text>

                <Wrap gap={2} pt={1}>
                  {entry.tags.map((tag) => (
                    <Text
                      key={tag}
                      fontSize="xs"
                      px={2}
                      py={1}
                      opacity={0.56}
                      borderWidth="1px"
                      borderColor="whiteAlpha.200"
                      _light={{ borderColor: 'blackAlpha.100' }}
                    >
                      {tag}
                    </Text>
                  ))}
                </Wrap>
              </VStack>
            ))}
          </VStack>
        </MotionVStack>
      </Stack>

      <RightGlyph accentColor="theme.green" />
    </>
  );
}
