const tintColorLight = '#0D7377';
const tintColorDark = '#14A3A8';

export const SeverityColors = {
  none: '#2A9D8F',
  mild: '#E9C46A',
  moderate: '#F4A261',
  severe: '#E76F51',
} as const;

export const TOOL_KIND_COLORS = {
  classification: { text: '#0D7377', background: '#0D73771A' },
  score: { text: '#3D5A80', background: '#3D5A801A' },
  prediction: { text: '#6B4C9A', background: '#6B4C9A1A' },
  algorithm: { text: '#C45C42', background: '#E07A5F1A' },
} as const;

export default {
  light: {
    text: '#1A2A2B',
    textSecondary: '#5A6E70',
    background: '#F4F8F8',
    surface: '#FFFFFF',
    border: '#D8E4E5',
    tint: tintColorLight,
    accent: '#E07A5F',
    tabIconDefault: '#8AA0A2',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#E8F1F1',
    textSecondary: '#9BB0B2',
    background: '#0F1718',
    surface: '#1A2426',
    border: '#2D3A3C',
    tint: tintColorDark,
    accent: '#E07A5F',
    tabIconDefault: '#6A7E80',
    tabIconSelected: tintColorDark,
  },
};
