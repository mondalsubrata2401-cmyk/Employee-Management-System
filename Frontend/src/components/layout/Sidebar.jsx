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
  LogOut
} from 'lucide-react';
import { Avatar } from '../ui';
import { USER_PROFILE } from '../../data/mockData';

/**
 * Sidebar Navigation Component
 */
export const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        activeTab === id 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon size={20} className={activeTab === id ? 'text-indigo-600' : 'text-slate-400'} />
      <span>{label}</span>
      {activeTab === id && <ChevronRight size={16} className="ml-auto opacity-50" />}
    </button>
  );

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Briefcase className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">Acme HR</span>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
          <div className="px-4 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Main</div>
          <NavItem id="dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="attendance" label="Attendance" icon={Clock} />
          <NavItem id="leave" label="Leave & Time Off" icon={Calendar} />
          <NavItem id="tasks" label="My Tasks" icon={CheckSquare} />
          
          <div className="px-4 pb-2 pt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Records</div>
          <NavItem id="payslips" label="Payslips" icon={FileText} />
          <NavItem id="performance" label="Performance" icon={TrendingUp} />
          
          <div className="px-4 pb-2 pt-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Organization</div>
          <NavItem id="team" label="Team Directory" icon={Users} />
          <NavItem id="profile" label="My Profile" icon={User} />
        </div>

        {/* User Profile Mini - Bottom */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <Avatar name={USER_PROFILE.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{USER_PROFILE.name}</p>
              <p className="text-xs text-slate-500 truncate">{USER_PROFILE.role}</p>
            </div>
            <LogOut size={16} className="text-slate-400 hover:text-rose-500" />
          </div>
        </div>
      </div>
    </aside>
  );
};
