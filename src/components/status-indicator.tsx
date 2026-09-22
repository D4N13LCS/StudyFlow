import { StyleSheet, View, ViewStyle } from 'react-native';

interface StatusIndicatorProps {
  color: string;
  style?: ViewStyle;
}

export default function StatusIndicator({ color, style }: StatusIndicatorProps) {
  return <View style={[styles.indicator, { backgroundColor: color }, style]} />;
}

const styles = StyleSheet.create({
  indicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
});
