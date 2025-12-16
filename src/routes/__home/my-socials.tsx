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
    thumbnailUrl: '/images/my-socials-github.png',
    title: 'Github',
  },
  {
    href: 'https://linkedin.com/in/antonio-okoro',
    key: 'linkedin',
    thumbnailUrl: '/images/my-socials-linkedin.png',
    title: 'Linkedin',
  },
  {
    href: 'https://',
    key: 'my-resume',
    thumbnailUrl: '/images/my-socials-resume.png',
    title: 'My Resume',
  },
];

const SOCIAL_MEDIA_LINKS: Array<SocialLinkProps> = [
  {
    href: 'https://www.instagram.com/cheezytony',
    key: 'instagram',
    title: 'Instagram',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.16699 19.9993C4.16699 12.5354 4.16699 8.8035 6.48573 6.48475C8.80448 4.16602 12.5364 4.16602 20.0003 4.16602C27.4642 4.16602 31.1962 4.16602 33.515 6.48475C35.8337 8.8035 35.8337 12.5354 35.8337 19.9993C35.8337 27.4632 35.8337 31.1952 33.515 33.514C31.1962 35.8327 27.4642 35.8327 20.0003 35.8327C12.5364 35.8327 8.80448 35.8327 6.48573 33.514C4.16699 31.1952 4.16699 27.4632 4.16699 19.9993Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M27.5 20C27.5 24.1422 24.1422 27.5 20 27.5C15.8579 27.5 12.5 24.1422 12.5 20C12.5 15.8579 15.8579 12.5 20 12.5C24.1422 12.5 27.5 15.8579 27.5 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M29.18 10.834H29.165"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.tiktok.com/@cheezytony_',
    key: 'tiktok',
    title: 'TikTok',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.16699 19.9993C4.16699 12.5354 4.16699 8.8035 6.48573 6.48475C8.80448 4.16602 12.5364 4.16602 20.0003 4.16602C27.4642 4.16602 31.1962 4.16602 33.515 6.48475C35.8337 8.8035 35.8337 12.5354 35.8337 19.9993C35.8337 27.4632 35.8337 31.1952 33.515 33.514C31.1962 35.8327 27.4642 35.8327 20.0003 35.8327C12.5364 35.8327 8.80448 35.8327 6.48573 33.514C4.16699 31.1952 4.16699 27.4632 4.16699 19.9993Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M17.5602 18.3475C16.1934 18.1543 13.0781 18.474 11.5505 21.2986C10.0229 24.1231 11.5625 27.063 12.5232 28.1798C13.472 29.2246 16.4874 31.2033 19.686 29.2715C20.4788 28.7926 21.4665 28.4355 22.587 24.6938L22.4567 9.9707C22.2405 11.5919 24.0313 15.3945 29.1303 15.8445"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: 'https://x.com/antonio_okoro?s=21&t=365cKC1jRivmuSvXxEdAqA',
    key: 'x (twitter)',
    title: 'X (Twitter)',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.16699 19.9993C4.16699 12.5354 4.16699 8.8035 6.48573 6.48475C8.80448 4.16602 12.5364 4.16602 20.0003 4.16602C27.4643 4.16602 31.1961 4.16602 33.515 6.48475C35.8336 8.8035 35.8336 12.5354 35.8336 19.9993C35.8336 27.4632 35.8336 31.1952 33.515 33.514C31.1961 35.8327 27.4643 35.8327 20.0003 35.8327C12.5364 35.8327 8.80448 35.8327 6.48573 33.514C4.16699 31.1952 4.16699 27.4632 4.16699 19.9993Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M11.667 28.3327L18.6563 21.3435M18.6563 21.3435L11.667 11.666H16.2966L21.3445 18.6552M18.6563 21.3435L23.704 28.3327H28.3336L21.3445 18.6552M28.3336 11.666L21.3445 18.6552"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: 'https://www.twitch.tv/cheezytony',
    key: 'twitch',
    title: 'Twitch',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.6667 11.666V18.3327M20 11.666V18.3327"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M26.667 5H13.3337C10.191 5 8.61961 5 7.64331 5.97263C6.66699 6.94527 6.66699 8.51068 6.66699 11.6415V22.6C6.66699 23.217 6.66699 23.5255 6.70803 23.7837C6.93394 25.2047 8.05258 26.319 9.47888 26.5442C9.73799 26.585 10.0477 26.585 10.667 26.585C10.8218 26.585 10.8992 26.585 10.964 26.5952C11.3206 26.6515 11.6003 26.93 11.6567 27.2853C11.667 27.3498 11.667 27.427 11.667 27.5812V30.1535C11.667 32.1237 11.667 33.1088 12.2245 33.3037C12.782 33.4985 13.3997 32.7292 14.6351 31.1907L17.8333 27.2082C18.0792 26.902 18.202 26.7488 18.3732 26.667C18.5443 26.585 18.7412 26.585 19.1347 26.585H25.5722C26.9347 26.585 27.616 26.585 28.2285 26.3322C28.8412 26.0795 29.3228 25.5995 30.2863 24.6397L31.381 23.5492C32.3445 22.5893 32.8262 22.1093 33.08 21.4992C33.3337 20.8888 33.3337 20.2102 33.3337 18.8528V11.6415C33.3337 8.51068 33.3337 6.94527 32.3573 5.97263C31.381 5 29.8097 5 26.667 5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: 'https://youtube.com/@cheezytony?si=4T7ZO2WVTJY8dDlW',
    key: 'youtube',
    title: 'Youtube',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.9997 34.1673C23.0158 34.1673 25.9082 33.8693 28.5887 33.323C31.9368 32.6405 33.611 32.2992 35.1387 30.335C36.6663 28.3708 36.6663 26.1162 36.6663 21.6065V18.3948C36.6663 13.8852 36.6663 11.6304 35.1387 9.66627C33.611 7.70212 31.9368 7.36087 28.5887 6.67835C25.9082 6.13193 23.0158 5.83398 19.9997 5.83398C16.9835 5.83398 14.0912 6.13193 11.4106 6.67835C8.06244 7.36087 6.38836 7.70212 4.86067 9.66627C3.33301 11.6304 3.33301 13.8852 3.33301 18.3948V21.6065C3.33301 26.1162 3.33301 28.3708 4.86067 30.335C6.38836 32.2992 8.06244 32.6405 11.4106 33.323C14.0912 33.8693 16.9835 34.1673 19.9997 34.1673Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M26.6035 20.5208C26.3562 21.5305 25.0402 22.2557 22.4082 23.7062C19.5453 25.2835 18.114 26.0723 16.9547 25.7685C16.562 25.6655 16.2003 25.4845 15.8966 25.239C15 24.5142 15 23.0092 15 19.9993C15 16.9895 15 15.4845 15.8966 14.7596C16.2003 14.5141 16.562 14.3332 16.9547 14.2302C18.114 13.9264 19.5453 14.7151 22.4082 16.2926C25.0402 17.743 26.3562 18.4682 26.6035 19.4778C26.6877 19.8215 26.6877 20.1772 26.6035 20.5208Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
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
    <Center h="full">
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
    </Center>
  );
}
