import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { ReactNode } from 'react';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
}

export default function ScreenHeader({ title, subtitle, rightElement }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
        {subtitle && (
          <ThemedText type="small" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        )}
      </View>
      {rightElement}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: Spacing.four,
  },
  titleContainer: {
    flex: 1,
  },
});
