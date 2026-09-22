import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  color?: string;
  style?: ViewStyle;
}

export default function Badge({ children, color = '#3B82F6', style }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]}>
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
    borderRadius: Spacing.two,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#FFFFFF',
  },
});
