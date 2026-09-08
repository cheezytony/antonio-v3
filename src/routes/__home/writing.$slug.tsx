import { RightGlyph } from '@/components/right-glyph';
import { getWritingEntry } from '@/content/writing';
import { registerPageSeo } from '@/utils/seo';
import { Box, Heading, Stack, Text, VStack, Wrap } from '@chakra-ui/react';
import { Link, createFileRoute, notFound } from '@tanstack/react-router';
import { motion } from 'framer-motion';

export const Route = createFileRoute('/__home/writing/$slug')({
  loader: ({ params }) => {
    const entry = getWritingEntry(params.slug);
    if (!entry) throw notFound();

    return entry;
  },
  component: RouteComponent,
  head: ({ params }) => {
    const entry = getWritingEntry(params.slug);

    return registerPageSeo({
      title: entry?.title ?? 'Writing',
      description: entry?.dek,
      pathname: `/writing/${params.slug}`,
    });
  },
});

const MotionVStack = motion.create(VStack);

function RouteComponent() {
  const entry = Route.useLoaderData();

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
          <VStack align="stretch" gap={5}>
            <Text
              asChild
              fontSize="xs"
              letterSpacing="0.1em"
              textTransform="uppercase"
              opacity={0.48}
              _hover={{ opacity: 0.8 }}
              transition="opacity 0.2s"
            >
              <Link to="/writing">&larr; Writing</Link>
            </Text>

            <Heading
              fontWeight="900"
              lineHeight={1.0625}
              fontSize="2.5rem"
              md={{ fontSize: '4rem' }}
            >
              {entry.title}
            </Heading>

            <Text fontSize="lg" lineHeight={1.5} opacity={0.72}>
              {entry.dek}
            </Text>

            <Wrap gap={2} align="center">
              <Text
                fontSize="xs"
                letterSpacing="0.1em"
                textTransform="uppercase"
                opacity={0.48}
              >
                {entry.date} &middot; {entry.readingTime}
              </Text>
            </Wrap>
          </VStack>

          <VStack align="stretch" gap={8}>
            {entry.blocks.map((block, blockIndex) => (
              <VStack key={blockIndex} align="stretch" gap={4}>
                {block.heading && (
                  <Heading
                    fontWeight="900"
                    color="theme.green"
                    lineHeight={1.2}
                    fontSize="1.25rem"
                    md={{ fontSize: '1.5rem' }}
                  >
                    {block.heading}
                  </Heading>
                )}

                {block.paragraphs?.map((paragraph, paragraphIndex) => (
                  <Text
                    key={paragraphIndex}
                    fontSize="md"
                    lineHeight={1.6}
                    opacity={0.64}
                  >
                    {paragraph}
                  </Text>
                ))}

                {block.list && (
                  <VStack align="stretch" gap={5}>
                    {block.list.map((item, itemIndex) => (
                      <VStack key={itemIndex} align="stretch" gap={2}>
                        <Text fontSize="md" fontWeight="700" lineHeight={1.4}>
                          {item.term}
                        </Text>
                        <Text fontSize="md" lineHeight={1.6} opacity={0.64}>
                          {item.body}
                        </Text>
                      </VStack>
                    ))}
                  </VStack>
                )}

                {block.callout && (
                  <Box
                    borderLeftWidth="2px"
                    borderColor="theme.green"
                    pl={5}
                    py={1}
                  >
                    <Text
                      fontSize="xs"
                      letterSpacing="0.1em"
                      textTransform="uppercase"
                      opacity={0.48}
                      mb={2}
                    >
                      {block.callout.label}
                    </Text>
                    <Text fontSize="md" lineHeight={1.6} opacity={0.8}>
                      {block.callout.body}
                    </Text>
                  </Box>
                )}

                {block.pullQuote && (
                  <Heading
                    fontWeight="900"
                    lineHeight={1.25}
                    fontSize="1.5rem"
                    md={{ fontSize: '2rem' }}
                    py={4}
                  >
                    {block.pullQuote}
                  </Heading>
                )}
              </VStack>
            ))}
          </VStack>

          <Text fontSize="sm" lineHeight={1.6} opacity={0.48}>
            Written from design reasoning and production experience. No schema,
            code or internal detail of any former employer&rsquo;s system is
            reproduced here.
          </Text>
        </MotionVStack>
      </Stack>

      <RightGlyph accentColor="theme.green" />
    </>
  );
}
