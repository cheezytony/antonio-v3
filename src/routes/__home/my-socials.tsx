import { IconInstagram } from '@/components/icons/icon-instagram';
import { IconTiktok } from '@/components/icons/icon-tiktok';
import { IconTwitch } from '@/components/icons/icon-twitch';
import { IconTwitter } from '@/components/icons/icon-twitter';
import { IconYoutube } from '@/components/icons/icon-youtube';
import { LeftGlyph } from '@/components/left-glyph';
import { RightGlyph } from '@/components/right-glyph';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import type { MotionNodeAnimationOptions } from 'framer-motion';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SocialLinkProps {
  href: string;
  icon?: ReactNode;
  key: string;
  thumbnailUrl?: string;
  title: string;
}

const MotionGridItem = motion.create(GridItem);
const MotionSquare = motion.create(Square);

const PROFESSIONAL_LINKS: Array<SocialLinkProps> = [
  {
    href: 'https://github.com/cheezytony',
    key: 'github',
    thumbnailUrl: '/images/my-socials-github.webp',
    title: 'Github',
  },
  {
    href: 'https://linkedin.com/in/antonio-okoro',
    key: 'linkedin',
    thumbnailUrl: '/images/my-socials-linkedin.webp',
    title: 'Linkedin',
  },
  {
    href: 'https://',
    key: 'my-resume',
    thumbnailUrl: '/images/my-socials-resume.webp',
    title: 'My Resume',
  },
];

const SOCIAL_MEDIA_LINKS: Array<SocialLinkProps> = [
  {
    href: 'https://www.instagram.com/cheezytony',
    key: 'instagram',
    title: 'Instagram',
    icon: <IconInstagram />,
  },
  {
    href: 'https://www.tiktok.com/@cheezytony_',
    key: 'tiktok',
    title: 'TikTok',
    icon: <IconTiktok />,
  },
  {
    href: 'https://x.com/antonio_okoro?s=21&t=365cKC1jRivmuSvXxEdAqA',
    key: 'x (twitter)',
    title: 'X (Twitter)',
    icon: <IconTwitter />,
  },
  {
    href: 'https://www.twitch.tv/cheezytony',
    key: 'twitch',
    title: 'Twitch',
    icon: <IconTwitch />,
  },
  {
    href: 'https://youtube.com/@cheezytony?si=4T7ZO2WVTJY8dDlW',
    key: 'youtube',
    title: 'Youtube',
    icon: <IconYoutube />,
  },
];

export const Route = createFileRoute('/__home/my-socials')({
  component: RouteComponent,
});

function ExternalIndicator() {
  return (
    <Center
      bg="white/8"
      boxSize={8}
      color="white/50"
      pos="absolute"
      right={0}
      top={0}
      zIndex={2}
      md={{
        bg: 'white/16',
        boxSize: 14,
        color: 'white',
        opacity: 0,
        _groupHover: { opacity: 1 },
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.50033 5.54128C7.50033 5.54128 13.2822 5.08901 14.0965 5.90321C14.9107 6.71741 14.4583 12.4994 14.4583 12.4994M13.7503 6.24935L5.41699 14.5827"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Center>
  );
}

function ProfessionalLink({
  thumbnailUrl,
  title,
  href,
  ...props
}: SocialLinkProps & MotionNodeAnimationOptions) {
  return (
    <MotionGridItem
      {...props}
      as={Link}
      pos="relative"
      className="group"
      isolation="isolate"
      {...{ to: href, target: '_blank' }}
    >
      <Box pos="absolute" inset={0} bg="theme.orange/8" zIndex={0} />
      <Box
        asChild
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center"
        pos="relative"
        zIndex={1}
        md={{
          opacity: 0.24,
          filter: 'saturate(0)',
          _groupHover: {
            filter: 'none',
            opacity: 1,
          },
        }}
      >
        <Image src={thumbnailUrl!} alt={title} layout="fullWidth" />
      </Box>
      <ExternalIndicator />
    </MotionGridItem>
  );
}

function SocialLink({
  title,
  icon,
  href,
  ...props
}: SocialLinkProps & MotionNodeAnimationOptions) {
  return (
    <MotionSquare
      {...props}
      as={Link}
      aspectRatio={1}
      bg="theme.orange/8"
      borderBottom="1px solid transparent"
      color="theme.orange"
      pos="relative"
      className="group"
      md={{
        color: 'white/40',
        _hover: {
          borderBottomColor: 'theme.orange',
          color: 'theme.orange',
        },
      }}
      {...{ to: href, target: '_blank' }}
    >
      <Box asChild>{icon}</Box>
      <Text
        pos="absolute"
        fontSize="xs"
        bottom="15.5%"
        left="50%"
        translate="-50% 0"
        textAlign="center"
        w="full"
        md={{
          fontSize: 'md',
          opacity: 0,
          _groupHover: {
            opacity: 1,
          },
        }}
      >
        {title}
      </Text>
    </MotionSquare>
  );
}

function RouteComponent() {
  return (
    <Center h="full" isolation="isolate" w="full">
      <LeftGlyph />

      <VStack
        align="stretch"
        gap={2}
        maxW="60.25rem"
        p={{ base: 5, md: 20 }}
        w="full"
      >
        <Grid gap={2} templateColumns={{ base: 'repeat(3, 1fr)' }}>
          {PROFESSIONAL_LINKS.map((link, index) => (
            <ProfessionalLink
              {...link}
              key={link.key}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.05 * index },
              }}
            />
          ))}
        </Grid>

        <Grid
          gap={2}
          templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(5, 1fr)' }}
        >
          {SOCIAL_MEDIA_LINKS.map((link, index) => (
            <SocialLink
              {...link}
              key={link.key}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  delay: 0.05 * (index + PROFESSIONAL_LINKS.length),
                },
              }}
            />
          ))}
        </Grid>
      </VStack>

      <RightGlyph accentColor="theme.orange" />
    </Center>
  );
}
