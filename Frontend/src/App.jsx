import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { TasksProvider } from './context/TasksContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './pages/Dashboard';
import { AdminDashboardView } from './pages/AdminDashboard';
import { AttendanceView } from './pages/Attendance';
import { LeaveView } from './pages/Leave';
import { PayslipsView } from './pages/Payslips';
import { PerformanceView } from './pages/Performance';
import { ProfileView } from './pages/Profile';
import { TasksView } from './pages/Tasks';
import { PlaceholderView } from './pages/Placeholder';

/**
 * Main App Content Component
 */
function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);
  const { isAdmin } = useUser();

  // Render active view based on selected tab
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return isAdmin() ? 
          <AdminDashboardView setActiveTab={setActiveTab} /> : 
          <DashboardView setActiveTab={setActiveTab} />;
      case 'attendance':
        return <AttendanceView />;
      case 'leave':
        return <LeaveView />;
      case 'payslips':
        return <PayslipsView />;
      case 'performance':
        return <PerformanceView />;
      case 'profile':
        return <ProfileView />;
      case 'tasks':
        return <TasksView />;
      case 'team':
        return <PlaceholderView moduleName="Team Directory" />;
      default:
        return isAdmin() ? 
          <AdminDashboardView setActiveTab={setActiveTab} /> : 
          <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--background)] font-sans text-[var(--foreground)] transition-colors">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Navbar 
          activeTab={activeTab}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          notifications={notifications}
        />

        {/* Dynamic View Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto animate-in fade-in duration-500 slide-in-from-bottom-2">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}

/**
 * Main App Component - Employee Management System
 * Professional, Minimal, Enterprise-Grade Dashboard
 */
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <TasksProvider>
          <AppContent />
        </TasksProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
