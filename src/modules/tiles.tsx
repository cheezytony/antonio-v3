import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { generateColorVariants } from '../utils/colors'
import '@fontsource/averia-serif-libre'

// Modern, vibrant palette
const modernColors = [
  '#FF6B6B', // Coral Red
  '#4ECDC4', // Turquoise
  '#45B7D1', // Sky Blue
  '#96CEB4', // Sage Green
  '#FFEEAD', // Cream
  '#D4A5A5', // Dusty Rose
  '#9B59B6', // Purple
]

// Earthy, natural palette
const earthyColors = [
  '#E27D60', // Terracotta
  '#85DCB8', // Seafoam
  '#E8A87C', // Peach
  '#C38D9E', // Mauve
  '#41B3A3', // Teal
  '#D4A373', // Sand
  '#BC6C25', // Amber
]

// Cool, calming palette
const coolColors = [
  '#6B7FD7', // Periwinkle
  '#BCE0FD', // Light Blue
  '#4A90E2', // Ocean Blue
  '#7B9CE1', // Cornflower
  '#A5C4D4', // Powder Blue
  '#8BB8E8', // Sky Blue
  '#5D8AA8', // Steel Blue
]

// Warm, energetic palette
const warmColors = [
  '#FF9F1C', // Bright Orange
  '#FFBF69', // Light Orange
  '#FF6B6B', // Coral
  '#FFD166', // Yellow
  '#EF476F', // Pink
  '#FF9A8B', // Salmon
  '#FF6B6B', // Red
]

// Pastel, soft palette
const pastelColors = [
  '#FFB3BA', // Pastel Pink
  '#BAFFC9', // Pastel Green
  '#BAE1FF', // Pastel Blue
  '#FFFFBA', // Pastel Yellow
  '#FFB3F7', // Pastel Purple
  '#B3FFE6', // Pastel Teal
  '#FFE6B3', // Pastel Orange
]

// Monochromatic palette
const monoColors = [
  '#2C3E50', // Dark Blue
  '#34495E', // Blue
  '#7F8C8D', // Gray
  '#95A5A6', // Light Gray
  '#BDC3C7', // Lighter Gray
  '#ECF0F1', // Lightest Gray
  '#3498DB', // Bright Blue
]

// Neon, vibrant palette
const neonColors = [
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#FF0000', // Red
  '#0000FF', // Blue
  '#FFA500', // Orange
]

// Sunset gradient palette
const sunsetColors = [
  '#FF7E5F', // Coral
  '#FEB47B', // Peach
  '#FFD26F', // Yellow
  '#FF9A8B', // Salmon
  '#FF6B6B', // Red
  '#FF8E8E', // Light Red
  '#FFB3B3', // Pink
]

// Forest palette
const forestColors = [
  '#2E7D32', // Dark Green
  '#388E3C', // Green
  '#43A047', // Light Green
  '#66BB6A', // Lighter Green
  '#81C784', // Lightest Green
  '#A5D6A7', // Pale Green
  '#C8E6C9', // Very Pale Green
]

// Cyberpunk palette
const cyberpunkColors = [
  '#FF00A0', // Hot Pink
  '#00FFE0', // Electric Cyan
  '#FFE600', // Electric Yellow
  '#FF2A6D', // Neon Pink
  '#05D9E8', // Bright Cyan
  '#D1F7FF', // Light Cyan
  '#FF71CE', // Neon Rose
]

// Map of palette names to their colors
const palettes = {
  '0': { name: 'Neon', colors: neonColors },
  '1': { name: 'Modern', colors: modernColors },
  '2': { name: 'Earthy', colors: earthyColors },
  '3': { name: 'Cool', colors: coolColors },
  '4': { name: 'Warm', colors: warmColors },
  '5': { name: 'Pastel', colors: pastelColors },
  '6': { name: 'Mono', colors: monoColors },
  '7': { name: 'Sunset', colors: sunsetColors },
  '8': { name: 'Forest', colors: forestColors },
  '9': { name: 'Cyberpunk', colors: cyberpunkColors },
}

interface ColorTileProps {
  color: string
  index: number
  title: string
  description: string
  onHover: (index: number) => void
  onHoverEnd: () => void
}

function calculateTextDimensions(text: string, fontSize: string, maxWidth: number) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return { width: 0, height: 0 }

  // Set font size (convert from rem/em to px)
  const fontSizePx = fontSize === 'xl' ? 20 : 14 // Approximate conversion
  context.font = `${fontSizePx}px system-ui`

  // Calculate text width
  const metrics = context.measureText(text)
  const width = metrics.width

  // Calculate approximate height (assuming line height of 1.5)
  const lineHeight = fontSizePx * 1.5
  const height = lineHeight

  return {
    width: Math.min(width, maxWidth),
    height
  }
}

function ColorTile({
  color,
  index,
  title,
  description,
  onHover,
  onHoverEnd,
}: ColorTileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({
    title: { width: 0, height: 0 },
    description: { width: 0, height: 0 }
  })

  useEffect(() => {
    if (containerRef.current) {
      const maxWidth = 300
      const titleDims = calculateTextDimensions(title, 'xl', maxWidth)
      const descriptionDims = calculateTextDimensions(description, 'sm', maxWidth)
      
      setDimensions({
        title: titleDims,
        description: descriptionDims
      })
    }
  }, [title, description])

  return (
    <Center
      h="full"
      flexDirection="column"
      flex="1"
      bg={color}
      transition="all 0.3s ease"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onHoverEnd}
      cursor="pointer"
      position="relative"
      overflow="hidden"
      textAlign="center"
      className="group"
      _hover={{
        flex: '2',
      }}
    >
      <Box
        ref={containerRef}
        w="300px"
        px="6"
        py="4"
        position="relative"
      >
        <Box
          h={`${dimensions.title.height}px`}
          mb="2"
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontFamily="Averia Serif Libre"
            letterSpacing="wider"
          >
            {title}
          </Text>
        </Box>
        <Box
          h={`${dimensions.description.height * 3}px`}
          overflow="hidden"
        >
          <Text
            fontSize="sm"
            color="white"
            opacity="0"
            _groupHover={{
              opacity: '1',
              transitionDuration: '0.3s',
              transitionDelay: '0.1s',
            }}
            fontFamily="Averia Serif Libre"
            letterSpacing="wide"
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Center>
  )
}

export function Tiles() {
  const [activeColors, setActiveColors] = useState(palettes['1'].colors)
  const [currentPalette, setCurrentPalette] = useState('1')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key
      if (key in palettes) {
        setCurrentPalette(key)
        // If a tile is hovered, update colors immediately
        if (hoveredIndex !== null) {
          const hoveredColor = palettes[key as keyof typeof palettes].colors[hoveredIndex]
          const newColors = palettes[key as keyof typeof palettes].colors.map((_, i) => {
            if (i === hoveredIndex) return hoveredColor
            const distance = Math.abs(i - hoveredIndex)
            const variants = generateColorVariants(hoveredColor, 0, 'darker')
            return variants[Math.min(distance, variants.length - 1)]
          })
          setActiveColors(newColors)
        } else {
          setActiveColors(palettes[key as keyof typeof palettes].colors)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [hoveredIndex])

  const handleHover = (index: number) => {
    setHoveredIndex(index)
    const hoveredColor =
      palettes[currentPalette as keyof typeof palettes].colors[index]

    // Generate new colors for all boxes except the hovered one
    const newColors = palettes[
      currentPalette as keyof typeof palettes
    ].colors.map((_, i) => {
      if (i === index) return hoveredColor

      // Calculate distance from hovered box
      const distance = Math.abs(i - index)
      // Get darker variants based on distance
      const variants = generateColorVariants(hoveredColor, 0, 'darker')
      // Use the variant that corresponds to the distance
      return variants[Math.min(distance, variants.length - 1)]
    })

    setActiveColors(newColors)
  }

  const handleHoverEnd = () => {
    setHoveredIndex(null)
    setActiveColors(palettes[currentPalette as keyof typeof palettes].colors)
  }

  const tileContent = [
    {
      title: 'BIO',
      description:
        'The story of a developer who turned coffee into code and dreams into digital reality. From late-night coding sessions to early morning commits.',
    },
    {
      title: 'STACK',
      description:
        'My digital toolbox: React, TypeScript, and a sprinkle of magic. Building the web, one component at a time, with a side of clean code.',
    },
    {
      title: 'TIMELINE',
      description:
        'A journey through time: from "Hello World" to complex systems. Each commit tells a story, each project a milestone in this tech adventure.',
    },
    {
      title: 'PROJECTS',
      description:
        'Where ideas come to life. From side projects to full-scale applications, each one a unique puzzle solved with passion and precision.',
    },
    {
      title: 'GAMING',
      description:
        'When I\'m not coding, I\'m gaming. From strategy to RPGs, finding inspiration in virtual worlds and applying it to real-world problems.',
    },
    {
      title: 'SOCIALS',
      description:
        'Connect, collaborate, create. Where I share my tech journey, engage with the community, and occasionally post cat memes.',
    },
    {
      title: '@ME',
      description:
        'The human behind the code. Coffee enthusiast, problem solver, and eternal optimist. Always learning, always building.',
    },
  ]

  return (
    <Box>
      <Flex h="100dvh" mx="auto" position="relative">
        {activeColors.map((color, index) => (
          <ColorTile
            key={index}
            color={color}
            index={index}
            title={tileContent[index]?.title || `Color ${index + 1}`}
            description={
              tileContent[index]?.description ||
              'A beautiful color from our palette.'
            }
            onHover={handleHover}
            onHoverEnd={handleHoverEnd}
          />
        ))}
        <Text
          position="absolute"
          bottom="4"
          right="4"
          color="white"
          textShadow="0 0 8px rgba(0,0,0,0.7)"
          fontSize="sm"
          fontWeight="medium"
          letterSpacing="wide"
          bg="rgba(0,0,0,0.2)"
          px="3"
          py="2"
          borderRadius="full"
          backdropFilter="blur(4px)"
          pointerEvents="none"
          transition="all 0.2s ease"
          _hover={{
            bg: 'rgba(0,0,0,0.3)',
            transform: 'translateY(-2px)',
          }}
        >
          Press{' '}
          <Text as="span" fontWeight="bold">
            0-9
          </Text>{' '}
          to switch palettes • Current:{' '}
          <Text as="span" fontWeight="bold">
            {currentPalette}
          </Text>
          {' - '}
          <Text as="span" fontWeight="bold">
            {palettes[currentPalette as keyof typeof palettes].name}
          </Text>
        </Text>
      </Flex>
    </Box>
  )
}
