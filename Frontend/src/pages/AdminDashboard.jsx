import { useState } from 'react';
import { 
  Users, 
  CheckSquare, 
  Plus,
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Target
} from 'lucide-react';
import { Card, Badge, Button } from '../components/ui';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TasksContext';
import { 
  TaskAssignmentPanel,
  LiveTaskStatus,
  ProgressVsDeadlineAnalytics,
  WorkQualityIndicators,
  TaskDetailModal
} from '../components/admin';

/**
 * Admin Dashboard View Component
 * Allows admin to assign tasks to employees with advanced analytics
 */
export const AdminDashboardView = ({ setActiveTab }) => {
  const { getUserProfile } = useUser();
  const { addTask, getAllTasks } = useTasks();
  const adminProfile = getUserProfile();
  const allTasks = getAllTasks();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // overview, analytics
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [detailTask, setDetailTask] = useState(null);

  // Handle task assignment
  const handleAssignTask = (taskData) => {
    addTask({
      ...taskData,
      assignedBy: adminProfile.id
    });
    setIsAssignModalOpen(false);
  };

  // Handle view task details
  const handleViewTaskDetails = (task) => {
    setDetailTask(task);
    setIsDetailModalOpen(true);
  };

  // Calculate statistics
  const stats = {
    totalTasks: allTasks.length,
    completed: allTasks.filter(t => t.status === 'Completed').length,
    inProgress: allTasks.filter(t => t.status === 'In Progress').length,
    notStarted: allTasks.filter(t => t.status === 'Not Started').length,
    review: allTasks.filter(t => t.status === 'Review').length,
    overdue: allTasks.filter(t => {
      if (t.status === 'Completed') return false;
      return new Date(t.dueDate) < new Date();
    }).length
  };

  // Get high priority tasks
  const highPriorityTasks = allTasks.filter(t => t.priority === 'High' && t.status !== 'Completed');

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6 flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {adminProfile.name.split(' ')[0]}!</h1>
            <p className="text-purple-100">Manage team tasks and monitor progress with real-time analytics.</p>
            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => setActiveTab('task-management')} 
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Manage Tasks</span>
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
          <div className="w-16 h-16 rounded-full bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] flex items-center justify-center mb-3">
            <CheckSquare size={32} />
          </div>
          <h3 className="text-[rgb(var(--muted-foreground))] font-medium text-sm">Total Tasks</h3>
          <p className="text-3xl font-bold text-[rgb(var(--text-primary))] mt-1">{stats.totalTasks}</p>
          <span className="text-xs text-[rgb(var(--muted-foreground))] font-medium mt-1">Assigned to team</span>
        </Card>
      </div>

      {/* Enhanced Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[rgb(var(--success-bg))] text-[rgb(var(--success))] rounded-lg">
              <CheckSquare size={20} />
            </div>
            <div>
              <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wide">Completed</p>
              <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">{stats.completed}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[rgb(var(--info-bg))] text-[rgb(var(--info))] rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wide">In Progress</p>
              <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">{stats.inProgress}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[rgb(var(--warning-bg))] text-[rgb(var(--warning))] rounded-lg">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wide">Not Started</p>
              <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">{stats.notStarted}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] rounded-lg">
              <Target size={20} />
            </div>
            <div>
              <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wide">Review</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.review}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[rgb(var(--error-bg))] text-[rgb(var(--error))] rounded-lg">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wide">Overdue</p>
              <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">{stats.overdue}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[rgb(var(--text-primary))]">Task Management</h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'overview' ? 'primary' : 'ghost'}
            onClick={() => setViewMode('overview')}
            icon={BarChart3}
          >
            Overview
          </Button>
          <Button
            variant={viewMode === 'analytics' ? 'primary' : 'ghost'}
            onClick={() => setViewMode('analytics')}
            icon={TrendingUp}
          >
            Analytics
          </Button>
        </div>
      </div>

      {/* Overview Mode */}
      {viewMode === 'overview' && (
        <>
          {/* High Priority Alerts */}
          {highPriorityTasks.length > 0 && (
            <Card className="p-5 bg-[rgb(var(--error-bg))] border-2 border-[rgb(var(--error))]">
              <div className="flex items-start gap-3">
                <AlertCircle size={24} className="text-[rgb(var(--error))] shrink-0" />
                <div>
                  <h3 className="font-semibold text-[rgb(var(--text-primary))] mb-2">
                    {highPriorityTasks.length} High Priority Task{highPriorityTasks.length > 1 ? 's' : ''} Pending
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    These tasks require immediate attention
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Task List */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-semibold text-[rgb(var(--text-primary))] text-lg">All Tasks</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Live task status and progress tracking</p>
              </div>
              <Button onClick={() => setIsAssignModalOpen(true)} icon={Plus}>
                Assign Task
              </Button>
            </div>

            {allTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckSquare size={48} className="mx-auto text-[rgb(var(--muted-foreground))] mb-4" />
                <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2">No tasks assigned yet</h3>
                <p className="text-[rgb(var(--muted-foreground))] mb-4">Start by assigning tasks to your team members</p>
                <Button onClick={() => setIsAssignModalOpen(true)} icon={Plus}>
                  Assign First Task
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {allTasks.map(task => (
                  <div key={task.id} onClick={() => handleViewTaskDetails(task)} className="cursor-pointer">
                    <LiveTaskStatus task={task} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}

      {/* Analytics Mode */}
      {viewMode === 'analytics' && selectedTaskId && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressVsDeadlineAnalytics 
              task={allTasks.find(t => t.id === selectedTaskId)} 
            />
            <WorkQualityIndicators 
              task={allTasks.find(t => t.id === selectedTaskId)} 
            />
          </div>
        </>
      )}

      {viewMode === 'analytics' && !selectedTaskId && allTasks.length > 0 && (
        <Card className="p-12 text-center">
          <Target size={48} className="mx-auto text-[rgb(var(--muted-foreground))] mb-4" />
          <h3 className="text-lg font-semibold text-[rgb(var(--text-primary))] mb-2">
            Select a Task
          </h3>
          <p className="text-[rgb(var(--muted-foreground))]">
            Click on a task from the overview to view detailed analytics
          </p>
          <Button 
            onClick={() => setViewMode('overview')} 
            className="mt-4"
            variant="outline"
          >
            Go to Overview
          </Button>
        </Card>
      )}

      {/* Task Assignment Modal */}
      <TaskAssignmentPanel
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignTask}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={detailTask}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setDetailTask(null);
        }}
      />
    </div>
  );
};
