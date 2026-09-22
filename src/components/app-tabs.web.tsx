import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import {
  Colors,
  MaxContentWidth,
  Radius,
  Spacing,
} from '@/constants/theme';

type TabIconName =
  | 'house'
  | 'book'
  | 'checklist'
  | 'calendar'
  | 'person';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />

      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon="house">
              Dashboard
            </TabButton>
          </TabTrigger>

          <TabTrigger name="subjects" href="/subjects" asChild>
            <TabButton icon="book">
              Disciplinas
            </TabButton>
          </TabTrigger>

          <TabTrigger name="tasks" href="/tasks" asChild>
            <TabButton icon="checklist">
              Tarefas
            </TabButton>
          </TabTrigger>

          <TabTrigger name="calendar" href="/calendar" asChild>
            <TabButton icon="calendar">
              Calendário
            </TabButton>
          </TabTrigger>

          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="person">
              Perfil
            </TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & {
  icon: TabIconName;
}) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Pressable
      {...props}
      style={({ pressed, hovered }) => [
        styles.tabButton,
        pressed && styles.pressed,
        hovered && !isFocused && styles.hovered,
        isFocused && styles.focused,
      ]}
    >
      <SymbolView
        name={{
          ios: icon,
          web: icon,
        }}
        tintColor={isFocused ? colors.primary : colors.textSecondary}
        size={15}
      />

      <ThemedText
        type="label"
        style={[
          styles.tabButtonText,
          {
            color: isFocused
              ? colors.primary
              : colors.textSecondary,
          },
        ]}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView
        type="surface"
        style={styles.innerContainer}
      >
        <ThemedText
          type="label"
          style={styles.brandText}
        >
          StudyFlow
        </ThemedText>

        {props.children}

        <ExternalLink
          href="https://docs.expo.dev"
          asChild
        >
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">
              Docs
            </ThemedText>

            <SymbolView
              tintColor={colors.textSecondary}
              name={{
                ios: 'arrow.up.right.square',
                web: 'link',
              }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Radius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },

  brandText: {
    marginRight: 'auto',
    color: '#4F46E5',
  },

  tabButton: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },

  tabButtonText: {
    color: Colors.light.textSecondary,
  },

  pressed: {
    opacity: 0.7,
  },

  hovered: {
    backgroundColor: Colors.light.backgroundSelected,
  },

  focused: {
    backgroundColor: Colors.light.backgroundSelected,
  },

  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
  },
});