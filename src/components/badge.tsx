import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  style?: ViewStyle;
}

export default function Badge({ children, color, style }: BadgeProps) {
  const theme = useTheme();
  const badgeColor = color || theme.primary;

  return (
    <View style={[styles.badge, { backgroundColor: badgeColor, borderRadius: Radius.sm }, style]}>
      <ThemedText type="small" style={styles.badgeText}>
        {children}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
  },
});
