import { RightGlyph } from '@/components/right-glyph';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { Radio, RadioGroup } from '@/components/ui/radio';
import {
  CLOSES,
  EMPTY_FIELDS,
  HONESTY_PROMPTS,
  LANES,
  buildLetter,
  runChecks,
  type CheckLevel,
  type Lane,
  type LetterFields,
  type OpenerKind,
} from '@/content/cover-letter';
import { registerPageSeo } from '@/utils/seo';
import {
  Box,
  Button,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export const Route = createFileRoute('/__home/cover-letter')({
  component: RouteComponent,
  head: () =>
    registerPageSeo({
      title: 'Cover letter',
      description: 'Private tool.',
      pathname: '/cover-letter',
      robots: 'noindex, nofollow, noarchive',
    }),
});

const MotionVStack = motion.create(VStack);

const LEVEL_COLOR: Record<CheckLevel, string> = {
  pass: 'theme.green',
  warn: 'theme.yellow',
  fail: 'theme.red',
};

const LEVEL_MARK: Record<CheckLevel, string> = {
  pass: '✓',
  warn: '!',
  fail: '✕',
};

function RouteComponent() {
  const [fields, setFields] = useState<LetterFields>(EMPTY_FIELDS);
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof LetterFields>(key: K, value: LetterFields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    setCopied(false);
  };

  const letter = useMemo(() => buildLetter(fields), [fields]);
  const checks = useMemo(() => runChecks(fields, letter), [fields, letter]);

  const failing = checks.filter((check) => check.level === 'fail').length;
  const allConfirmed = HONESTY_PROMPTS.every((prompt) => confirmed[prompt.id]);
  const canCopy = failing === 0 && allConfirmed;

  const lane = LANES.find((entry) => entry.value === fields.lane) ?? LANES[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

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
          md={{ maxW: '68rem', p: '5rem' }}
          w="full"
        >
          <VStack align="stretch" gap={4}>
            <Text
              fontSize="xs"
              letterSpacing="0.1em"
              textTransform="uppercase"
              opacity={0.48}
            >
              Private &middot; not indexed &middot; nothing here is saved
            </Text>
            <Heading
              fontWeight="900"
              lineHeight={1.0625}
              fontSize="2.5rem"
              md={{ fontSize: '4rem' }}
            >
              Cover letter
            </Heading>
            <Text fontSize="md" lineHeight={1.5} opacity={0.64} maxW="46rem">
              Fill the fields, pick a lane, and the letter assembles itself from
              paragraphs whose claims are already true. The checks on the right
              are the ones you keep failing when you write these at midnight.
            </Text>
          </VStack>

          <Stack
            flexDir="column"
            gap={10}
            align="stretch"
            lg={{ flexDir: 'row' }}
          >
            {/* ---------------- inputs ---------------- */}
            <VStack align="stretch" gap={6} flex={1} minW={0}>
              <Field label="Company">
                <Input
                  value={fields.company}
                  onChange={(event) => set('company', event.target.value)}
                  placeholder="Kuda"
                  variant="subtle"
                />
              </Field>

              <Field label="Role">
                <Input
                  value={fields.role}
                  onChange={(event) => set('role', event.target.value)}
                  placeholder="Senior Backend Engineer"
                  variant="subtle"
                />
              </Field>

              <Field
                label="Lane"
                helperText={`Attach ${lane.cv}`}
              >
                <RadioGroup
                  value={fields.lane}
                  onValueChange={(event) =>
                    set('lane', (event.value ?? 'backend') as Lane)
                  }
                >
                  <VStack align="stretch" gap={2} pt={1}>
                    {LANES.map((entry) => (
                      <Radio key={entry.value} value={entry.value}>
                        {entry.label}
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              </Field>

              <Field label="Opener">
                <RadioGroup
                  value={fields.opener}
                  onValueChange={(event) =>
                    set('opener', (event.value ?? 'standard') as OpenerKind)
                  }
                >
                  <VStack align="stretch" gap={2} pt={1}>
                    <Radio value="standard">Standard</Radio>
                    <Radio value="objection">
                      Objection first (wrong stack, new domain, scope stretch)
                    </Radio>
                  </VStack>
                </RadioGroup>
              </Field>

              {fields.opener === 'objection' && (
                <Field
                  label="The objection"
                  helperText="State it, do not apologise for it. One only."
                >
                  <Textarea
                    value={fields.objection}
                    onChange={(event) => set('objection', event.target.value)}
                    placeholder="My backend work is in TypeScript and Node, with NestJS, PostgreSQL and Redis. It is not C# and .NET."
                    rows={3}
                    variant="subtle"
                  />
                </Field>
              )}

              {fields.opener === 'standard' && (
                <Field
                  label="Who their product serves"
                  helperText="In your words, not their marketing copy."
                >
                  <Input
                    value={fields.whoItServes}
                    onChange={(event) => set('whoItServes', event.target.value)}
                    placeholder="small businesses and creators"
                    variant="subtle"
                  />
                </Field>
              )}

              <Field
                label="The hook"
                helperText="One or two sentences you could only write having actually looked. A number that surprised you, something that happened when you used it, a decision you would have made differently."
              >
                <Textarea
                  value={fields.hook}
                  onChange={(event) => set('hook', event.target.value)}
                  placeholder="I opened an account last month and the thing I noticed was..."
                  rows={4}
                  variant="subtle"
                />
              </Field>

              <Field
                label="A line from the posting"
                helperText="Verbatim, in their words, so the bridge quotes them."
              >
                <Textarea
                  value={fields.theirLine}
                  onChange={(event) => set('theirLine', event.target.value)}
                  placeholder="debugging, troubleshooting and improving legacy applications"
                  rows={2}
                  variant="subtle"
                />
              </Field>

              <Field label="Close">
                <RadioGroup
                  value={fields.close}
                  onValueChange={(event) => set('close', event.value ?? 'overlap')}
                >
                  <VStack align="stretch" gap={2} pt={1}>
                    {CLOSES.map((entry) => (
                      <Radio key={entry.value} value={entry.value}>
                        {entry.label}
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              </Field>
            </VStack>

            {/* ---------------- checks + preview ---------------- */}
            <VStack align="stretch" gap={6} flex={1} minW={0}>
              <VStack align="stretch" gap={0}>
                <Text
                  fontSize="xs"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  opacity={0.48}
                  mb={3}
                >
                  Checks
                </Text>

                {checks.map((check, index) => (
                  <HStack
                    key={index}
                    align="flex-start"
                    gap={3}
                    py={3}
                    borderTopWidth="1px"
                    borderColor="whiteAlpha.200"
                    _light={{ borderColor: 'blackAlpha.100' }}
                    _last={{ borderBottomWidth: '1px' }}
                  >
                    <Text
                      color={LEVEL_COLOR[check.level]}
                      fontWeight="900"
                      fontSize="sm"
                      lineHeight={1.5}
                      w="1rem"
                      flexShrink={0}
                    >
                      {LEVEL_MARK[check.level]}
                    </Text>
                    <VStack align="stretch" gap={1}>
                      <Text fontSize="sm" fontWeight="700" lineHeight={1.4}>
                        {check.label}
                      </Text>
                      <Text fontSize="sm" lineHeight={1.5} opacity={0.56}>
                        {check.detail}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>

              <VStack align="stretch" gap={3}>
                <Text
                  fontSize="xs"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  opacity={0.48}
                >
                  Before you send it
                </Text>
                {HONESTY_PROMPTS.map((prompt) => (
                  <Checkbox
                    key={prompt.id}
                    checked={Boolean(confirmed[prompt.id])}
                    onCheckedChange={(event) =>
                      setConfirmed((current) => ({
                        ...current,
                        [prompt.id]: Boolean(event.checked),
                      }))
                    }
                    alignItems="flex-start"
                  >
                    <Text fontSize="sm" lineHeight={1.5} opacity={0.72}>
                      {prompt.label}
                    </Text>
                  </Checkbox>
                ))}
              </VStack>

              <VStack align="stretch" gap={3}>
                <Text
                  fontSize="xs"
                  letterSpacing="0.1em"
                  textTransform="uppercase"
                  opacity={0.48}
                >
                  Preview
                </Text>
                <Box
                  bg="whiteAlpha.50"
                  _light={{ bg: 'blackAlpha.50' }}
                  p={5}
                  maxH="28rem"
                  overflowY="auto"
                >
                  <Text
                    fontSize="sm"
                    lineHeight={1.7}
                    opacity={0.8}
                    whiteSpace="pre-wrap"
                  >
                    {letter}
                  </Text>
                </Box>

                <HStack gap={3} flexWrap="wrap">
                  <Button
                    variant="outline"
                    disabled={!canCopy}
                    onClick={handleCopy}
                    _hover={{ bg: 'theme.green' }}
                  >
                    {copied ? 'Copied' : 'Copy letter'}
                  </Button>
                  <Text fontSize="sm" opacity={0.56}>
                    {failing > 0
                      ? `${failing} check${failing > 1 ? 's' : ''} still failing`
                      : !allConfirmed
                        ? 'Confirm the three above'
                        : `Attach ${lane.cv}`}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </Stack>
        </MotionVStack>
      </Stack>

      <RightGlyph accentColor="theme.green" />
    </>
  );
}
