import { IconArrowRight } from '@/components/icons/icon-arrow-right';
import { IconX } from '@/components/icons/icon-x';
import { SquareButton } from '@/components/square-button';
import { ALL_ITEMS, STACK_CATEGORIES } from '@/content/stack';
import { StackContext, StackContextProvider } from '@/contexts/stack.context';
import type { DialogOpenChangeDetails } from '@chakra-ui/react';
import {
  Box,
  Center,
  Circle,
  Dialog,
  HStack,
  Icon,
  Portal,
  Text,
  VStack,
  useMediaQuery,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { use, useCallback, useMemo } from 'react';

const MotionCircle = motion.create(Circle);

export const Route = createFileRoute('/__home/my-stack')({
  component: RouteComponent,
});

function StackItem({ item }: { item: StackItem }) {
  const { activeItem, setActiveItem } = use(StackContext);
  const isSelected = activeItem?.slug === item.slug;

  const dimensions = useMemo(
    () => ({
      height: `${(item.style.size * 2) / 16}rem`,
      left: `${item.style.x / 16}rem`,
      top: `${item.style.y / 16}rem`,
      width: `${(item.style.size * 2) / 16}rem`,
    }),
    [item.style],
  );

  const hoverScale = useMemo(() => {
    const size = item.style.size;

    if (size >= 40) return 1.05;

    if (size >= 25) return 1.1;

    return 1.25;
  }, [item.style.size]);

  const animationDelay = useMemo(() => {
    const size = item.style.size;

    if (size >= 50) return 0.4;

    if (size >= 25) return 0.2;

    return 0.1;
  }, [item.style.size]);

  const toggleItem = useCallback(() => {
    isSelected ? setActiveItem(null) : setActiveItem(item);
  }, [isSelected]);

  return (
    <MotionCircle
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: { delay: animationDelay, duration: 0.25, ease: 'linear' },
      }}
      aria-selected={isSelected}
      as="button"
      bg="theme.green/16"
      border="1px solid transparent"
      id={item.slug}
      pos="absolute"
      style={dimensions}
      transitionDuration="200ms"
      translate="-50% -50%"
      _hover={{
        bg: 'theme.green/25',
        scale: hoverScale,
      }}
      _selected={{
        borderColor: 'theme.green',
      }}
      onClick={toggleItem}
    >
      {item.icon && <Icon as={item.icon} />}
    </MotionCircle>
  );
}

function StackCategory({ category }: { category: StackCategory }) {
  return (
    <Box>
      {category.tools.map((item, index) => (
        <StackItem key={`${index}-${item.slug}`} item={item} />
      ))}
    </Box>
  );
}

function LargeScreen() {
  const { activeItem, setActiveItem } = use(StackContext);

  const handleOpenChange = ({ open }: DialogOpenChangeDetails) => {
    if (!open) {
      setActiveItem(null);
    }
  };

  return (
    <Center w="full" h="full" md={{ h: 'full', overflowY: 'auto' }}>
      <Box className="group" pos="relative" w="43.5rem" h="45rem" mx="auto">
        {STACK_CATEGORIES.map((category, index) => (
          <StackCategory
            key={`${index}-${category.slug}`}
            category={category}
          />
        ))}
      </Box>

      <Dialog.Root
        open={!!activeItem}
        onOpenChange={handleOpenChange}
        placement="bottom"
      >
        <Portal>
          {/* <Dialog.Backdrop /> */}
          <Dialog.Positioner>
            <Dialog.Content
              bg="#071310"
              border={0}
              borderTop="1px solid"
              borderColor="theme.green"
              rounded="none"
              boxShadow="none"
              ml="auto"
              mr={5}
              py={5}
              px={6}
              md={{
                mr: 10,
                mb: 24,
              }}
            >
              <Dialog.CloseTrigger asChild>
                <SquareButton
                  accentColor="theme.green"
                  boxSize={12}
                  pos="absolute"
                  top={0}
                  right={0}
                >
                  <IconX />
                </SquareButton>
              </Dialog.CloseTrigger>
              <Dialog.Header asChild gap={2} pb={0}>
                <HStack justify="space-between">
                  <VStack align="stretch" gap={2}>
                    <Dialog.Title fontSize="2rem" fontWeight="extrabold">
                      {activeItem?.name}
                    </Dialog.Title>
                    <Dialog.Description
                      color="theme.green"
                      fontSize="2xl"
                      fontWeight="extrabold"
                    >
                      {activeItem?.type}
                    </Dialog.Description>
                  </VStack>

                  {activeItem?.icon && (
                    <Icon as={activeItem.icon} boxSize="4.5rem" />
                  )}
                </HStack>
              </Dialog.Header>
              <Dialog.Body color="fg/64" pt={6}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, placeat soluta! Laborum eligendi sit excepturi
                accusantium doloribus nesciunt natus delectus qui quasi minima,
                magni voluptatem repudiandae earum! Consequatur, eum magni!
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Center>
  );
}

function SmallScreen() {
  const { activeItem, setActiveItem } = use(StackContext);

  return (
    <Box pos="relative">
      <VStack
        align="stretch"
        gap={0}
        transitionDuration="slower"
        transitionTimingFunction="ease-out"
        w="full"
        css={
          activeItem
            ? {
                opacity: 0,
                translate: '-100% 0',
              }
            : {
                opacity: 1,
                translate: '0 0 ',
              }
        }
      >
        {ALL_ITEMS.map((item, index) => (
          <HStack
            key={`${index}-${item.slug}`}
            bg="theme.green/8"
            borderBottom="1px solid"
            borderColor="theme.green/16"
            className="group"
            px={5}
            py={5}
            _active={{
              bg: 'theme.green',
            }}
            onClick={() => setActiveItem(item)}
          >
            <Center boxSize="3.5rem">
              {item.icon && <Icon as={item.icon} />}
            </Center>
            <VStack align="flex-start" gap={0}>
              <Text fontSize="xl" fontWeight="black">
                {item.name}
              </Text>
              <Text
                color="theme.green"
                fontSize="md"
                fontWeight="black"
                _groupActive={{ color: 'white' }}
              >
                {item.type}
              </Text>
            </VStack>

            <Icon as={IconArrowRight} color="theme.green" ml="auto" />
          </HStack>
        ))}
      </VStack>

      <Box
        inset={0}
        pos="absolute"
        overflowY="auto"
        transitionDuration="slower"
        transitionTimingFunction="ease-out"
        w="full"
        css={
          activeItem
            ? {
                opacity: 1,
                translate: '0 0 ',
              }
            : {
                opacity: 0,
                translate: '100% 0',
              }
        }
      >
        <HStack bg="theme.green/8" className="group" gap={4}>
          <SquareButton
            accentColor="theme.green"
            onClick={() => setActiveItem(null)}
          >
            <Icon as={IconArrowRight} rotate="180deg" />
          </SquareButton>

          <Text fontSize="xl" fontWeight="black">
            {activeItem?.name}
          </Text>
        </HStack>

        <Box p={5}>
          {activeItem?.icon && <Icon as={activeItem.icon} boxSize="4.5rem" />}
          <VStack align="stretch" gap={2} mb={6}>
            <Text fontSize="3xl" fontWeight="extrabold">
              {activeItem?.name}
            </Text>
            <Text color="theme.green" fontSize="xl" fontWeight="extrabold">
              {activeItem?.type}
            </Text>
          </VStack>
          <Text color="fg/64">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis,
            placeat soluta! Laborum eligendi sit excepturi accusantium doloribus
            nesciunt natus delectus qui quasi minima, magni voluptatem
            repudiandae earum! Consequatur, eum magni!
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function RouteComponent() {
  const [isLargeScreen] = useMediaQuery(['(min-width: 48rem)']);
  return (
    <StackContextProvider>
      {isLargeScreen ? <LargeScreen /> : <SmallScreen />}
    </StackContextProvider>
  );
}
