export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  schedule: string;
  credits: number;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'exam' | 'assignment' | 'class' | 'holiday';
  subjectId?: string;
  description?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  course: string;
  semester: number;
  avatar?: string;
}
