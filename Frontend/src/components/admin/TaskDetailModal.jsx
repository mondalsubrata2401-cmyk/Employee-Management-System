import { 
  X, 
  Clock, 
  Calendar, 
  User, 
  Flag,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Badge, Button, Modal } from '../ui';
import { EMPLOYEES } from '../../data/employeeData';

/**
 * Task Detail Modal Component
 * Shows complete task information when clicking on a task card
 */
export const TaskDetailModal = ({ task, isOpen, onClose }) => {
  if (!task) return null;

  const assignedEmployee = EMPLOYEES.find(emp => emp.id === task.assignedTo);

  // Calculate time spent in readable format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  // Check if task is overdue
  const isOverdue = task.status !== 'Completed' && new Date(task.dueDate) < new Date();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="large">
      <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
        {/* Task Header */}
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            {task.title}
          </h2>
          {task.description && (
            <p className="text-[var(--muted-foreground)]">
              {task.description}
            </p>
          )}
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge type={
            task.status === 'Completed' ? 'success' :
            task.status === 'In Progress' ? 'indigo' :
            task.status === 'Review' ? 'warning' :
            'neutral'
          }>
            {task.status}
          </Badge>
          <Badge type={
            task.priority === 'High' ? 'danger' :
            task.priority === 'Medium' ? 'warning' :
            'success'
          }>
            {task.priority} Priority
          </Badge>
          <Badge type="neutral">{task.category}</Badge>
          {isOverdue && (
            <Badge type="danger">
              <AlertTriangle size={12} className="mr-1" />
              Overdue
            </Badge>
          )}
        </div>

        {/* Progress Section */}
        <div className="bg-[var(--muted)] p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-[var(--primary)]" />
              <span className="font-semibold text-[var(--text-primary)]">Progress</span>
            </div>
            <span className="text-2xl font-bold text-[var(--primary)]">
              {task.progress}%
            </span>
          </div>
          <div className="h-3 w-full bg-[var(--background)] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                task.progress === 100 
                  ? 'bg-[rgb(var(--success))]' 
                  : task.progress >= 50 
                  ? 'bg-[rgb(var(--info))]' 
                  : 'bg-[rgb(var(--primary))]'
              }`}
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Due Date */}
          <div className="p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-2">
              <Calendar size={16} />
              <span className="text-sm font-medium">Due Date</span>
            </div>
            <p className={`text-lg font-semibold ${
              isOverdue ? 'text-[rgb(var(--error))]' : 'text-[var(--text-primary)]'
            }`}>
              {new Date(task.dueDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            {isOverdue && (
              <p className="text-xs text-[rgb(var(--error))] mt-1">
                {Math.ceil((new Date() - new Date(task.dueDate)) / (1000 * 60 * 60 * 24))} days overdue
              </p>
            )}
          </div>

          {/* Time Spent */}
          <div className="p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-2">
              <Clock size={16} />
              <span className="text-sm font-medium">Time Spent</span>
            </div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              {formatTime(task.timeSpent)}
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              of {task.estimatedHours}h estimated
            </p>
          </div>

          {/* Complexity */}
          <div className="p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-2">
              <Target size={16} />
              <span className="text-sm font-medium">Complexity</span>
            </div>
            <Badge type={
              task.complexity === 'High' ? 'danger' :
              task.complexity === 'Medium' ? 'warning' :
              'success'
            }>
              {task.complexity}
            </Badge>
          </div>

          {/* Category */}
          <div className="p-4 border border-[var(--border)] rounded-lg">
            <div className="flex items-center gap-2 text-[var(--muted-foreground)] mb-2">
              <FileText size={16} />
              <span className="text-sm font-medium">Category</span>
            </div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">
              {task.category}
            </p>
          </div>
        </div>

        {/* Assigned Employee Section */}
        {assignedEmployee && (
          <div className="p-4 bg-[var(--muted)] rounded-lg">
            <div className="flex items-center gap-2 text-[var(--text-primary)] mb-3">
              <User size={18} />
              <span className="font-semibold">Assigned Employee</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] flex items-center justify-center text-white text-lg font-bold">
                {assignedEmployee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[var(--text-primary)]">
                  {assignedEmployee.name}
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {assignedEmployee.role}
                </p>
              </div>
              <div className="text-right">
                <Badge type="neutral">{assignedEmployee.experienceLevel}</Badge>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  {assignedEmployee.workload.activeTasks} active tasks
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quality Metrics */}
        {(task.reworkCount > 0 || task.bugCount > 0 || task.reviewScore) && (
          <div className="p-4 border border-[var(--border)] rounded-lg">
            <h4 className="font-semibold text-[var(--text-primary)] mb-3">Quality Metrics</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              {task.reviewScore && (
                <div>
                  <p className="text-2xl font-bold text-[var(--primary)]">{task.reviewScore}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">Review Score</p>
                </div>
              )}
              <div>
                <p className="text-2xl font-bold text-[rgb(var(--warning))]">{task.reworkCount}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Reworks</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[rgb(var(--error))]">{task.bugCount}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Bugs</p>
              </div>
            </div>
          </div>
        )}

        {/* Review Feedback */}
        {task.reviewFeedback && (
          <div className="p-4 bg-[rgb(var(--info-bg))] border border-[rgb(var(--info))] rounded-lg">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <CheckCircle size={16} className="text-[rgb(var(--info))]" />
              Review Feedback
            </h4>
            <p className="text-sm text-[var(--text-secondary)]">
              {task.reviewFeedback}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
