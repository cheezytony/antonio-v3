import { IconX } from '@/components/icons/icon-x';
import { SquareButton } from '@/components/square-button';
import { STACK_CATEGORIES } from '@/content/stack';
import { StackContext } from '@/contexts/stack-context';
import type { DialogOpenChangeDetails } from '@chakra-ui/react';
import {
  Box,
  Center,
  Circle,
  Dialog,
  HStack,
  Icon,
  Portal,
  VStack,
} from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { use, useCallback, useMemo, useState } from 'react';

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

  const toggleItem = useCallback(() => {
    isSelected ? setActiveItem(null) : setActiveItem(item);
  }, [isSelected]);

  return (
    <Circle
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
        scale: 1.1,
      }}
      _selected={{
        borderColor: 'theme.green',
      }}
      onClick={toggleItem}
    >
      {item.icon && <Icon as={item.icon} />}
    </Circle>
  );
}

function StackCategory({ category }: { category: StackCategory }) {
  return (
    <Box
    // _groupHover={{
    //   filter: 'blur(4px)',
    //   opacity: 0.9,
    //   _hover: {
    //     filter: 'none',
    //     opacity: 1,
    //   },
    // }}
    >
      {category.tools.map((item) => (
        <StackItem key={item.slug} item={item} />
      ))}
    </Box>
  );
}

function RouteComponent() {
  const [activeItem, setActiveItem] = useState<StackItem | null>(null);

  const handleOpenChange = ({ open }: DialogOpenChangeDetails) => {
    if (!open) {
      setActiveItem(null);
    }
  };

  return (
    <StackContext
      value={{
        activeItem,
        setActiveItem,
      }}
    >
      <Center w="full" h="full" md={{ h: 'full', overflowY: 'auto' }}>
        <Box className="group" pos="relative" w="43.5rem" h="45rem" mx="auto">
          {STACK_CATEGORIES.map((category) => (
            <StackCategory key={category.slug} category={category} />
          ))}
        </Box>
      </Center>

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
    </StackContext>
  );
}
