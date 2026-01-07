
import React, { useState, useEffect } from 'react';
import { User, Student, AttendanceRecord, Holiday, UserRole } from './types';
import { INITIAL_USERS, INITIAL_STUDENTS, INITIAL_HOLIDAYS, CLASSES_LIST } from './constants';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import TeacherOverview from './pages/TeacherOverview';
import AttendanceTaker from './pages/AttendanceTaker';
import StudentManager from './components/StudentManager';
import TeacherManager from './components/TeacherManager';
import ReportsPage from './pages/ReportsPage';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edutrack_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>(INITIAL_HOLIDAYS);
  const [activeView, setActiveView] = useState<string>('dashboard');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('edutrack_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('edutrack_user');
      setActiveView('dashboard');
    }
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} users={users} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return currentUser.role === UserRole.ADMIN ? (
          <AdminDashboard 
            users={users} 
            students={students}
            attendance={attendance}
            holidays={holidays}
          />
        ) : (
          <TeacherOverview 
            user={currentUser}
            students={students}
            attendance={attendance}
            holidays={holidays}
          />
        );
      
      case 'attendance':
        return (
          <AttendanceTaker 
            user={currentUser}
            students={students}
            setStudents={setStudents}
            attendance={attendance}
            setAttendance={setAttendance}
            holidays={holidays}
          />
        );
      
      case 'teachers':
        if (currentUser.role !== UserRole.ADMIN) return null;
        return <TeacherManager users={users} setUsers={setUsers} classes={CLASSES_LIST} />;

      case 'students':
      case 'my-students':
        const allowedClasses = currentUser.role === UserRole.ADMIN 
          ? CLASSES_LIST 
          : (currentUser.assignedClasses || []);
        
        return (
          <StudentManager 
            students={students} 
            setStudents={setStudents} 
            classes={allowedClasses}
            canChangeClass={currentUser.role === UserRole.ADMIN}
          />
        );

      case 'reports':
        const reportClasses = currentUser.role === UserRole.ADMIN 
          ? CLASSES_LIST 
          : (currentUser.assignedClasses || []);
        return (
          <ReportsPage 
            attendance={attendance} 
            students={students} 
            classes={reportClasses}
          />
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-64 bg-white rounded-3xl border border-dashed border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeView.replace('-', ' ')}</h2>
            <p className="text-gray-500 mt-2">Module is active. Select from Sidebar.</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={currentUser} 
      onLogout={handleLogout} 
      activeView={activeView} 
      onViewChange={setActiveView}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
