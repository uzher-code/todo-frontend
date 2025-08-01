// app/constants/colors.ts

export const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
  'brown',
] as const;

export const colorMap: Record<(typeof COLORS)[number], string> = {
  'red': 'bg-red-figma',
  'orange': 'bg-orange-figma',
  'yellow': 'bg-yellow-figma',
  'green': 'bg-green-figma',
  'blue': 'bg-blue-figma',
  'indigo': 'bg-indigo-figma',
  'purple': 'bg-purple-figma',
  'pink': 'bg-pink-figma',
  'brown': 'bg-brown-figma',
};
