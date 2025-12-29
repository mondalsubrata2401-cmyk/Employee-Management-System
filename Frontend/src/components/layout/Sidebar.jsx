import { 
  LayoutDashboard, 
  Clock, 
  Calendar, 
  CheckSquare, 
  FileText, 
  User, 
  TrendingUp, 
  Users,
  ChevronRight,
  Briefcase,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { Avatar } from '../ui';
import { useUser } from '../../context/UserContext';

/**
 * Sidebar Navigation Component
 */
export const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { getUserProfile, switchUser, currentUser } = useUser();
  const userProfile = getUserProfile();

  const handleSwitchUser = () => {
    const newUser = currentUser === 'employee' ? 'admin' : 'employee';
    switchUser(newUser);
    // Reset to dashboard when switching users
    setActiveTab('dashboard');
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        activeTab === id 
          ? 'bg-[var(--sidebar-active)] text-[var(--sidebar-active-foreground)]' 
          : 'text-[var(--sidebar-foreground)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)]'
      }`}
    >
      <Icon size={20} className={activeTab === id ? 'text-[var(--sidebar-active-foreground)]' : 'text-[var(--muted-foreground)]'} />
      <span>{label}</span>
      {activeTab === id && <ChevronRight size={16} className="ml-auto opacity-50" />}
    </button>
  );

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--sidebar-bg)] border-r border-[var(--border)] transform transition-transform duration-200 ease-in-out no-scrollbar ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="px-6 h-16 border-b border-[var(--border)] flex items-center space-x-3">
          <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <Briefcase className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-[var(--foreground)] tracking-tight">Acme HR</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          <div className="px-4 pb-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Main</div>
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="attendance" label="Attendance" icon={Clock} />
          <NavItem id="leave" label="Leave & Time Off" icon={Calendar} />
          <NavItem id="tasks" label="My Tasks" icon={CheckSquare} />
          
          <div className="px-4 pb-2 pt-6 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Records</div>
          <NavItem id="payslips" label="Payslips" icon={FileText} />
          <NavItem id="performance" label="Performance" icon={TrendingUp} />
          
          <div className="px-4 pb-2 pt-6 text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">Organization</div>
          <NavItem id="team" label="Team Directory" icon={Users} />
          <NavItem id="profile" label="My Profile" icon={User} />
        </div>

        {/* User Profile Mini - Bottom */}
        <div className="p-4 border-t border-[var(--border)]">
          {/* User Switch Button */}
          <button
            onClick={handleSwitchUser}
            className="w-full mb-3 px-3 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-[var(--accent-foreground)] rounded-lg text-xs font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw size={14} />
            <span>Switch to {currentUser === 'employee' ? 'Admin' : 'Employee'}</span>
          </button>

          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[var(--muted)] transition-colors cursor-pointer">
            <Avatar name={userProfile.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--foreground)] truncate">{userProfile.name}</p>
              <p className="text-xs text-[var(--muted-foreground)] truncate">{userProfile.role}</p>
            </div>
            <LogOut size={16} className="text-[var(--muted-foreground)] hover:text-[var(--error)]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
