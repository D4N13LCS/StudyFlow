import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import Badge from '@/components/badge';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { formatDateWithoutTimezone } from '@/utils/date';
import { mockCalendarEvents, mockSubjects, mockTasks } from '@/data/mockData';
import { TaskStatus, TaskPriority } from '@/types';

// Combined calendar item type
interface CalendarItem {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'class' | 'holiday' | 'task';
  subjectId?: string;
  description?: string;
  taskStatus?: TaskStatus;
  taskPriority?: TaskPriority;
}

// Combine tasks and calendar events
const getCombinedCalendarItems = (): CalendarItem[] => {
  const items: CalendarItem[] = [];

  // Add calendar events
  mockCalendarEvents.forEach(event => {
    items.push({
      id: event.id,
      title: event.title,
      date: event.date,
      type: event.type,
      subjectId: event.subjectId,
      description: event.description,
    });
  });

  // Add tasks as calendar items
  mockTasks.forEach(task => {
    items.push({
      id: `task-${task.id}`,
      title: task.title,
      date: task.dueDate,
      type: 'task',
      subjectId: task.subjectId,
      description: task.description,
      taskStatus: task.status,
      taskPriority: task.priority,
    });
  });

  return items;
};

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Initialize selectedDate to first event date or first day of month
  useEffect(() => {
    const monthStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    const combinedItems = getCombinedCalendarItems();
    const itemsInMonth = combinedItems.filter((e: CalendarItem) => e.date.startsWith(monthStr));
    if (itemsInMonth.length > 0) {
      setSelectedDate(itemsInMonth[0].date);
    } else {
      setSelectedDate(`${monthStr}-01`);
    }
  }, []);

  const getSubjectName = (subjectId: string): string => {
    const subject = mockSubjects.find(s => s.id === subjectId);
    return subject?.name || 'Disciplina não encontrada';
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return Colors.light.error;
      case 'assignment':
        return Colors.light.warning;
      case 'class':
        return Colors.light.primary;
      case 'holiday':
        return Colors.light.success;
      case 'task':
        return Colors.light.secondary;
      default:
        return Colors.light.textSecondary;
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'exam':
        return 'Prova';
      case 'assignment':
        return 'Entrega';
      case 'class':
        return 'Aula';
      case 'holiday':
        return 'Feriado';
      case 'task':
        return 'Tarefa';
      default:
        return type;
    }
  };

  const getTaskStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Progresso';
      case 'completed':
        return 'Concluída';
    }
  };

  // Get items for selected date - single source of truth
  const selectedDateItems = useMemo(() => {
    return getCombinedCalendarItems().filter((item: CalendarItem) => item.date === selectedDate);
  }, [selectedDate]);

  // Get dates in current month that have items
  const datesWithItemsInMonth = useMemo(() => {
    const monthStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    return new Set(getCombinedCalendarItems().filter((item: CalendarItem) => item.date.startsWith(monthStr)).map((item: CalendarItem) => item.date));
  }, [currentMonth]);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentMonth);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentMonth(newDate);

    // Update selectedDate to first event in new month or first day
    const monthStr = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}`;
    const eventsInMonth = mockCalendarEvents.filter(e => e.date.startsWith(monthStr));
    if (eventsInMonth.length > 0) {
      setSelectedDate(eventsInMonth[0].date);
    } else {
      setSelectedDate(`${monthStr}-01`);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

    const days = [];
    // Empty cells for days before first day of month
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvents = datesWithItemsInMonth.has(dateStr);
      const isSelected = dateStr === selectedDate;

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isSelected && styles.dayCellSelected,
          ]}
          onPress={() => setSelectedDate(dateStr)}>
          <ThemedText
            type="small"
            style={isSelected && styles.dayTextSelected}>
            {day}
          </ThemedText>
          {hasEvents && <View style={[styles.eventDot, { backgroundColor: getEventTypeColor('class') }]} />}
        </TouchableOpacity>
      );
    }

    return (
      <ThemedView type="surface" style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('prev')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ThemedText style={styles.navIcon}>‹</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.monthTitle}>
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
          </ThemedText>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('next')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ThemedText style={styles.navIcon}>›</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.weekDays}>
          {weekDays.map(day => (
            <ThemedText key={day} themeColor="textSecondary" style={styles.weekDay}>
              {day}
            </ThemedText>
          ))}
        </View>
        <View style={styles.daysGrid}>{days}</View>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScreenContainer>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>Calendário</ThemedText>
          <ThemedText type="bodySecondary" themeColor="textSecondary">
            {mockCalendarEvents.length} eventos agendados
          </ThemedText>
        </View>

        {renderCalendar()}

        <View style={styles.eventsSection}>
          <View style={styles.selectedDateHeader}>
            <ThemedText style={styles.selectedDateDay}>
              {formatDateWithoutTimezone(selectedDate, 'pt-BR', { day: 'numeric' })}
            </ThemedText>
            <ThemedText style={styles.selectedDateText}>
              {formatDateWithoutTimezone(selectedDate, 'pt-BR', {
                weekday: 'long',
                month: 'long',
              })}
            </ThemedText>
          </View>

          {selectedDateItems.length > 0 ? (
            <View style={styles.eventsList}>
              {selectedDateItems.map((item: CalendarItem) => (
                <ThemedView key={item.id} type="surface" style={styles.eventItem}>
                  <View style={styles.eventTime}>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {formatDateWithoutTimezone(item.date, 'pt-BR')}
                    </ThemedText>
                  </View>
                  <View style={styles.eventContent}>
                    <ThemedText type="cardTitle">{item.title}</ThemedText>
                    {item.subjectId && (
                      <ThemedText type="caption" themeColor="textSecondary">
                        {getSubjectName(item.subjectId)}
                      </ThemedText>
                    )}
                    <View style={styles.eventMeta}>
                      <Badge color={getEventTypeColor(item.type)}>
                        {getEventTypeLabel(item.type)}
                      </Badge>
                      {item.type === 'task' && item.taskStatus && (
                        <ThemedText type="caption" themeColor="textSecondary">
                          {getTaskStatusLabel(item.taskStatus)}
                        </ThemedText>
                      )}
                    </View>
                  </View>
                </ThemedView>
              ))}
            </View>
          ) : (
            <ThemedText type="caption" themeColor="textSecondary">
              Nenhum evento para este dia
            </ThemedText>
          )}
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
  calendarCard: {
    padding: Platform.select({ web: Spacing.five, default: Spacing.four }),
    borderRadius: Radius.lg,
    marginBottom: Spacing.five,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  navButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    fontWeight: '300',
  },
  monthTitle: {
    ...Typography.sectionTitle,
    textTransform: 'capitalize',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.two,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    ...Typography.label,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Radius.md,
    paddingVertical: Spacing.one,
  },
  dayCellSelected: {
    backgroundColor: Colors.light.primary,
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  eventsSection: {
    gap: Spacing.four,
  },
  selectedDateHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  selectedDateDay: {
    ...Typography.display,
    fontSize: 32,
    lineHeight: 40,
  },
  selectedDateText: {
    ...Typography.body,
    textTransform: 'capitalize',
  },
  eventsList: {
    gap: Spacing.three,
  },
  eventItem: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingHorizontal: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Radius.lg,
  },
  eventTime: {
    width: 80,
  },
  eventContent: {
    flex: 1,
    gap: Spacing.one,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
});
