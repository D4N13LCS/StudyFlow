import { StyleSheet, View, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ScreenContainer from '@/components/screen-container';
import { Radius, Spacing, Typography } from '@/constants/theme';
import { mockSubjects } from '@/data/mockData';

export default function SubjectsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScreenContainer>
       
        <View style={styles.header}>
          <ThemedText style={styles.title}>Disciplinas</ThemedText>
          <ThemedText type="bodySecondary" themeColor="textSecondary">
            {mockSubjects.length} disciplinas matriculadas
          </ThemedText>
        </View>

   
        <View style={styles.subjectsGrid}>
          {mockSubjects.map(subject => (
            <ThemedView key={subject.id} type="surface" style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <View style={[styles.colorIndicator, { backgroundColor: subject.color }]} />
                <View style={styles.subjectInfo}>
                  <ThemedText type="cardTitle" style={styles.subjectName}>{subject.name}</ThemedText>
                  <ThemedText type="caption" themeColor="textSecondary">{subject.code}</ThemedText>
                </View>
              </View>
              <View style={styles.subjectDetails}>
                <View style={styles.detailRow}>
                  <ThemedText type="caption" themeColor="textSecondary" style={styles.detailLabel}>Professor</ThemedText>
                  <ThemedText type="caption">{subject.teacher}</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <ThemedText type="caption" themeColor="textSecondary" style={styles.detailLabel}>Horário</ThemedText>
                  <ThemedText type="caption">{subject.schedule}</ThemedText>
                </View>
                <View style={styles.detailRow}>
                  <ThemedText type="caption" themeColor="textSecondary" style={styles.detailLabel}>Créditos</ThemedText>
                  <ThemedText type="caption">{subject.credits}</ThemedText>
                </View>
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
  header: {
    paddingTop: Platform.select({ web: 0, default: Spacing.two }),
    paddingBottom: Spacing.five,
  },
  title: {
    ...Typography.pageTitle,
    marginBottom: Spacing.one,
  },
  subjectsGrid: {
    flexDirection: Platform.select({ web: 'row' as const, default: 'column' as const }),
    flexWrap: 'wrap',
    gap: Spacing.four,
  },
  subjectCard: {
    width: Platform.select({ web: '48%', default: '100%' }),
    padding: Platform.select({ web: Spacing.five, default: Spacing.four }),
    borderRadius: Radius.lg,
    gap: Spacing.three,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  colorIndicator: {
    width: 4,
    height: 40,
    borderRadius: Radius.sm / 2,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    marginBottom: Spacing.half,
  },
  subjectDetails: {
    gap: Spacing.two,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    marginRight: Spacing.two,
  },
});
