import { StyleSheet, View, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { mockCalendarEvents, mockSubjects, mockTasks } from '@/data/mockData';
import { TaskStatus, TaskPriority } from '@/types';

// Utility function to format date without timezone issues
const formatDateWithoutTimezone = (dateStr: string, locale: string, options?: Intl.DateTimeFormatOptions): string => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(locale, options);
};

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
        return '#EF4444';
      case 'assignment':
        return '#F59E0B';
      case 'class':
        return '#3B82F6';
      case 'holiday':
        return '#10B981';
      case 'task':
        return '#8B5CF6';
      default:
        return '#6B7280';
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
      <ThemedView type="backgroundElement" style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('prev')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ThemedText type="default">‹</ThemedText>
          </TouchableOpacity>
          <ThemedText type="subtitle" style={styles.monthTitle}>
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
          </ThemedText>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigateMonth('next')}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ThemedText type="default">›</ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.weekDays}>
          {weekDays.map(day => (
            <ThemedText key={day} type="small" themeColor="textSecondary" style={styles.weekDay}>
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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title">Calendário</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {mockCalendarEvents.length} eventos agendados
          </ThemedText>
        </View>

        {renderCalendar()}

        <View style={styles.eventsSection}>
          <View style={styles.selectedDateHeader}>
            <ThemedText type="default" style={styles.selectedDateDay}>
              {formatDateWithoutTimezone(selectedDate, 'pt-BR', { day: 'numeric' })}
            </ThemedText>
            <ThemedText type="default" style={styles.selectedDateText}>
              {formatDateWithoutTimezone(selectedDate, 'pt-BR', {
                weekday: 'long',
                month: 'long',
              })}
            </ThemedText>
          </View>

          {selectedDateItems.length > 0 ? (
            <View style={styles.eventsList}>
              {selectedDateItems.map((item: CalendarItem) => (
                <View key={item.id} style={styles.eventItem}>
                  <View style={styles.eventTime}>
                    <ThemedText type="small" themeColor="textSecondary">
                      {formatDateWithoutTimezone(item.date, 'pt-BR')}
                    </ThemedText>
                  </View>
                  <View style={styles.eventContent}>
                    <ThemedText type="default">{item.title}</ThemedText>
                    {item.subjectId && (
                      <ThemedText type="small" themeColor="textSecondary">
                        {getSubjectName(item.subjectId)}
                      </ThemedText>
                    )}
                    <View style={styles.eventMeta}>
                      <View style={[styles.eventTypeBadge, { backgroundColor: getEventTypeColor(item.type) }]}>
                        <ThemedText type="small" style={styles.badgeText}>
                          {getEventTypeLabel(item.type)}
                        </ThemedText>
                      </View>
                      {item.type === 'task' && item.taskStatus && (
                        <ThemedText type="small" themeColor="textSecondary">
                          {getTaskStatusLabel(item.taskStatus)}
                        </ThemedText>
                      )}
                      {item.description && (
                        <ThemedText type="small" themeColor="textSecondary">
                          {item.description}
                        </ThemedText>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <ThemedText type="small" themeColor="textSecondary">
              Nenhum evento para este dia
            </ThemedText>
          )}
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
  calendarCard: {
    padding: Platform.select({ web: Spacing.three, default: Spacing.two }),
    borderRadius: Spacing.three,
    marginBottom: Spacing.four,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  navButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  monthTitle: {
    textTransform: 'capitalize',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.one,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
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
    borderRadius: Spacing.two,
    paddingVertical: Spacing.one,
  },
  dayCellSelected: {
    backgroundColor: '#3B82F6',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  eventsSection: {
    gap: Spacing.three,
  },
  selectedDateHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  selectedDateDay: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  selectedDateText: {
    textTransform: 'capitalize',
  },
  eventsList: {
    gap: Spacing.three,
  },
  eventItem: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
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
  eventTypeBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
  },
  badgeText: {
    color: '#FFFFFF',
  },
});
