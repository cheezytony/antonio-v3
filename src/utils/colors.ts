/**
 * Converts a hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) throw new Error('Invalid hex color')
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  }
}

/**
 * Converts RGB values to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

/**
 * Generates 7 color variants from a base color
 * @param baseColor - The original hex color
 * @param originalIndex - Where to place the original color in the array (0-6)
 * @param direction - 'lighter' or 'darker' to determine the direction of color variation
 * @returns Array of 7 color variants
 */
export function generateColorVariants(
  baseColor: string, 
  originalIndex: number,
  direction: 'lighter' | 'darker'
): Array<string> {
  const rgb = hexToRgb(baseColor)
  const variants: Array<string> = []
  
  // Generate variants based on distance from original index
  for (let i = 0; i < 7; i++) {
    if (i === originalIndex) {
      variants.push(baseColor)
      continue
    }
    
    // Calculate how far this variant is from the original
    const distance = Math.abs(i - originalIndex)
    // Adjust brightness based on distance (further = more change)
    const brightnessAdjust = distance * 0.15 // 15% change per step
    
    // For lighter direction, all variants should be lighter than original
    // For darker direction, all variants should be darker than original
    const shouldLighten = direction === 'lighter'
    
    const newRgb = {
      r: Math.min(255, Math.max(0, rgb.r * (shouldLighten ? 1 + brightnessAdjust : 1 - brightnessAdjust))),
      g: Math.min(255, Math.max(0, rgb.g * (shouldLighten ? 1 + brightnessAdjust : 1 - brightnessAdjust))),
      b: Math.min(255, Math.max(0, rgb.b * (shouldLighten ? 1 + brightnessAdjust : 1 - brightnessAdjust)))
    }
    
    variants.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }
  
  return variants
}
