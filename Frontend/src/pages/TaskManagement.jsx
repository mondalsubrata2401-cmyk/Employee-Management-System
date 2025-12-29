import { useState } from 'react';
import { Plus, X, User, Briefcase, ArrowRightLeft, Bell } from 'lucide-react';
import { Card, Badge, Button, Modal } from '../components/ui';
import { useTasks } from '../context/TasksContext';
import { EMPLOYEES } from '../data/employeeData';

/**
 * Task Management Page for Admin
 * Drag and drop interface to assign tasks to employees
 */
export const TaskManagementView = () => {
  const { tasks, addTask, updateTask } = useTasks();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Development',
    priority: 'Medium',
    dueDate: '',
    estimatedHours: 4,
    complexity: 'Medium'
  });

  // Get unassigned tasks (tasks without assignedTo)
  const unassignedTasks = tasks.filter(task => !task.assignedTo);

  // Get tasks assigned to each employee
  const getEmployeeTasks = (employeeId) => {
    return tasks.filter(task => task.assignedTo === employeeId);
  };

  // Handle add task to queue
  const handleAddTask = () => {
    if (!newTask.title.trim() || !newTask.dueDate) return;

    addTask({
      ...newTask,
      assignedTo: null, // Unassigned initially
      status: 'Not Started',
      progress: 0,
      timeSpent: 0,
      lastActivityAt: new Date().toISOString(),
      plannedStartDate: new Date().toISOString().split('T')[0],
      actualStartDate: null,
      reworkCount: 0,
      reviewScore: null,
      bugCount: 0,
      approved: false,
      reviewFeedback: null
    });

    // Reset form
    setNewTask({
      title: '',
      description: '',
      category: 'Development',
      priority: 'Medium',
      dueDate: '',
      estimatedHours: 4,
      complexity: 'Medium'
    });
    setIsAddModalOpen(false);
  };

  // Drag handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, employeeId) => {
    e.preventDefault();
    if (draggedTask) {
      const previousEmployeeId = draggedTask.assignedTo;
      const isReassignment = previousEmployeeId && previousEmployeeId !== employeeId;
      
      // Update task assignment
      updateTask(draggedTask.id, {
        assignedTo: employeeId,
        assignedDate: new Date().toISOString().split('T')[0],
        lastActivityAt: new Date().toISOString(),
        previousAssignee: isReassignment ? previousEmployeeId : draggedTask.previousAssignee,
        reassignedAt: isReassignment ? new Date().toISOString() : draggedTask.reassignedAt
      });

      // Create handover notification if reassigning
      if (isReassignment) {
        const previousEmployee = EMPLOYEES.find(emp => emp.id === previousEmployeeId);
        const newEmployee = EMPLOYEES.find(emp => emp.id === employeeId);
        
        const notification = {
          id: Date.now(),
          taskId: draggedTask.id,
          taskTitle: draggedTask.title,
          from: previousEmployee?.name || 'Unknown',
          to: newEmployee?.name || 'Unknown',
          timestamp: new Date().toISOString(),
          read: false
        };
        
        setNotifications(prev => [notification, ...prev]);
        
        // Auto-remove notification after 10 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, 10000);
      }
      
      setDraggedTask(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  // Task Card Component
  const TaskCard = ({ task, draggable = true }) => (
    <div
      draggable={draggable}
      onDragStart={(e) => handleDragStart(e, task)}
      onDragEnd={handleDragEnd}
      className={`p-3 bg-[var(--card)] border border-[var(--border)] rounded-lg cursor-move hover:shadow-lg transition-all ${
        draggedTask?.id === task.id ? 'opacity-50' : ''
      }`}
    >
      <h4 className="font-semibold text-[var(--text-primary)] text-sm mb-1 line-clamp-1">
        {task.title}
      </h4>
      {task.description && (
        <p className="text-xs text-[var(--muted-foreground)] mb-2 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex flex-wrap gap-1">
        <Badge type={
          task.priority === 'High' ? 'danger' :
          task.priority === 'Medium' ? 'warning' :
          'neutral'
        } className="text-xs">
          {task.priority}
        </Badge>
        <Badge type="neutral" className="text-xs">{task.category}</Badge>
      </div>
      <div className="mt-2 text-xs text-[var(--muted-foreground)]">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Handover Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-6 z-50 space-y-2 max-w-md">
          {notifications.map(notif => (
            <Card key={notif.id} className="p-4 bg-[var(--info-bg)] border-2 border-[var(--info)] shadow-lg animate-in slide-in-from-right">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[var(--info)] rounded-lg">
                  <ArrowRightLeft size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Bell size={14} className="text-[var(--info)]" />
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm">Task Handover</h4>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-1">
                    <span className="font-medium">{notif.taskTitle}</span>
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">
                    Reassigned from <span className="font-medium text-[var(--text-primary)]">{notif.from}</span> to <span className="font-medium text-[var(--text-primary)]">{notif.to}</span>
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    {new Date(notif.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
                  className="text-[var(--muted-foreground)] hover:text-[var(--text-primary)]"
                >
                  <X size={16} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Task Management
        </h1>
        <p className="text-[var(--muted-foreground)]">
          Add tasks to the queue and drag them to assign to employees
        </p>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left Side - Task Queue */}
        <div className="w-80 flex flex-col">
          <Card className="flex-1 flex flex-col p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                  <Briefcase size={18} />
                  Task Queue
                </h2>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  {unassignedTasks.length} unassigned tasks
                </p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                icon={Plus}
                size="sm"
              >
                Add Task
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {unassignedTasks.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase size={40} className="mx-auto text-[var(--muted-foreground)] opacity-30 mb-3" />
                  <p className="text-sm text-[var(--muted-foreground)]">
                    No tasks in queue
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">
                    Click "Add Task" to create new tasks
                  </p>
                </div>
              ) : (
                unassignedTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Side - Employee Columns */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-4 h-full min-w-max pb-4">
            {EMPLOYEES.map(employee => (
              <div
                key={employee.id}
                className="w-80 flex flex-col"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, employee.id)}
              >
                <Card className="flex-1 flex flex-col p-4">
                  {/* Employee Header */}
                  <div className="mb-4 pb-4 border-b border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent))] flex items-center justify-center text-white text-sm font-bold">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--text-primary)] text-sm">
                          {employee.name}
                        </h3>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {employee.role}
                        </p>
                      </div>
                      <Badge type="neutral" className="text-xs">
                        {employee.experienceLevel}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-[var(--muted-foreground)]">
                        Active Tasks: {getEmployeeTasks(employee.id).length}
                      </span>
                      <Badge type={
                        employee.workload.workloadLevel === 'Low' ? 'success' :
                        employee.workload.workloadLevel === 'Balanced' ? 'info' :
                        employee.workload.workloadLevel === 'High' ? 'warning' : 'danger'
                      } className="text-xs">
                        {employee.workload.workloadLevel}
                      </Badge>
                    </div>
                  </div>

                  {/* Employee Tasks */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {getEmployeeTasks(employee.id).length === 0 ? (
                      <div className="text-center py-8">
                        <User size={32} className="mx-auto text-[var(--muted-foreground)] opacity-30 mb-2" />
                        <p className="text-xs text-[var(--muted-foreground)]">
                          No tasks assigned
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1">
                          Drag tasks here to assign
                        </p>
                      </div>
                    ) : (
                      getEmployeeTasks(employee.id).map(task => (
                        <div key={task.id} className="relative">
                          <TaskCard task={task} draggable={true} />
                          <div className="absolute top-2 right-2">
                            <Badge type={
                              task.status === 'Completed' ? 'success' :
                              task.status === 'In Progress' ? 'indigo' :
                              task.status === 'Review' ? 'warning' :
                              'neutral'
                            } className="text-xs">
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Task to Queue"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Category *
              </label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <option>Development</option>
                <option>Design</option>
                <option>Review</option>
                <option>Presentation</option>
                <option>Documentation</option>
                <option>Bug Fix</option>
                <option>Feature</option>
                <option>Meeting</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Priority *
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Complexity
              </label>
              <select
                value={newTask.complexity}
                onChange={(e) => setNewTask({ ...newTask, complexity: e.target.value })}
                className="w-full px-3 py-2 border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                Estimated Hours *
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

          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <Button variant="ghost" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddTask}
              disabled={!newTask.title.trim() || !newTask.dueDate}
              icon={Plus}
            >
              Add to Queue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
