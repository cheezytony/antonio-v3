import { Box, Flex, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { generateColorVariants } from '../utils/colors'

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
  '#FF71CE'  // Neon Rose
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
  '9': { name: 'Cyberpunk', colors: cyberpunkColors }
}

export function Tiles() {
  const [activeColors, setActiveColors] = useState(palettes['1'].colors)
  const [currentPalette, setCurrentPalette] = useState('1')

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key
      if (key in palettes) {
        setCurrentPalette(key)
        setActiveColors(palettes[key as keyof typeof palettes].colors)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const handleHover = (index: number) => {
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
    setActiveColors(palettes[currentPalette as keyof typeof palettes].colors)
  }

  return (
    <Box>
      <Flex h="100dvh" mx="auto" position="relative">
        {activeColors.map((color, index) => (
          <Box
            key={index}
            h="full"
            flex="1"
            bg={color}
            transition="all 0.3s ease"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={handleHoverEnd}
            cursor="pointer"
            _hover={{
              flex: '2',
            }}
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
