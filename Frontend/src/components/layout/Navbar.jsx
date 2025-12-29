import { Menu, Search, Bell } from 'lucide-react';

/**
 * Top Header/Navbar Component
 */
export const Navbar = ({ activeTab, setIsMobileMenuOpen, notifications = 3 }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 -ml-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-md"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-slate-800 capitalize hidden sm:block">
          {activeTab.replace('-', ' ')}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
          <Bell size={20} />
          {notifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          )}
        </button>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-xs font-medium">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>Clocked In</span>
        </div>
      </div>
    </header>
  );
};
