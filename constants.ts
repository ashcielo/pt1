
import { UserRole, User, Student, Holiday } from './types';

export const INITIAL_USERS: User[] = [
  { id: '1', name: 'Admin One', email: 'admin@school.com', role: UserRole.ADMIN },
  { id: '2', name: 'John Teacher', email: 'john@school.com', role: UserRole.TEACHER, assignedClasses: ['CS-A', 'CS-B'] },
  { id: '3', name: 'Sarah Prof', email: 'sarah@school.com', role: UserRole.TEACHER, assignedClasses: ['IT-A'] },
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 's1', regNumber: '2023CS001', name: 'Alice Smith', email: 'alice@student.com', phone: '1234567890', classSection: 'CS-A', isVerified: true },
  { id: 's2', regNumber: '2023CS002', name: 'Bob Jones', email: 'bob@student.com', phone: '9876543210', classSection: 'CS-A', isVerified: false },
  { id: 's3', regNumber: '2023IT001', name: 'Charlie Brown', email: 'charlie@student.com', phone: '5556667777', classSection: 'IT-A', isVerified: true },
];

export const INITIAL_HOLIDAYS: Holiday[] = [
  { date: '2024-12-25', name: 'Christmas Day' },
  { date: '2025-01-01', name: 'New Year Day' },
];

export const CLASSES_LIST = ['CS-A', 'CS-B', 'IT-A', 'IT-B', 'ME-A'];
