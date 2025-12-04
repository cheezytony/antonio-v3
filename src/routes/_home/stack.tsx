import { Parallax } from '@/components/ui/parallax';
import { Header } from '@/modules/header';
import type { CenterProps } from '@chakra-ui/react';
import { Center, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';

interface ItemProps extends CenterProps {
  title: string;
  subTitle: string;
}

function Item({ title, subTitle, ...props }: ItemProps) {
  return (
    <Center
      border="1px solid"
      borderColor="#56AB91"
      className="group"
      flexDir="column"
      transitionDuration="slower"
      _groupHover={{
        '&:not(:hover)': {
          opacity: 0.85,
        },
      }}
      _hover={{
        filter: 'none',
        opacity: 1,
      }}
      {...props}
    >
      <Parallax resistance={75}>
        <Heading
          as="h2"
          size={{ base: '4xl', md: '6xl' }}
          _groupHover={{
            scale: 1.2,
          }}
          transition="scale 100ms"
          willChange="transform"
        >
          {title}
        </Heading>
      </Parallax>
      <Parallax resistance={50}>
        <Heading
          as="h3"
          size={{ base: '2xl', md: '3xl' }}
          _groupHover={{
            scale: 1.2,
          }}
          transition="scale 100ms"
          willChange="transform"
        >
          {subTitle}
        </Heading>
      </Parallax>
    </Center>
  );
}

function RouteComponent() {
  return (
    <Flex bg="white" direction="column" h="max(100dvh, 900px)">
      <Header
        pageTitle="My Stack"
        bg="#67B99A"
        border="1px solid"
        borderColor="#56AB91"
      />

      <Grid
        // className="group"
        flexGrow={1}
        gridTemplateColumns={{ md: 'repeat(7, 1fr)' }}
        gridTemplateRows={{ md: 'repeat(7, 1fr)' }}
      >
        <GridItem asChild colSpan={{ md: 2 }} rowSpan={{ md: 5 }}>
          <Item bg="#88D4AB" title="PHP" subTitle="Laravel" />
        </GridItem>
        <GridItem asChild colSpan={{ md: 5 }} rowSpan={{ md: 2 }}>
          <Item bg="#78C6A3" title="React" subTitle="Next.js / React Native" />
        </GridItem>
        <GridItem asChild colSpan={{ md: 3 }} rowSpan={{ md: 3 }}>
          <Item bg="#99E2B4" title="JavaScript" subTitle="TypeScript" />
        </GridItem>
        <GridItem asChild colSpan={{ md: 2 }} rowSpan={{ md: 5 }}>
          <Item bg="#88D4AB" title="Node.js" subTitle="Nest.Js / Adonis.Js" />
        </GridItem>
        <GridItem asChild colSpan={{ md: 5 }} rowSpan={{ md: 2 }}>
          <Item bg="#78C6A3" title="Vue.js" subTitle="Nuxt.js" />
        </GridItem>
      </Grid>
    </Flex>
  );
}

export const Route = createFileRoute('/_home/stack')({
  component: RouteComponent,
});
