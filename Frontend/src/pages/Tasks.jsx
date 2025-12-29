import { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  Calendar,
  AlertCircle,
  MoreHorizontal,
  Filter,
  Search,
  X
} from 'lucide-react';
import { Card, Button, Badge, Modal } from '../components/ui';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TasksContext';

/**
 * Tasks Management View Component
 * Full-featured task tracking with start/pause/complete functionality
 */
export const TasksView = () => {
  const { getUserProfile, isAdmin, isEmployee } = useUser();
  const { getTasksForUser, startTask, pauseTask, completeTask, updateTask } = useTasks();
  const userProfile = getUserProfile();
  
  // Get tasks for current user
  const userTasks = getTasksForUser(userProfile.id);

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progressValue, setProgressValue] = useState(0);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Start task timer
  const handleStartTask = (taskId) => {
    startTask(taskId);
  };

  // Pause task timer
  const handlePauseTask = (taskId) => {
    pauseTask(taskId);
  };

  // Update task progress
  const handleUpdateProgress = () => {
    if (selectedTask) {
      updateTask(selectedTask.id, {
        progress: progressValue,
        status: progressValue === 100 ? 'Completed' : progressValue > 0 ? 'In Progress' : 'Not Started'
      });
      setIsProgressModalOpen(false);
      setSelectedTask(null);
      setProgressValue(0);
    }
  };

  // Complete task
  const handleCompleteTask = (taskId) => {
    completeTask(taskId);
  };

  // Format time spent
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Filter and search tasks
  const filteredTasks = userTasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status.toLowerCase().replace(' ', '-') === filterStatus;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Get status badge type
  const getStatusBadgeType = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'indigo';
      case 'Not Started': return 'neutral';
      default: return 'neutral';
    }
  };

  // Get priority badge type
  const getPriorityBadgeType = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'neutral';
      default: return 'neutral';
    }
  };

  // Calculate statistics
  const stats = {
    total: userTasks.length,
    completed: userTasks.filter(t => t.status === 'Completed').length,
    inProgress: userTasks.filter(t => t.status === 'In Progress').length,
    notStarted: userTasks.filter(t => t.status === 'Not Started').length,
    totalTimeSpent: userTasks.reduce((acc, t) => acc + t.timeSpent, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">My Tasks</h2>
          <p className="text-[var(--muted-foreground)] text-sm">
            {isEmployee() ? 'Track and manage your assigned tasks' : 'View all assigned tasks'}
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg">
              <CheckSquare size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Total Tasks</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--success-bg)] text-[var(--success)] rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Completed</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.completed}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg">
              <Play size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">In Progress</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.inProgress}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--secondary)] text-[var(--text-secondary)] rounded-lg">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Not Started</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{stats.notStarted}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[var(--warning-bg)] text-[var(--warning)] rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-xs text-[var(--muted-foreground)]">Time Spent</p>
              <p className="text-lg font-bold text-[var(--text-primary)]">{formatTime(stats.totalTimeSpent)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-2.5 text-[var(--muted-foreground)]" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--muted)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-[var(--muted-foreground)]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              <option value="all">All Status</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card className="p-12 text-center">
            <CheckSquare size={48} className="mx-auto text-[var(--muted-foreground)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No tasks found</h3>
            <p className="text-[var(--muted-foreground)] mb-4">
              {searchQuery ? 'Try adjusting your search or filters' : 'Get started by adding your first task'}
            </p>
            {!searchQuery && (
              <p className="text-[var(--muted-foreground)]">
                {isEmployee() ? 'No tasks assigned yet. Check back later!' : 'No tasks found.'}
              </p>
            )}
          </Card>
        ) : (
          filteredTasks.map(task => (
            <Card key={task.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Task Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                        {task.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] mb-3">
                        {task.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge type={getStatusBadgeType(task.status)}>{task.status}</Badge>
                    <Badge type={getPriorityBadgeType(task.priority)}>{task.priority}</Badge>
                    <span className="text-xs text-[var(--muted-foreground)] flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-[var(--muted-foreground)] flex items-center">
                      <Clock size={14} className="mr-1" />
                      {formatTime(task.timeSpent)} / {task.estimatedHours}h
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[var(--muted-foreground)]">Progress</span>
                      <span className="font-medium text-[var(--text-primary)]">{task.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[var(--primary)] rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex lg:flex-col items-center gap-2">
                  {task.status !== 'Completed' && (
                    <>
                      {!task.isRunning ? (
                        <Button
                          variant="secondary"
                          onClick={() => handleStartTask(task.id)}
                          icon={Play}
                          className="w-full lg:w-auto"
                        >
                          Start
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() => handlePauseTask(task.id)}
                          icon={Pause}
                          className="w-full lg:w-auto bg-[var(--warning-bg)] text-[var(--warning)] hover:bg-[var(--warning-bg)]/80"
                        >
                          Pause
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSelectedTask(task);
                          setProgressValue(task.progress);
                          setIsProgressModalOpen(true);
                        }}
                        className="w-full lg:w-auto"
                      >
                        Update Progress
                      </Button>

                      <Button
                        variant="primary"
                        onClick={() => handleCompleteTask(task.id)}
                        icon={CheckCircle2}
                        className="w-full lg:w-auto"
                      >
                        Complete
                      </Button>
                    </>
                  )}

                  {task.status === 'Completed' && (
                    <div className="flex items-center space-x-2 text-[var(--success)]">
                      <CheckCircle2 size={20} />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Update Progress Modal */}
      <Modal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        title="Update Task Progress"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-3">
              Progress: {progressValue}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={progressValue}
              onChange={(e) => setProgressValue(parseInt(e.target.value))}
              className="w-full h-2 bg-[var(--secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
            />
            <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="h-4 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[var(--primary)] rounded-full transition-all duration-300"
              style={{ width: `${progressValue}%` }}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={() => setIsProgressModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProgress}>
              Update Progress
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
