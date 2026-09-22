import { StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import StatusIndicator from '@/components/status-indicator';
import { Spacing } from '@/constants/theme';
import { mockUserProfile, mockSubjects, mockTasks, mockCalendarEvents } from '@/data/mockData';

export default function ProfileScreen() {
  // Calculate statistics dynamically
  const totalSubjects = mockSubjects.length;
  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;
  const totalEvents = mockCalendarEvents.length;

  return (
    <ThemedView style={styles.container}>
      <ScreenContainer>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">Perfil</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.headerDescription}>
            Gerencie suas informações e acompanhe sua jornada acadêmica.
          </ThemedText>
        </View>

        {/* Main Profile Card */}
        <ThemedView type="backgroundElement" style={styles.mainProfileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                <ThemedText type="title" style={styles.avatarInitial}>
                  {mockUserProfile.name.charAt(0)}
                </ThemedText>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <ThemedText type="subtitle">{mockUserProfile.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {mockUserProfile.email}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {mockUserProfile.course}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
            <ThemedText type="small" style={styles.editButtonText}>
              ✎ Editar Perfil
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Quick Summary */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Resumo Rápido</ThemedText>
          <View style={styles.summaryGrid}>
            <ThemedView type="backgroundElement" style={styles.summaryCard}>
              <ThemedText type="small" themeColor="textSecondary">Nome</ThemedText>
              <ThemedText type="default">{mockUserProfile.name}</ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.summaryCard}>
              <ThemedText type="small" themeColor="textSecondary">E-mail</ThemedText>
              <ThemedText type="default" style={styles.summaryValue}>{mockUserProfile.email}</ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.summaryCard}>
              <ThemedText type="small" themeColor="textSecondary">Curso</ThemedText>
              <ThemedText type="default">{mockUserProfile.course}</ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.summaryCard}>
              <ThemedText type="small" themeColor="textSecondary">Semestre Atual</ThemedText>
              <ThemedText type="default">{mockUserProfile.semester}º semestre</ThemedText>
            </ThemedView>
          </View>
        </View>

        {/* Academic Info & Statistics */}
        <View style={styles.academicSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Informações Acadêmicas</ThemedText>
          <ThemedView type="backgroundElement" style={styles.infoCard}>
            <View style={styles.infoRow}>
              <ThemedText type="small" themeColor="textSecondary">Curso</ThemedText>
              <ThemedText type="default">{mockUserProfile.course}</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText type="small" themeColor="textSecondary">Semestre</ThemedText>
              <ThemedText type="default">{mockUserProfile.semester}º semestre</ThemedText>
            </View>
          </ThemedView>

          <ThemedText type="subtitle" style={styles.sectionTitle}>Estatísticas</ThemedText>
          <View style={styles.statsGrid}>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText type="title" style={styles.statValue}>{totalSubjects}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">Disciplinas</ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText type="title" style={styles.statValue}>{pendingTasks}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">Tarefas pendentes</ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText type="title" style={styles.statValue}>{completedTasks}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">Tarefas concluídas</ThemedText>
            </ThemedView>
            <ThemedView type="backgroundElement" style={styles.statCard}>
              <ThemedText type="title" style={styles.statValue}>{totalEvents}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">Eventos no calendário</ThemedText>
            </ThemedView>
          </View>
        </View>

        {/* Subjects of the Semester */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Disciplinas do Semestre</ThemedText>
          <View style={styles.subjectsList}>
            {mockSubjects.map(subject => (
              <ThemedView key={subject.id} type="backgroundElement" style={styles.subjectCard}>
                <View style={styles.subjectHeader}>
                  <StatusIndicator color={subject.color} />
                  <View style={styles.subjectInfo}>
                    <ThemedText type="default">{subject.name}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">{subject.code}</ThemedText>
                  </View>
                </View>
                <View style={styles.subjectDetails}>
                  <ThemedText type="small" themeColor="textSecondary">
                    Professor: {subject.teacher}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Horário: {subject.schedule}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Créditos: {subject.credits}
                  </ThemedText>
                </View>
              </ThemedView>
            ))}
          </View>
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
    paddingBottom: Spacing.four,
  },
  headerDescription: {
    marginTop: Spacing.one,
  },
  mainProfileCard: {
    padding: Platform.select({ web: Spacing.five, default: Spacing.four }),
    borderRadius: Spacing.three,
    marginBottom: Spacing.four,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
    marginBottom: Spacing.four,
  },
  avatarContainer: {
    flexShrink: 0,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    color: '#FFFFFF',
    fontSize: 32,
  },
  profileInfo: {
    flex: 1,
    gap: Spacing.one,
  },
  editButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  editButtonText: {
    color: '#3B82F6',
  },
  section: {
    marginBottom: Spacing.five,
  },
  sectionTitle: {
    marginBottom: Spacing.three,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  summaryCard: {
    flex: 1,
    minWidth: 140,
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
    gap: Spacing.one,
  },
  summaryValue: {
    fontSize: 12,
  },
  academicSection: {
    flexDirection: 'column',
    gap: Spacing.four,
    marginBottom: Spacing.five,
  },
  infoCard: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  statValue: {
    color: '#3B82F6',
    marginBottom: Spacing.one,
  },
  subjectsList: {
    gap: Spacing.three,
  },
  subjectCard: {
    padding: Platform.select({ web: Spacing.four, default: Spacing.three }),
    borderRadius: Spacing.three,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.two,
    gap: Spacing.three,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectDetails: {
    gap: Spacing.one,
  },
});
