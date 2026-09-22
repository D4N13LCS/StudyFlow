import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import ScreenHeader from '@/components/screen-header';
import StatusIndicator from '@/components/status-indicator';
import Badge from '@/components/badge';
import { formatDateWithoutTimezone } from '@/utils/date';
import { Spacing } from '@/constants/theme';
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
        return '#F59E0B';
      case 'in_progress':
        return '#3B82F6';
      case 'completed':
        return '#10B981';
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
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
        <ScreenHeader
          title="Tarefas"
          subtitle={`${mockTasks.length} tarefas cadastradas`}
        />

        <View style={styles.tasksList}>
          {mockTasks.map(task => (
            <TouchableOpacity
              key={task.id}
              onPress={() => router.push(`/task/${task.id}` as any)}
              activeOpacity={0.7}>
              <ThemedView type="backgroundElement" style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskTitleContainer}>
                    <ThemedText type="default">{task.title}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {getSubjectName(task.subjectId)}
                    </ThemedText>
                  </View>
                  <StatusIndicator color={getStatusColor(task.status)} />
                </View>
                <View style={styles.taskDetails}>
                  <View style={styles.detailRow}>
                    <Badge color={getPriorityColor(task.priority)}>
                      {getPriorityLabel(task.priority)}
                    </Badge>
                    <ThemedText type="small" themeColor="textSecondary">
                      {getStatusLabel(task.status)}
                    </ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary">
                    Data: {formatDateWithoutTimezone(task.dueDate, 'pt-BR')}
                  </ThemedText>
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
  tasksList: {
    gap: Spacing.three,
  },
  taskCard: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two,
    gap: Spacing.three,
  },
  taskTitleContainer: {
    flex: 1,
  },
  taskDetails: {
    gap: Spacing.one,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
});
