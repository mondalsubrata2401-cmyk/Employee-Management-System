import { useState } from 'react';
import { 
  Users, 
  CheckSquare, 
  Plus,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/ui';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TasksContext';

/**
 * Admin Dashboard View Component
 * Allows admin to assign tasks to employees
 */
export const AdminDashboardView = ({ setActiveTab }) => {
  const { getUserProfile, USERS } = useUser();
  const { addTask, getAllTasks } = useTasks();
  const adminProfile = getUserProfile();
  const allTasks = getAllTasks();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    estimatedHours: 4,
    category: 'Development',
    assignedTo: 'emp001'
  });

  // Handle task assignment
  const handleAssignTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        assignedBy: adminProfile.id
      });
      
      setNewTask({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
        estimatedHours: 4,
        category: 'Development',
        assignedTo: 'emp001'
      });
      setIsAssignModalOpen(false);
    }
  };

  // Calculate statistics
  const stats = {
    totalTasks: allTasks.length,
    completed: allTasks.filter(t => t.status === 'Completed').length,
    inProgress: allTasks.filter(t => t.status === 'In Progress').length,
    notStarted: allTasks.filter(t => t.status === 'Not Started').length
  };

  // Get employee tasks
  const employeeTasks = allTasks.filter(t => t.assignedTo === 'emp001');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {adminProfile.name.split(' ')[0]}!</h1>
            <p className="text-purple-100">Manage team tasks and monitor progress from your admin dashboard.</p>
            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => setIsAssignModalOpen(true)} 
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Assign New Task</span>
              </button>
              <button 
                onClick={() => setActiveTab('tasks')} 
                className="px-4 py-2 bg-white text-purple-900 hover:bg-purple-50 rounded-lg text-sm font-medium transition-colors"
              >
                View All Tasks
              </button>
            </div>
          </div>
          <div className="hidden lg:block opacity-80">
            <Users size={120} strokeWidth={1} />
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center mb-3">
            <CheckSquare size={32} />
          </div>
          <h3 className="text-[var(--muted-foreground)] font-medium text-sm">Total Tasks</h3>
          <p className="text-3xl font-bold text-[var(--text-primary)] mt-1">{stats.totalTasks}</p>
          <span className="text-xs text-[var(--muted-foreground)] font-medium mt-1">Assigned to team</span>
        </Card>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--success-bg)] text-[var(--success)] rounded-lg">
              <CheckSquare size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">Completed</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.completed}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">In Progress</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.inProgress}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--warning-bg)] text-[var(--warning)] rounded-lg">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">Not Started</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.notStarted}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--info-bg)] text-[var(--info)] rounded-lg">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">Completion Rate</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">
                {stats.totalTasks > 0 ? Math.round((stats.completed / stats.totalTasks) * 100) : 0}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Employee Tasks Overview */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] text-lg">Employee Tasks</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Tasks assigned to {USERS.employee.name}</p>
          </div>
          <Button onClick={() => setIsAssignModalOpen(true)} icon={Plus}>
            Assign Task
          </Button>
        </div>

        {employeeTasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare size={48} className="mx-auto text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No tasks assigned yet</h3>
            <p className="text-[var(--muted-foreground)] mb-4">Start by assigning tasks to your team members</p>
            <Button onClick={() => setIsAssignModalOpen(true)} icon={Plus}>
              Assign First Task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {employeeTasks.map(task => (
              <div 
                key={task.id} 
                className="p-4 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)]/30 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-[var(--text-primary)] mb-1">{task.title}</h4>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge type={
                        task.status === 'Completed' ? 'success' : 
                        task.status === 'In Progress' ? 'indigo' : 
                        'neutral'
                      }>
                        {task.status}
                      </Badge>
                      <Badge type={
                        task.priority === 'High' ? 'danger' : 
                        task.priority === 'Medium' ? 'warning' : 
                        'neutral'
                      }>
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-[var(--muted-foreground)] flex items-center">
                        <Calendar size={12} className="mr-1" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-right">
                      <p className="text-xs text-[var(--muted-foreground)]">Progress</p>
                      <p className="text-lg font-bold text-[var(--text-primary)]">{task.progress}%</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="h-2 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[var(--primary)] rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Assign Task Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign New Task"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Task Title *
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              placeholder="Enter task title"
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Assign To *
            </label>
            <select
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              <option value="emp001">{USERS.employee.name} - {USERS.employee.role}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Priority
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Category
              </label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <option>Development</option>
                <option>Review</option>
                <option>Presentation</option>
                <option>Meeting</option>
                <option>Documentation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Estimated Hours
              </label>
              <input
                type="number"
                value={newTask.estimatedHours}
                onChange={(e) => setNewTask({ ...newTask, estimatedHours: parseInt(e.target.value) || 0 })}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setIsAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssignTask} 
              disabled={!newTask.title.trim() || !newTask.dueDate}
            >
              Assign Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
