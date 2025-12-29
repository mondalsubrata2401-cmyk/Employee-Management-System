import { 
  Clock, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertCircle,
  MoreVertical,
  Calendar,
  User
} from 'lucide-react';
import { Card, Badge } from '../ui';
import { EMPLOYEES } from '../../data/employeeData';

/**
 * Live Task Status Component
 * Shows real-time task status with progress tracking
 */
export const LiveTaskStatus = ({ task, onUpdateTask }) => {
  // Calculate time spent in readable format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Get status color and icon
  const getStatusConfig = (status) => {
    const configs = {
      'Not Started': {
        color: 'neutral',
        icon: AlertCircle,
        bgClass: 'bg-[rgb(var(--muted))]',
        textClass: 'text-[rgb(var(--muted-foreground))]'
      },
      'In Progress': {
        color: 'indigo',
        icon: Play,
        bgClass: 'bg-[rgb(var(--info-bg))]',
        textClass: 'text-[rgb(var(--info))]'
      },
      'Review': {
        color: 'warning',
        icon: Clock,
        bgClass: 'bg-[rgb(var(--warning-bg))]',
        textClass: 'text-[rgb(var(--warning))]'
      },
      'Completed': {
        color: 'success',
        icon: CheckCircle,
        bgClass: 'bg-[rgb(var(--success-bg))]',
        textClass: 'text-[rgb(var(--success))]'
      }
    };
    return configs[status] || configs['Not Started'];
  };

  const statusConfig = getStatusConfig(task.status);
  const StatusIcon = statusConfig.icon;

  // Get assigned employee info
  const assignedEmployee = EMPLOYEES.find(emp => emp.id === task.assignedTo);

  // Calculate last activity time
  const getLastActivityTime = () => {
    if (!task.lastActivityAt) return 'No activity';
    const now = new Date();
    const lastActivity = new Date(task.lastActivityAt);
    const diffMs = now - lastActivity;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${statusConfig.bgClass}`}>
                <StatusIcon size={20} className={statusConfig.textClass} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--muted-foreground)]">
                  {task.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {task.description}
                </p>
              </div>
            </div>
          </div>
          <button className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--text-primary))] p-1 rounded-lg hover:bg-[rgb(var(--muted))]">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Status and Priority Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge type={statusConfig.color}>
            {task.status}
          </Badge>
          <Badge type={
            task.priority === 'High' ? 'danger' : 
            task.priority === 'Medium' ? 'warning' : 
            'neutral'
          }>
            {task.priority} Priority
          </Badge>
          <Badge type="neutral">{task.category}</Badge>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Progress
            </span>
            <span className="text-sm font-bold text-[var(--muted-foreground)]">
              {task.progress}%
            </span>
          </div>
          <div className="h-3 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                task.progress === 100 
                  ? 'bg-[var(--success)]' 
                  : task.progress >= 50 
                  ? 'bg-[var(--info)]' 
                  : 'bg-[var(--primary)]'
              }`}
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        {/* Time and Activity Info */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-1">
              <Clock size={14} />
              <span className="text-xs uppercase tracking-wide">Time Spent</span>
            </div>
            <p className="text-sm font-semibold text-[var(--muted-foreground)]">
              {formatTime(task.timeSpent)} <span className="text-xs text-[var(--muted-foreground)]">{" "}/ {task.estimatedHours}h</span>
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-1">
              <Calendar size={14} />
              <span className="text-xs uppercase tracking-wide">Due Date</span>
            </div>
            <p className="text-sm font-semibold text-[var(--muted-foreground)]">
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Assigned Employee */}
        {assignedEmployee && (
          <div className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
            <User size={14} className="text-[var(--muted-foreground)]" />
            <span className="text-xs text-[var(--muted-foreground)]">Assigned to:</span>
            <span className="text-xs font-medium text-[var(--muted-foreground)]">{assignedEmployee.name}</span>
            <Badge type="neutral" className="text-xs">{assignedEmployee.experienceLevel}</Badge>
          </div>
        )}

        {/* Last Activity */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              task.isRunning 
                ? 'bg-[rgb(var(--success))] animate-pulse' 
                : 'bg-[rgb(var(--muted-foreground))]'
            }`} />
            <span className="text-xs text-[var(--muted-foreground)]">
              Last activity: {getLastActivityTime()}
            </span>
          </div>
          {task.status === 'In Progress' && (
            <span className="text-xs font-medium text-[rgb(var(--info))]">
              ● Active
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
