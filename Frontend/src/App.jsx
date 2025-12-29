import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './pages/Dashboard';
import { AttendanceView } from './pages/Attendance';
import { LeaveView } from './pages/Leave';
import { PayslipsView } from './pages/Payslips';
import { PerformanceView } from './pages/Performance';
import { ProfileView } from './pages/Profile';
import { PlaceholderView } from './pages/Placeholder';

/**
 * Main App Component - Employee Management System
 * Professional, Minimal, Enterprise-Grade Dashboard
 */
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications] = useState(3);

  // Render active view based on selected tab
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView setActiveTab={setActiveTab} />;
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
        return <PlaceholderView moduleName="Tasks" />;
      case 'team':
        return <PlaceholderView moduleName="Team Directory" />;
      default:
        return <DashboardView setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
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

export default App;
