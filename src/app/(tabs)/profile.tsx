import { StyleSheet, View, Pressable, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import StatusIndicator from '@/components/status-indicator';
import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { mockUserProfile, mockSubjects, mockTasks, mockCalendarEvents } from '@/data/mockData';

const COMPACT_BREAKPOINT = 768;
const NARROW_BREAKPOINT = 420;
const WIDE_BREAKPOINT = 1100;

export default function ProfileScreen() {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const isCompact = width < COMPACT_BREAKPOINT;
  const isNarrow = width < NARROW_BREAKPOINT;
  const isWide = width >= WIDE_BREAKPOINT;
  const summaryVariant = isNarrow ? 'full' : isWide ? 'quarter' : 'half';
  const subjectLayout = isCompact
    ? styles.subjectCardCompact
    : isWide
      ? styles.subjectCardWide
      : styles.subjectCardHalf;

  const totalSubjects = mockSubjects.length;
  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const totalEvents = mockCalendarEvents.length;

  return (
    <ThemedView style={styles.container}>
      <ScreenContainer>
        <View style={styles.header}>
          <ThemedText style={styles.pageTitle}>Perfil</ThemedText>
          <ThemedText type="bodySecondary" themeColor="textSecondary">
            Informações do estudante e resumo acadêmico.
          </ThemedText>
        </View>

        <ThemedView type="surface" style={styles.mainProfileCard}>
          <View style={styles.profileTop}>
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <ThemedText style={styles.avatarInitial}>
                {mockUserProfile.name.charAt(0)}
              </ThemedText>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="sectionTitle">{mockUserProfile.name}</ThemedText>
              <ThemedText type="bodySecondary" themeColor="textSecondary">
                {mockUserProfile.email}
              </ThemedText>
              <ThemedText type="caption" themeColor="textSecondary">
                {mockUserProfile.course} • {mockUserProfile.semester}º semestre
              </ThemedText>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Editar perfil"
            style={({ pressed }) => [
              styles.editButton,
              { borderColor: theme.primary, opacity: pressed ? 0.7 : 1 },
              isCompact ? styles.editButtonCompact : styles.editButtonWide,
            ]}>
            <ThemedText type="label" style={{ color: theme.primary }}>
              Editar perfil
            </ThemedText>
          </Pressable>
        </ThemedView>

        <View style={styles.section}>
          <ThemedText type="sectionTitle" style={styles.sectionTitle}>
            Resumo rápido
          </ThemedText>
          <View style={styles.summaryGrid}>
            <SummaryItem label="Nome" value={mockUserProfile.name} variant={summaryVariant} />
            <SummaryItem label="E-mail" value={mockUserProfile.email} variant={summaryVariant} />
            <SummaryItem label="Curso" value={mockUserProfile.course} variant={summaryVariant} />
            <SummaryItem
              label="Semestre"
              value={`${mockUserProfile.semester}º semestre`}
              variant={summaryVariant}
            />
          </View>
        </View>

        <View style={[styles.splitRow, isCompact && styles.splitRowCompact]}>
          <View style={[styles.splitColumn, isCompact ? styles.splitColumnCompact : styles.academicColumn]}>
            <ThemedText type="sectionTitle" style={styles.sectionTitle}>
              Informações Acadêmicas
            </ThemedText>
            <ThemedView type="surface" style={styles.infoCard}>
              <View style={styles.infoRow}>
                <ThemedText type="caption" themeColor="textSecondary">
                  Curso
                </ThemedText>
                <ThemedText type="default" style={styles.infoValue}>
                  {mockUserProfile.course}
                </ThemedText>
              </View>
              <View style={[styles.infoDivider, { backgroundColor: theme.backgroundSelected }]} />
              <View style={styles.infoRow}>
                <ThemedText type="caption" themeColor="textSecondary">
                  Semestre
                </ThemedText>
                <ThemedText type="default" style={styles.infoValue}>
                  {mockUserProfile.semester}º semestre
                </ThemedText>
              </View>
            </ThemedView>
          </View>

          <View style={[styles.splitColumn, isCompact ? styles.splitColumnCompact : styles.statsColumn]}>
            <ThemedText type="sectionTitle" style={styles.sectionTitle}>
              Estatísticas
            </ThemedText>
            <View style={styles.statsGrid}>
              <StatCard value={totalSubjects} label="Disciplinas" />
              <StatCard value={pendingTasks} label="Tarefas pendentes" />
              <StatCard value={completedTasks} label="Tarefas concluídas" />
              <StatCard value={totalEvents} label="Eventos no calendário" />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="sectionTitle" style={styles.sectionTitle}>
            Disciplinas do Semestre
          </ThemedText>
          <View style={styles.subjectsGrid}>
            {mockSubjects.map(subject => (
              <ThemedView
                key={subject.id}
                type="surface"
                style={[styles.subjectCard, subjectLayout]}>
                <View style={styles.subjectHeader}>
                  <StatusIndicator color={subject.color} />
                  <View style={styles.subjectInfo}>
                    <ThemedText type="cardTitle">{subject.name}</ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {subject.code}
                    </ThemedText>
                  </View>
                </View>
                <View style={styles.subjectDetails}>
                  <View style={styles.detailRow}>
                    <ThemedText type="caption" themeColor="textSecondary">
                      Professor
                    </ThemedText>
                    <ThemedText type="caption" style={styles.detailValue}>
                      {subject.teacher}
                    </ThemedText>
                  </View>
                  <View style={[styles.detailRow, !isCompact && styles.scheduleRowWide]}>
                    <ThemedText type="caption" themeColor="textSecondary">
                      Horário
                    </ThemedText>
                    <ThemedText
                      type="caption"
                      style={[styles.detailValue, !isCompact && styles.scheduleValueWide]}
                      numberOfLines={1}
                    >
                      {subject.schedule}
                    </ThemedText>
                  </View>
                  <View style={styles.detailRow}>
                    <ThemedText type="caption" themeColor="textSecondary">
                      Créditos
                    </ThemedText>
                    <ThemedText type="caption" style={styles.detailValue}>
                      {subject.credits}
                    </ThemedText>
                  </View>
                </View>
              </ThemedView>
            ))}
          </View>
        </View>
      </ScreenContainer>
    </ThemedView>
  );
}

function SummaryItem({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: 'full' | 'half' | 'quarter';
}) {
  const layout =
    variant === 'full'
      ? styles.tileFull
      : variant === 'half'
        ? styles.tileHalf
        : styles.tileQuarter;

  return (
    <ThemedView type="surface" style={[styles.summaryCard, layout]}>
      <ThemedText type="caption" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="cardTitle" style={styles.summaryValue}>
        {value}
      </ThemedText>
    </ThemedView>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  const theme = useTheme();

  return (
    <ThemedView type="surface" style={styles.statCard}>
      <ThemedText style={[styles.statValue, { color: theme.primary }]}>{value}</ThemedText>
      <ThemedText type="caption" themeColor="textSecondary" style={styles.statLabel}>
        {label}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: Spacing.five,
    width: '100%',
  },
  pageTitle: {
    ...Typography.pageTitle,
    marginBottom: Spacing.one,
  },
  mainProfileCard: {
    width: '100%',
    padding: Spacing.four,
    borderRadius: Radius.lg,
    marginBottom: Spacing.five,
    gap: Spacing.four,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    width: '100%',
  },
  avatar: {
    width: Spacing.six,
    height: Spacing.six,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarInitial: {
    ...Typography.sectionTitle,
    color: Colors.dark.text,
  },
  profileInfo: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.one,
  },
  editButton: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonWide: {
    alignSelf: 'flex-end',
  },
  editButtonCompact: {
    alignSelf: 'stretch',
    width: '100%',
  },
  section: {
    marginBottom: Spacing.five,
    width: '100%',
  },
  sectionTitle: {
    marginBottom: Spacing.three,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    width: '100%',
  },
  summaryCard: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    gap: Spacing.one,
  },
  summaryValue: {
    flexShrink: 1,
  },
  tileFull: {
    flexGrow: 1,
    flexBasis: '100%',
    width: '100%',
  },
  tileHalf: {
    flexGrow: 1,
    flexBasis: '40%',
    maxWidth: '100%',
  },
  tileQuarter: {
    flexGrow: 1,
    flexBasis: '20%',
    maxWidth: '100%',
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: Spacing.four,
    marginBottom: Spacing.five,
    width: '100%',
  },
  splitRowCompact: {
    flexDirection: 'column',
  },
  splitColumn: {
    minWidth: 0,
  },
  splitColumnCompact: {
    width: '100%',
  },
  academicColumn: {
    flex: 1,
    alignSelf: 'stretch',
  },
  statsColumn: {
    flex: 1.4,
  },
  infoCard: {
    width: '100%',
    flex: 1,
    padding: Spacing.four,
    borderRadius: Radius.lg,
    gap: Spacing.three,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.three,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
  },
  infoDivider: {
    height: 1,
    opacity: 0.6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    width: '100%',
  },
  statCard: {
    flexGrow: 1,
    flexBasis: '40%',
    maxWidth: '100%',
    padding: Spacing.three,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  statValue: {
    ...Typography.pageTitle,
  },
  statLabel: {
    textAlign: 'center',
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
    width: '100%',
  },
  subjectCard: {
    flexGrow: 1,
    flexBasis: '22%',
    maxWidth: '100%',
    padding: Spacing.four,
    borderRadius: Radius.lg,
    gap: Spacing.three,
  },
  subjectCardCompact: {
    flexBasis: '100%',
    width: '100%',
  },
  subjectCardHalf: {
    flexBasis: '40%',
  },
  subjectCardWide: {
    flexBasis: '22%',
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  subjectInfo: {
    flex: 1,
    minWidth: 0,
  },
  subjectDetails: {
    gap: Spacing.two,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
  },
  scheduleRowWide: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: Spacing.one,
  },

  scheduleValueWide: {
    width: '100%',
    textAlign: 'left',
  },
});
