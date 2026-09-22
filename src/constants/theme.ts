/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Primary colors (Blue/Purple theme)
    primary: '#4F46E5',
    primaryLight: '#6366F1',
    secondary: '#7C3AED',
    
    // Background and surface
    background: '#F8FAFC',
    surface: '#FFFFFF',
    backgroundElement: '#F1F5F9',
    backgroundSelected: '#E2E8F0',
    
    // Text
    text: '#111827',
    textSecondary: '#64748B',
    
    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  dark: {
    // Primary colors (Blue/Purple theme - adjusted for dark mode)
    primary: '#6366F1',
    primaryLight: '#818CF8',
    secondary: '#8B5CF6',
    
    // Background and surface
    background: '#0F172A',
    surface: '#1E293B',
    backgroundElement: '#334155',
    backgroundSelected: '#475569',
    
    // Text
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    
    // Semantic colors (adjusted for dark mode)
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80, web: 80 }) ?? 0;
export const MaxContentWidth = Platform.select({ web: 1200, default: 800 }) ?? 800;
