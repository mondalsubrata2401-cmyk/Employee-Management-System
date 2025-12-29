import { Menu, Search, Bell, Moon, Sun, RefreshCw, ListTodo, Eye, LayoutDashboard } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

/**
 * Top Header/Navbar Component
 */
export const Navbar = ({ activeTab, setIsMobileMenuOpen, setActiveTab, notifications = 3 }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, switchUser, isAdmin } = useUser();

  const handleSwitchUser = () => {
    const newUser = currentUser === 'employee' ? 'admin' : 'employee';
    switchUser(newUser);
    // Reset to dashboard when switching users
    setActiveTab('dashboard');
  };

  return (
    <header className="bg-[var(--navbar-bg)] border-b border-[var(--border)] h-16 flex items-center justify-between px-4 lg:px-8 transition-colors">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 mr-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>
        
        {/* Admin Navigation Links */}
        {isAdmin() ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('task-management')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <ListTodo size={16} />
              <span>Manage Tasks</span>
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--text-primary)] hover:bg-[var(--muted)] rounded-lg transition-colors"
            >
              <Eye size={16} />
              <span>View All Tasks</span>
            </button>
          </div>
        ) : (
          <h1 className="text-xl font-semibold text-[var(--navbar-foreground)] capitalize hidden sm:block">
            {activeTab.replace('-', ' ')}
          </h1>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar (Hidden on mobile and for admin) */}
        {!isAdmin() && (
          <div className="hidden md:flex relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-64 pl-10 pr-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:bg-[var(--card)] transition-all"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-[var(--muted-foreground)]" />
          </div>
        )}

        {/* User Mode Switcher */}
        <button
          onClick={handleSwitchUser}
          className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-[var(--accent)] hover:bg-[var(--accent)]/80 text-[var(--accent-foreground)] rounded-lg text-xs font-medium transition-colors"
          title={`Switch to ${currentUser === 'employee' ? 'Admin' : 'Employee'} Mode`}
        >
          <RefreshCw size={14} />
          <span>Switch to {currentUser === 'employee' ? 'Admin' : 'Employee'}</span>
        </button>

        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-full transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)] rounded-full transition-colors">
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--error)] rounded-full ring-2 ring-[var(--navbar-bg)]" />
          )}
        </button>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-[var(--success-bg)] text-[var(--success)] rounded-full border border-[var(--success-bg)] text-xs font-medium">
          <span className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
          <span>Clocked In</span>
        </div>
      </div>
    </header>
  );
};
