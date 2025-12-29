import { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckSquare, 
  TrendingUp,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  Target
} from 'lucide-react';
import { Card, Badge, Button, Avatar, Modal } from '../components/ui';
import { useUser } from '../context/UserContext';
import { useTasks } from '../context/TasksContext';
import { USER_PROFILE, STATS, ATTENDANCE_LOGS, ANNOUNCEMENTS, TEAM_MEMBERS } from '../data/mockData';

/**
 * Dashboard View Component
 */
export const DashboardView = ({ setActiveTab }) => {
  const { getUserProfile } = useUser();
  const { getTasksForUser, startTask, pauseTask, updateTask, completeTask } = useTasks();
  const userProfile = getUserProfile();
  
  // Get real tasks for current user
  const userTasks = getTasksForUser(userProfile.id);
  const pendingTasks = userTasks.filter(t => t.status !== 'Completed').length;

  // Task action modal state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progressValue, setProgressValue] = useState(0);

  // Handle task click
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setProgressValue(task.progress || 0);
    setIsTaskModalOpen(true);
  };

  // Handle start/pause task
  const handleToggleTask = () => {
    if (selectedTask.isRunning) {
      pauseTask(selectedTask.id);
    } else {
      startTask(selectedTask.id);
    }
    setIsTaskModalOpen(false);
  };

  // Handle update progress
  const handleUpdateProgress = () => {
    updateTask(selectedTask.id, { 
      progress: progressValue,
      status: progressValue === 100 ? 'Completed' : progressValue > 0 ? 'In Progress' : 'Not Started'
    });
    setIsTaskModalOpen(false);
  };

  // Handle complete task
  const handleCompleteTask = () => {
    completeTask(selectedTask.id);
    setIsTaskModalOpen(false);
  };

  return (
  <div className="space-y-6">
    {/* Welcome Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 p-6 flex items-center justify-between bg-linear-to-r from-indigo-600 to-indigo-800 text-white border-none">
        <div>
          <h1 className="text-2xl font-bold mb-2">Good Morning, {userProfile.name.split(' ')[0]}!</h1>
          <p className="text-indigo-100">You have {pendingTasks} tasks pending for today. Make it a productive one.</p>
          <div className="mt-6 flex space-x-3">
            <button onClick={() => setActiveTab('tasks')} className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors">
              View Tasks
            </button>
            <button className="px-4 py-2 bg-white text-indigo-900 hover:bg-indigo-50 rounded-lg text-sm font-medium transition-colors">
              Clock In
            </button>
          </div>
        </div>
        <div className="hidden lg:block opacity-80">
          <Clock3 size={120} strokeWidth={1} />
        </div>
      </Card>

      <Card className="p-6 flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--success-bg)] text-[var(--success)] flex items-center justify-center mb-3">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-[var(--muted-foreground)] font-medium text-sm">Attendance Status</h3>
        <p className="text-xl font-bold text-[var(--text-primary)] mt-1">On Time</p>
        <span className="text-xs text-[var(--success)] font-medium mt-1">Punch In: 09:02 AM</span>
      </Card>
    </div>

    {/* Quick Stats Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "Leave Balance", value: STATS.leaveBalance, unit: "Days", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Avg. Hours", value: "8.5", unit: "Hrs/Day", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Performance", value: STATS.avgPerformance, unit: "/ 5.0", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Tasks Done", value: "124", unit: "This Year", icon: CheckSquare, color: "text-emerald-600", bg: "bg-emerald-50" },
      ].map((stat, idx) => (
        <Card key={idx} className="p-4 flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
            <stat.icon size={20} />
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">{stat.label}</p>
            <p className="text-lg font-bold text-[var(--text-primary)]">{stat.value} <span className="text-xs font-normal text-[var(--muted-foreground)]">{stat.unit}</span></p>
          </div>
        </Card>
      ))}
    </div>

    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[var(--text-primary)]">My Tasks</h3>
              <MoreHorizontal size={16} className="text-[var(--muted-foreground)] cursor-pointer" />
            </div>
            <ul className="space-y-3">
              {userTasks.length === 0 ? (
                <li className="text-center py-8 text-[var(--muted-foreground)]">
                  <CheckSquare size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No tasks assigned yet</p>
                </li>
              ) : (
                userTasks.slice().reverse().slice(0, 5).map(task => (
                  <li 
                    key={task.id} 
                    onClick={() => handleTaskClick(task)}
                    className="flex items-start justify-between p-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-foreground)]">{task.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Badge type={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'indigo' : 'neutral'}>
                      {task.status}
                    </Badge>
                  </li>
                ))
              )}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[var(--text-primary)]">Leave Balance</h3>
              <button onClick={() => setActiveTab('leave')} className="text-xs bg-[var(--accent)] text-[var(--accent-foreground)] px-2 py-1 rounded font-medium hover:bg-[var(--accent)]/80">Apply New</button>
            </div>
            <div className="space-y-4">
              {[
                { type: 'Casual Leave', used: 4, total: 12, color: 'bg-emerald-500' },
                { type: 'Sick Leave', used: 2, total: 7, color: 'bg-rose-500' },
                { type: 'Earned Leave', used: 5, total: 20, color: 'bg-amber-500' },
              ].map((leave, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)] font-medium">{leave.type}</span>
                    <span className="text-[var(--muted-foreground)]">{leave.used}/{leave.total} days</span>
                  </div>
                  <div className="h-2 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${leave.color}`} 
                      style={{ width: `${(leave.used / leave.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
            <h3 className="font-semibold text-[var(--text-primary)]">Recent Attendance</h3>
            <button onClick={() => setActiveTab('attendance')} className="text-[var(--primary)] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--muted)] text-[var(--muted-foreground)] font-medium">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Check In</th>
                  <th className="px-6 py-3">Check Out</th>
                  <th className="px-6 py-3">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {ATTENDANCE_LOGS.map((log, i) => (
                  <tr key={i} className="hover:bg-[var(--muted)]/50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-[var(--text-secondary)]">{log.date}</td>
                    <td className="px-6 py-3.5">
                      <Badge type={log.status === "Present" ? "success" : "neutral"}>{log.status}</Badge>
                    </td>
                    <td className="px-6 py-3.5 text-[var(--muted-foreground)]">{log.checkIn}</td>
                    <td className="px-6 py-3.5 text-[var(--muted-foreground)]">{log.checkOut}</td>
                    <td className="px-6 py-3.5 text-[var(--muted-foreground)]">{log.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <Card className="p-5">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Announcements</h3>
          <div className="space-y-4">
            {ANNOUNCEMENTS.map(item => (
              <div key={item.id} className="pb-4 border-b border-[var(--border)]/50 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <Badge type="indigo">{item.tag}</Badge>
                  <span className="text-xs text-[var(--muted-foreground)]">{item.date}</span>
                </div>
                <h4 className="text-sm font-medium text-[var(--text-primary)] mt-2 hover:text-[var(--primary)] cursor-pointer">{item.title}</h4>
                <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2">{item.content}</p>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-2 text-xs">View All Announcements</Button>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Your Team</h3>
          <div className="space-y-4">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <Avatar name={member.name} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{member.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{member.role}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' : member.status === 'Offline' ? 'bg-slate-300' : 'bg-amber-500'}`} title={member.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-linear-to-r from-indigo-600 to-indigo-800 border-none relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-white font-medium mb-1">Upcoming Holiday</h4>
            <p className="text-2xl font-bold text-white mb-1">New Year's day</p>
            <p className="text-sm opacity-80">Thursday, Jan 1</p>
          </div>
          <Calendar className="absolute -right-4 -bottom-4 text-slate-300 opacity-20" size={100} />
        </Card>
      </div>
    </div>

    {/* Task Action Modal */}
    {selectedTask && (
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Task Actions"
      >
        <div className="space-y-4">
          {/* Task Info */}
          <div className="p-4 bg-[var(--muted)] rounded-lg">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              {selectedTask.title}
            </h3>
            {selectedTask.description && (
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                {selectedTask.description}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <Badge type={
                selectedTask.status === 'Completed' ? 'success' :
                selectedTask.status === 'In Progress' ? 'indigo' :
                selectedTask.status === 'Review' ? 'warning' :
                'neutral'
              }>
                {selectedTask.status}
              </Badge>
              <Badge type={
                selectedTask.priority === 'High' ? 'danger' :
                selectedTask.priority === 'Medium' ? 'warning' :
                'success'
              }>
                {selectedTask.priority} Priority
              </Badge>
            </div>
          </div>

          {/* Progress Update */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">
              Update Progress
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={progressValue}
                onChange={(e) => setProgressValue(parseInt(e.target.value))}
                className="flex-1 h-2 bg-[var(--secondary)] rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-semibold text-[var(--text-primary)] min-w-[3rem]">
                {progressValue}%
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--secondary)] rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  progressValue === 100 
                    ? 'bg-[rgb(var(--success))]' 
                    : progressValue >= 50 
                    ? 'bg-[rgb(var(--info))]' 
                    : 'bg-[rgb(var(--primary))]'
                }`}
                style={{ width: `${progressValue}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border)]">
            <Button
              onClick={handleToggleTask}
              variant="outline"
              className="w-full"
              icon={selectedTask.isRunning ? Pause : Play}
            >
              {selectedTask.isRunning ? 'Pause Task' : 'Start Task'}
            </Button>
            
            <Button
              onClick={handleUpdateProgress}
              variant="outline"
              className="w-full"
              icon={Target}
            >
              Update Progress to {progressValue}%
            </Button>

            {selectedTask.status !== 'Completed' && (
              <Button
                onClick={handleCompleteTask}
                variant="primary"
                className="w-full"
                icon={CheckCircle2}
              >
                Mark as Complete
              </Button>
            )}

            <Button
              variant="ghost"
              onClick={() => setIsTaskModalOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    )}
  </div>
  );
};
