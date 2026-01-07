
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  assignedClasses?: string[]; // Classes like "CS-A", "CS-B"
}

export interface Student {
  id: string;
  regNumber: string;
  name: string;
  email: string;
  phone: string;
  classSection: string;
  isVerified: boolean;
}

export interface AttendanceRecord {
  date: string; // ISO format YYYY-MM-DD
  studentId: string;
  status: 'PRESENT' | 'ABSENT' | 'HOLIDAY';
  classSection: string;
}

export interface Holiday {
  date: string;
  name: string;
}

export interface AppState {
  users: User[];
  students: Student[];
  attendance: AttendanceRecord[];
  holidays: Holiday[];
  currentUser: User | null;
}
