import { Menu, Search, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Top Header/Navbar Component
 */
export const Navbar = ({ activeTab, setIsMobileMenuOpen, notifications = 3 }) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="bg-[var(--navbar-bg)] border-b border-[var(--border)] h-16 flex items-center justify-between px-4 lg:px-8 transition-colors">
      <div className="flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 mr-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] rounded-md transition-colors"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-[var(--navbar-foreground)] capitalize hidden sm:block">
          {activeTab.replace('-', ' ')}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-10 pr-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:bg-[var(--card)] transition-all"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-[var(--muted-foreground)]" />
        </div>

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
