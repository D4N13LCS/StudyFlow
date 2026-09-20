import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { mockTasks, mockSubjects, mockCalendarEvents, mockUserProfile } from '@/data/mockData';
import { TaskStatus } from '@/types';

export default function DashboardScreen() {
  const router = useRouter();

  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'in_progress').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;

  const upcomingTasks = mockTasks
    .filter(t => t.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  const upcomingEvents = mockCalendarEvents
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title">Olá, {mockUserProfile.name.split(' ')[0]}!</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {mockUserProfile.course} - {mockUserProfile.semester}º Semestre
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <ThemedView type="backgroundElement" style={styles.statCard}>
            <ThemedText type="subtitle">{pendingTasks}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">Pendentes</ThemedText>
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.statCard}>
            <ThemedText type="subtitle">{inProgressTasks}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">Em Progresso</ThemedText>
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.statCard}>
            <ThemedText type="subtitle">{completedTasks}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">Concluídas</ThemedText>
          </ThemedView>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Próximas Tarefas</ThemedText>
          <View style={styles.sectionContent}>
            {upcomingTasks.map(task => (
              <ThemedView key={task.id} type="backgroundElement" style={styles.taskItem}>
                <ThemedText type="default">{task.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                </ThemedText>
              </ThemedView>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Próximos Eventos</ThemedText>
          <View style={styles.sectionContent}>
            {upcomingEvents.map(event => (
              <ThemedView key={event.id} type="backgroundElement" style={styles.eventItem}>
                <ThemedText type="default">{event.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {new Date(event.date).toLocaleDateString('pt-BR')}
                </ThemedText>
              </ThemedView>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Disciplinas</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {mockSubjects.length} disciplinas matriculadas
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Platform.select({ web: Spacing.six, default: Spacing.four }),
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    paddingTop: Platform.select({ web: Spacing.six, default: Spacing.four }),
    paddingBottom: Spacing.four,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  statCard: {
    flex: 1,
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  section: {
    marginBottom: Spacing.four,
  },
  sectionTitle: {
    marginBottom: Spacing.two,
  },
  sectionContent: {
    gap: Spacing.two,
  },
  taskItem: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
  },
  eventItem: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
  },
});
