import {
  StyleSheet,
  View,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import {
  BottomTabInset,
  MaxContentWidth,
  Radius,
  Spacing,
  Typography,
} from '@/constants/theme';

import { mockTasks, mockSubjects } from '@/data/mockData';
import { TaskStatus, TaskPriority } from '@/types';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const taskId = Array.isArray(id) ? id[0] : id;
  const task = mockTasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <ThemedText type="title">
              Tarefa não encontrada
            </ThemedText>

            <ThemedText
              type="small"
              themeColor="textSecondary"
            >
              A tarefa solicitada não existe.
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    );
  }

  const subject = mockSubjects.find(
    (s) => s.id === task.subjectId
  );

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

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');

    return `${day}/${month}/${year}`;
  };

  const handleEdit = () => {
    console.log('Editar tarefa:', task.id);
  };

  const handleDelete = () => {
    console.log('Excluir tarefa:', task.id);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <ThemedText type="title">
            Detalhes da Tarefa
          </ThemedText>

          <ThemedText
            type="small"
            themeColor="textSecondary"
          >
            Visualização completa da atividade.
          </ThemedText>
        </View>

        <ThemedView
          type="backgroundElement"
          style={styles.card}
        >
          {/* Título e disciplina */}
          <View style={styles.titleSection}>
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor: getStatusColor(task.status),
                },
              ]}
            />

            <View style={styles.titleContent}>
              <ThemedText type="sectionTitle">
                {task.title}
              </ThemedText>

              <ThemedText
                type="small"
                themeColor="textSecondary"
                numberOfLines={2}
              >
                {subject?.name || 'Disciplina não encontrada'}
              </ThemedText>
            </View>
          </View>

          {/* Status e prioridade */}
          <View style={styles.badgesRow}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: getStatusColor(task.status),
                },
              ]}
            >
              <ThemedText
                type="caption"
                style={styles.badgeText}
              >
                {getStatusLabel(task.status)}
              </ThemedText>
            </View>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: getPriorityColor(task.priority),
                },
              ]}
            >
              <ThemedText
                type="caption"
                style={styles.badgeText}
              >
                Prioridade {getPriorityLabel(task.priority)}
              </ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Descrição */}
          <View style={styles.section}>
            <ThemedText
              type="label"
              themeColor="textSecondary"
              style={styles.sectionLabel}
            >
              Descrição
            </ThemedText>

            <ThemedText type="default">
              {task.description}
            </ThemedText>
          </View>

          <View style={styles.divider} />

          {/* Datas */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <ThemedText
                type="caption"
                themeColor="textSecondary"
              >
                Data de Vencimento
              </ThemedText>

              <ThemedText type="default">
                {formatDate(task.dueDate)}
              </ThemedText>
            </View>

            <View style={styles.detailItem}>
              <ThemedText
                type="caption"
                themeColor="textSecondary"
              >
                Data de Criação
              </ThemedText>

              <ThemedText type="default">
                {formatDate(task.createdAt)}
              </ThemedText>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Ações */}
          <View style={styles.actions}>
            <Pressable
              onPress={handleEdit}
              style={({ pressed }) => [
                styles.actionButton,
                styles.editButton,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <ThemedText
                type="label"
                style={styles.editButtonText}
              >
                Editar
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={handleDelete}
              style={({ pressed }) => [
                styles.actionButton,
                styles.deleteButton,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <ThemedText
                type="label"
                style={styles.deleteButtonText}
              >
                Excluir
              </ThemedText>
            </Pressable>
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
    paddingTop: Platform.select({
      web: Spacing.six,
      default: Spacing.five,
    }),

    paddingHorizontal: Platform.select({
      web: Spacing.six,
      default: Spacing.four,
    }),

    paddingBottom: BottomTabInset + Spacing.four,

    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },

  header: {
    paddingBottom: Spacing.four,
    gap: Spacing.one,
  },

  card: {
    width: '100%',

    padding: Platform.select({
      web: Spacing.five,
      default: Spacing.four,
    }),

    borderRadius: Radius.lg,
    gap: Spacing.four,
  },

  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },

  statusIndicator: {
    width: 5,
    minHeight: 48,
    alignSelf: 'stretch',
    borderRadius: Radius.full,
  },

  titleContent: {
    flex: 1,
    gap: Spacing.one,
  },

  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },

  badge: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
  },

  badgeText: {
    color: '#FFFFFF',
  },

  divider: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E5E7EB',
  },

  section: {
    gap: Spacing.two,
  },

  sectionLabel: {
    textTransform: 'uppercase',
  },

  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.four,
  },

  detailItem: {
    flex: 1,
    minWidth: 140,
    gap: Spacing.one,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },

  actionButton: {
    minHeight: 44,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  editButton: {
    minWidth: 100,
    borderColor: '#4F46E5',
  },

  deleteButton: {
    minWidth: 100,
    borderColor: '#EF4444',
  },

  editButtonText: {
    color: '#4F46E5',
    fontWeight: Typography.label.fontWeight,
  },

  deleteButtonText: {
    color: '#EF4444',
    fontWeight: Typography.label.fontWeight,
  },
});