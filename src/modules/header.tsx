import type { StackProps } from '@chakra-ui/react';
import {
  Box,
  Button,
  Circle,
  Container,
  HStack,
  Heading,
  Square,
  VStack,
} from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useState } from 'react';

export interface HeaderProps extends StackProps {
  isSticky?: boolean;
  pageTitle?: ReactNode;
}

const MotionCircle = motion.create(Circle);
const MotionBox = motion.create(Box);

const LINKS: Array<{
  title: string;
  href?: string;
}> = [
  { title: 'HOMEPAGE', href: '/' },
  { title: 'BIO', href: '/bio' },
  { title: 'STACK', href: '/stack' },
  { title: 'TIMELINE' },
  { title: 'PROJECTS' },
  { title: 'GAMING' },
  { title: 'SOCIALS' },
  { title: '@ME' },
];

export function Header({ isSticky, pageTitle, ...props }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HStack
        h={{ base: 20, md: '10rem' }}
        top={0}
        w="full"
        {...(isSticky && {
          pos: 'absolute',
          top: 0,
          zIndex: 998,
        })}
        {...props}
      >
        {pageTitle && (
          <Heading
            as="h1"
            fontSize={{ base: '5xl', md: '7xl', '2xl': '4.625rem' }}
            lineHeight={0.75}
            opacity={0.75}
            mx="auto"
            textAlign="center"
          >
            {pageTitle}
          </Heading>
        )}
      </HStack>

      <Box as="header" w="full" pos="absolute" zIndex={1000}>
        <Container maxW={1650 + 64 * 2}>
          <HStack
            justify="space-between"
            gap={8}
            h={{ base: 20, md: '8rem' }}
            pos="relative"
          >
            {/* <Link to="/">
              <Icon
                as={Logo}
                boxSize={{ base: 20, md: 24 }}
                hideBelow="lg"
                mr="auto"
              />
            </Link> */}

            <Button
              // as={Link}
              unstyled
              ml="auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // {...{ to: '/' }}
            >
              <MotionCircle
                alignItems="stretch"
                justifyContent="stretch"
                borderWidth={{ base: 4, md: 6 }}
                borderStyle="solid"
                borderColor="white"
                className="group"
                size={12}
                p={2}
                md={{
                  boxSize: 20,
                  p: 3,
                }}
                whileHover={
                  isMenuOpen
                    ? {
                        rotate: '-90deg',
                        transition: {
                          duration: 0.5,
                        },
                      }
                    : {}
                }
              >
                <Square size="full" pos="relative">
                  <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    m="auto"
                    w={isMenuOpen ? 'full' : '75%'}
                    h={{ base: 1, md: 1.5 }}
                    bg="white"
                    borderRadius="full"
                    transform="auto"
                    transitionDuration="moderate"
                    {...(isMenuOpen
                      ? {
                          rotate: '45deg',
                        }
                      : {
                          translateX: '-1',
                          translateY: '-150%',
                          _groupHover: {
                            translateX: '0',
                            w: 'full',
                          },
                        })}
                  />
                  <Box
                    pos="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    m="auto"
                    w={isMenuOpen ? 'full' : '75%'}
                    h={{ base: 1, md: 1.5 }}
                    bg="white"
                    borderRadius="full"
                    transform="auto"
                    transitionDuration="moderate"
                    {...(isMenuOpen
                      ? {
                          rotate: '-45deg',
                        }
                      : {
                          translateX: '1',
                          translateY: '150%',
                          _groupHover: {
                            translateX: '0',
                            w: 'full',
                          },
                        })}
                  />
                </Square>
              </MotionCircle>
            </Button>
          </HStack>
        </Container>
      </Box>

      <AnimatePresence>
        {isMenuOpen && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            pos="fixed"
            inset={0}
            bg="rgba(0 0 0 / 0.5)"
            backdropFilter="blur(10px)"
            zIndex={999}
          >
            <Container maxW={1650 + 64 * 2} py={20}>
              <VStack>
                {LINKS.map((link) => {
                  const content = (
                    <MotionBox asChild key={link.title}>
                      <Heading as="div" size="4xl">
                        {link.title}
                      </Heading>
                    </MotionBox>
                  );

                  if (link.href) {
                    return <Link to={link.href}>{content}</Link>;
                  }

                  return content;
                })}
              </VStack>
            </Container>
          </MotionBox>
        )}
      </AnimatePresence>
    </>
  );
}
