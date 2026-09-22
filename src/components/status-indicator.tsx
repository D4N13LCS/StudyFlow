import { StyleSheet, View, ViewStyle } from 'react-native';
import { Radius } from '@/constants/theme';

interface StatusIndicatorProps {
  color: string;
  style?: ViewStyle;
}

export default function StatusIndicator({ color, style }: StatusIndicatorProps) {
  return <View style={[styles.indicator, { backgroundColor: color, borderRadius: Radius.sm / 2 }, style]} />;
}

const styles = StyleSheet.create({
  indicator: {
    width: 4,
    height: 40,
  },
});
