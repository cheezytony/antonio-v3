import { Box, Center, Grid } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const GAMES = [
  {
    title: 'Mortal Kombat',
    key: 'Mortal Kombat',
    thumbnailUrl: '/images/gaming-mortal-kombat.webp',
  },
  {
    title: 'EA FC 26',
    key: 'EA FC 26',
    thumbnailUrl: '/images/gaming-ea-fc26.jpg',
  },
  {
    title: 'Apex Legends',
    key: 'Apex Legends',
    thumbnailUrl: '/images/gaming-apex-legends.png',
  },
  {
    title: 'Fortnite',
    key: 'Fortnite',
    thumbnailUrl: '/images/gaming-fortnite.jpg',
  },
  {
    title: 'Cyberpunk 2077',
    key: 'Cyberpunk 2077',
    thumbnailUrl: '/images/gaming-cyberpunk-2077.png',
  },
  {
    title: 'Red Dead Redemption 2',
    key: 'Red Dead Redemption 2',
    thumbnailUrl: '/images/gaming-red-dead-redemption-2.png',
  },
  {
    title: 'Alan Wake 2',
    key: 'Alan Wake 2',
    thumbnailUrl: '/images/gaming-alan-wake-2.png',
  },
  {
    title: 'Hell Divers 2',
    key: 'Hell Divers 2',
    thumbnailUrl: '/images/gaming-helldivers-2.png',
  },
];

const ITEMS_PER_PAGE = 8;

const MotionCenter = motion.create(Center);

export const Route = createFileRoute('/__home/gaming')({
  component: RouteComponent,
});

function RouteComponent() {
  const [page] = useState(1);

  const items = useMemo(() => {
    return GAMES.slice(page - 1, ITEMS_PER_PAGE);
  }, [page]);

  return (
    <Grid
      className="group"
      gap={0}
      overflow="auto"
      templateColumns={{
        base: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        '2xl': 'repeat(4, 1fr)',
      }}
      h="full"
    >
      {items.map((game, index) => (
        <MotionCenter
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.02 * index },
          }}
          key={game.key}
          aspectRatio={1}
          md={{
            aspectRatio: 'unset',
            filter: 'grayscale()',
            opacity: 0.5,
            _groupHover: {
              filter: 'grayscale() opacity(0.5)',
              _hover: {
                opacity: 1,
                filter: 'none',
              },
            },
          }}
        >
          <Box
            asChild
            h="full"
            w="full"
            objectFit="cover"
            objectPosition="center"
            transitionDuration="300ms"
            // md={{
            //   filter: 'grayscale()',
            //   opacity: 0.5,
            //   _groupHover: {
            //     filter: 'none',
            //     opacity: 1,
            //   },
            // }}
          >
            <Image
              src={game.thumbnailUrl}
              alt={game.title}
              layout="fullWidth"
            />
          </Box>
        </MotionCenter>
      ))}
    </Grid>
  );
}
