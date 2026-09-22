import { StyleSheet, View, Platform, ScrollView, ScrollViewProps } from 'react-native';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { ReactNode } from 'react';

interface ScreenContainerProps extends ScrollViewProps {
  children: ReactNode;
}

export default function ScreenContainer({ children, ...props }: ScreenContainerProps) {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      {...props}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Platform.select({ web: Spacing.six, default: Spacing.five }),
    paddingHorizontal: Platform.select({ web: Spacing.six, default: Spacing.four }),
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
});
