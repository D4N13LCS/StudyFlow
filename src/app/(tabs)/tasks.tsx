import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import Badge from '@/components/badge';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { formatDateWithoutTimezone } from '@/utils/date';
import { mockTasks, mockSubjects } from '@/data/mockData';
import { TaskStatus, TaskPriority } from '@/types';

export default function TasksScreen() {
  const router = useRouter();

  const getSubjectName = (subjectId: string) => {
    const subject = mockSubjects.find(s => s.id === subjectId);
    return subject?.name || 'Disciplina não encontrada';
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return Colors.light.warning;
      case 'in_progress':
        return Colors.light.primary;
      case 'completed':
        return Colors.light.success;
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return Colors.light.error;
      case 'medium':
        return Colors.light.warning;
      case 'low':
        return Colors.light.success;
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Progresso';
      case 'completed':
        return 'Concluída';
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenContainer>
      
        <View style={styles.header}>
          <ThemedText style={styles.title}>Tarefas</ThemedText>
          <ThemedText type="bodySecondary" themeColor="textSecondary">
            {mockTasks.length} tarefas cadastradas
          </ThemedText>
        </View>

       
        <View style={styles.tasksList}>
          {mockTasks.map(task => (
            <TouchableOpacity
              key={task.id}
              onPress={() => router.push(`/task/${task.id}` as any)}
              activeOpacity={0.7}>
              <ThemedView type="surface" style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskTitleContainer}>
                    <ThemedText type="cardTitle" style={styles.taskTitle}>{task.title}</ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {getSubjectName(task.subjectId)}
                    </ThemedText>
                  </View>
                  <Badge color={getPriorityColor(task.priority)}>
                    {getPriorityLabel(task.priority)}
                  </Badge>
                </View>
                <View style={styles.taskDetails}>
                  <View style={styles.detailRow}>
                    <Badge color={getStatusColor(task.status)}>
                      {getStatusLabel(task.status)}
                    </Badge>
                    <ThemedText type="caption" themeColor="textSecondary" style={styles.dueDate}>
                      Vencimento: {formatDateWithoutTimezone(task.dueDate, 'pt-BR')}
                    </ThemedText>
                  </View>
                </View>
              </ThemedView>
            </TouchableOpacity>
          ))}
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
    paddingTop: Platform.select({ web: 0, default: Spacing.two }),
    paddingBottom: Spacing.five,
  },
  title: {
    ...Typography.pageTitle,
    marginBottom: Spacing.one,
  },
  tasksList: {
    gap: Spacing.three,
  },
  taskCard: {
    padding: Platform.select({ web: Spacing.five, default: Spacing.four }),
    borderRadius: Radius.lg,
    gap: Spacing.three,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  taskTitleContainer: {
    flex: 1,
  },
  taskTitle: {
    marginBottom: Spacing.half,
  },
  taskDetails: {
    gap: Spacing.two,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  dueDate: {
    flex: 1,
    minWidth: 0,
  },
});
