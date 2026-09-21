import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { mockTasks, mockSubjects } from '@/data/mockData';
import { TaskStatus, TaskPriority } from '@/types';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // Handle case where id might be an array
  const taskId = Array.isArray(id) ? id[0] : id;
  const task = mockTasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <ThemedText type="title">Tarefa não encontrada</ThemedText>
          </View>
          <ThemedText type="default">A tarefa solicitada não existe.</ThemedText>
        </ScrollView>
      </ThemedView>
    );
  }

  const subject = mockSubjects.find(s => s.id === task.subjectId);

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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title">Detalhes da Tarefa</ThemedText>
        </View>

        <ThemedView type="backgroundElement" style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(task.status) }]} />
            <View style={styles.cardTitleContainer}>
              <ThemedText type="default">{task.title}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {subject?.name || 'Disciplina não encontrada'}
              </ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.sectionLabel}>Descrição</ThemedText>
            <ThemedText type="default">{task.description}</ThemedText>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <ThemedText type="small" themeColor="textSecondary">Status</ThemedText>
              <View style={[styles.badge, { backgroundColor: getStatusColor(task.status) }]}>
                <ThemedText type="small" style={styles.badgeText}>
                  {getStatusLabel(task.status)}
                </ThemedText>
              </View>
            </View>

            <View style={styles.detailItem}>
              <ThemedText type="small" themeColor="textSecondary">Prioridade</ThemedText>
              <View style={[styles.badge, { backgroundColor: getPriorityColor(task.priority) }]}>
                <ThemedText type="small" style={styles.badgeText}>
                  {getPriorityLabel(task.priority)}
                </ThemedText>
              </View>
            </View>

            <View style={styles.detailItem}>
              <ThemedText type="small" themeColor="textSecondary">Data de Vencimento</ThemedText>
              <ThemedText type="default">
                {new Date(task.dueDate).toLocaleDateString('pt-BR')}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <ThemedText type="small" themeColor="textSecondary">Data de Criação</ThemedText>
              <ThemedText type="default">
                {new Date(task.createdAt).toLocaleDateString('pt-BR')}
              </ThemedText>
            </View>
          </View>
        </ThemedView>
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
    paddingTop: Platform.select({ web: Spacing.six, default: Spacing.five }),
    paddingHorizontal: Platform.select({ web: Spacing.six, default: Spacing.four }),
    paddingBottom: BottomTabInset + Spacing.four,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    paddingBottom: Spacing.four,
  },
  card: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.four,
    gap: Spacing.three,
  },
  cardTitleContainer: {
    flex: 1,
  },
  statusIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  section: {
    marginBottom: Spacing.four,
  },
  sectionLabel: {
    marginBottom: Spacing.one,
  },
  detailsGrid: {
    gap: Spacing.three,
  },
  detailItem: {
    gap: Spacing.one,
  },
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
