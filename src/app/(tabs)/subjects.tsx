import { StyleSheet, View, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import ScreenHeader from '@/components/screen-header';
import StatusIndicator from '@/components/status-indicator';
import { Spacing } from '@/constants/theme';
import { mockSubjects } from '@/data/mockData';

export default function SubjectsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScreenContainer>
        <ScreenHeader
          title="Disciplinas"
          subtitle={`${mockSubjects.length} disciplinas matriculadas`}
        />

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
      </ScreenContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
