import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import Badge from '@/components/badge';
import { formatDateWithoutTimezone } from '@/utils/date';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { mockTasks, mockSubjects, mockCalendarEvents, mockUserProfile } from '@/data/mockData';

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return Colors.light.error;
      case 'medium':
        return Colors.light.warning;
      case 'low':
        return Colors.light.success;
      default:
        return Colors.light.info;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return '-';
    }
  };

  const getSubjectName = (subjectId: string) => {
    const subject = mockSubjects.find(s => s.id === subjectId);
    return subject?.name || 'Disciplina não encontrada';
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenContainer>

        <View style={styles.header}>
          <ThemedText style={styles.greeting}>Olá, {mockUserProfile.name.split(' ')[0]}!</ThemedText>
          <ThemedText type="bodySecondary" themeColor="textSecondary" style={styles.subtitle}>
            {mockUserProfile.course} · {mockUserProfile.semester}º semestre
          </ThemedText>
        </View>

       
        <View style={styles.statsContainer}>
          <ThemedView type="surface" style={styles.statCard}>
            <ThemedText style={[styles.statValue, { color: Colors.light.primary }]}>{pendingTasks}</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">Pendentes</ThemedText>
          </ThemedView>
          <ThemedView type="surface" style={styles.statCard}>
            <ThemedText style={[styles.statValue, { color: Colors.light.secondary }]}>{inProgressTasks}</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">Em Progresso</ThemedText>
          </ThemedView>
          <ThemedView type="surface" style={styles.statCard}>
            <ThemedText style={[styles.statValue, { color: Colors.light.success }]}>{completedTasks}</ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">Concluídas</ThemedText>
          </ThemedView>
        </View>


        <View style={styles.contentGrid}>
     
          <View style={styles.contentSection}>
            <ThemedText type="sectionTitle" style={styles.sectionTitle}>Próximas Tarefas</ThemedText>
            <View style={styles.sectionContent}>
              {upcomingTasks.map(task => (
                <TouchableOpacity
                  key={task.id}
                  onPress={() => router.push(`/task/${task.id}` as any)}
                  activeOpacity={0.7}>
                  <ThemedView type="surface" style={styles.taskItem}>
                    <View style={styles.taskHeader}>
                      <ThemedText type="cardTitle" style={styles.taskTitle}>{task.title}</ThemedText>
                      <Badge color={getPriorityColor(task.priority)}>
                        {getPriorityLabel(task.priority)}
                      </Badge>
                    </View>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {getSubjectName(task.subjectId)}
                    </ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {formatDateWithoutTimezone(task.dueDate, 'pt-BR')}
                    </ThemedText>
                  </ThemedView>
                </TouchableOpacity>
              ))}
            </View>
          </View>

  
          <View style={styles.contentSection}>
            <ThemedText type="sectionTitle" style={styles.sectionTitle}>Próximos Eventos</ThemedText>
            <View style={styles.sectionContent}>
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <ThemedView key={event.id} type="surface" style={styles.eventItem}>
                    <ThemedText type="cardTitle" style={styles.eventTitle}>{event.title}</ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {formatDateWithoutTimezone(event.date, 'pt-BR')}
                    </ThemedText>
                  </ThemedView>
                ))
              ) : (
                <ThemedText type="caption" themeColor="textSecondary">
                  Não há eventos próximos.
                </ThemedText>
              )}
            </View>
          </View>
        </View>

        
        <View style={styles.section}>
          <ThemedText type="sectionTitle" style={styles.sectionTitle}>Disciplinas</ThemedText>
          <View style={styles.subjectsGrid}>
            {mockSubjects.slice(0, 4).map(subject => (
              <ThemedView key={subject.id} type="surface" style={styles.subjectCard}>
                <View style={[styles.subjectColor, { backgroundColor: subject.color }]} />
                <ThemedText type="cardTitle" style={styles.subjectName}>{subject.name}</ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">{subject.code}</ThemedText>
              </ThemedView>
            ))}
          </View>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.subjectsCount}>
            {mockSubjects.length} disciplinas matriculadas
          </ThemedText>
        </View>
      </ScreenContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: Spacing.five,
  },
  greeting: {
    ...Typography.pageTitle,
    marginBottom: Spacing.one,
  },
  subtitle: {
    marginBottom: Spacing.one,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  statCard: {
    flex: 1,
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Radius.lg,
    alignItems: 'center',
    gap: Spacing.one,
  },
  statValue: {
    ...Typography.display,
    fontSize: 32,
    lineHeight: 40,
  },
  contentGrid: {
    flexDirection: Platform.select({ web: 'row' as const, default: 'column' as const }),
    gap: Spacing.four,
    marginBottom: Spacing.five,
  },
  contentSection: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.five,
  },
  sectionTitle: {
    marginBottom: Spacing.three,
  },
  sectionContent: {
    gap: Spacing.two,
  },
  taskItem: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Radius.lg,
    gap: Spacing.one,
    minHeight: Platform.select({ web: 140, default: undefined }),
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.one,
  },
  taskTitle: {
    flex: 1,
    marginRight: Spacing.two,
  },
  eventItem: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Radius.lg,
    gap: Spacing.one,
    minHeight: Platform.select({ web: 140, default: undefined }),
    justifyContent: 'center',
  },
  eventTitle: {
    marginBottom: Spacing.one,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  subjectCard: {
    flex: 1,
    minWidth: Platform.select({ web: 200, default: 140 }),
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Radius.lg,
    gap: Spacing.one,
  },
  subjectColor: {
    width: 4,
    height: 4,
    borderRadius: 2,
    alignSelf: 'flex-start',
    marginBottom: Spacing.one,
  },
  subjectName: {
    marginBottom: Spacing.half,
  },
  subjectsCount: {
    marginTop: Spacing.two,
  },
});
