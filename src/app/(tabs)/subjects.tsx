import { StyleSheet, View, Platform, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { mockSubjects } from '@/data/mockData';

export default function SubjectsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title">Disciplinas</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {mockSubjects.length} disciplinas matriculadas
          </ThemedText>
        </View>

        <View style={styles.subjectsList}>
          {mockSubjects.map(subject => (
            <ThemedView key={subject.id} type="backgroundElement" style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <View style={[styles.colorIndicator, { backgroundColor: subject.color }]} />
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
  colorIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectDetails: {
    gap: Spacing.one,
  },
});
