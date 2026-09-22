import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Colors, Fonts, ThemeColor, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code' | 'label' | 'bodySecondary' | 'caption' | 'sectionTitle' | 'cardTitle';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && Typography.body,
        type === 'title' && Typography.display,
        type === 'small' && Typography.bodySecondary,
        type === 'smallBold' && Typography.label,
        type === 'subtitle' && Typography.pageTitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && { ...styles.linkPrimary, color: theme.primary },
        type === 'code' && styles.code,
        type === 'label' && Typography.label,
        type === 'bodySecondary' && Typography.bodySecondary,
        type === 'caption' && Typography.caption,
        type === 'sectionTitle' && Typography.sectionTitle,
        type === 'cardTitle' && Typography.cardTitle,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
