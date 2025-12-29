import { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Update Employee Dashboard UI",
      description: "Redesign the dashboard with new metrics and charts",
      priority: "High",
      status: "In Progress",
      progress: 65,
      dueDate: "2025-01-05",
      estimatedHours: 8,
      timeSpent: 18000, // 5 hours in seconds
      startedAt: null,
      isRunning: false,
      category: "Development",
      assignedTo: "emp001",
      assignedBy: "adm001",
      assignedDate: "2024-12-28",
      lastActivityAt: new Date().toISOString(),
      plannedStartDate: "2024-12-28",
      actualStartDate: "2024-12-28",
      complexity: "High",
      reworkCount: 1,
      reviewScore: 4.2,
      bugCount: 2,
      approved: false,
      reviewFeedback: "Good progress, minor fixes needed"
    },
    {
      id: 2,
      title: "Review Q4 Performance Reports",
      description: "Analyze team performance metrics for Q4",
      priority: "Medium",
      status: "Not Started",
      progress: 0,
      dueDate: "2025-01-02",
      estimatedHours: 4,
      timeSpent: 0,
      startedAt: null,
      isRunning: false,
      category: "Review",
      assignedTo: "emp001",
      assignedBy: "adm001",
      assignedDate: "2024-12-27",
      lastActivityAt: new Date().toISOString(),
      plannedStartDate: "2024-12-30",
      actualStartDate: null,
      complexity: "Medium",
      reworkCount: 0,
      reviewScore: null,
      bugCount: 0,
      approved: false,
      reviewFeedback: null
    },
    {
      id: 3,
      title: "Prepare Client Presentation",
      description: "Create slides for upcoming client meeting",
      priority: "High",
      status: "Review",
      progress: 90,
      dueDate: "2025-01-03",
      estimatedHours: 6,
      timeSpent: 19800, // 5.5 hours
      startedAt: null,
      isRunning: false,
      category: "Presentation",
      assignedTo: "emp002",
      assignedBy: "adm001",
      assignedDate: "2024-12-26",
      lastActivityAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      plannedStartDate: "2024-12-26",
      actualStartDate: "2024-12-27",
      complexity: "Medium",
      reworkCount: 2,
      reviewScore: 4.5,
      bugCount: 0,
      approved: false,
      reviewFeedback: "Excellent work, minor formatting updates needed"
    },
    {
      id: 4,
      title: "Code Review - Authentication Module",
      description: "Review and approve authentication feature PR",
      priority: "Low",
      status: "Completed",
      progress: 100,
      dueDate: "2024-12-28",
      estimatedHours: 2,
      timeSpent: 6300, // 1.75 hours
      startedAt: null,
      isRunning: false,
      category: "Review",
      assignedTo: "emp001",
      assignedBy: "adm001",
      assignedDate: "2024-12-26",
      lastActivityAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      plannedStartDate: "2024-12-26",
      actualStartDate: "2024-12-27",
      completedDate: "2024-12-28",
      complexity: "Low",
      reworkCount: 0,
      reviewScore: 4.8,
      bugCount: 0,
      approved: true,
      reviewFeedback: "Perfect implementation, no issues found"
    },
    {
      id: 5,
      title: "Database Migration Script",
      description: "Create and test migration scripts for new schema",
      priority: "High",
      status: "In Progress",
      progress: 45,
      dueDate: "2025-01-04",
      estimatedHours: 10,
      timeSpent: 14400, // 4 hours
      startedAt: null,
      isRunning: false,
      category: "Development",
      assignedTo: "emp002",
      assignedBy: "adm001",
      assignedDate: "2024-12-28",
      lastActivityAt: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
      plannedStartDate: "2024-12-28",
      actualStartDate: "2024-12-28",
      complexity: "High",
      reworkCount: 1,
      reviewScore: null,
      bugCount: 3,
      approved: false,
      reviewFeedback: "On track, needs more testing"
    }
  ]);

  const [timers, setTimers] = useState({});

  // Add new task (Admin only)
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      status: 'Not Started',
      progress: 0,
      timeSpent: 0,
      startedAt: null,
      isRunning: false,
      assignedDate: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  // Update task
  const updateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  // Start task timer
  const startTask = (taskId) => {
    const now = Date.now();
    
    updateTask(taskId, {
      status: tasks.find(t => t.id === taskId)?.status === 'Not Started' ? 'In Progress' : tasks.find(t => t.id === taskId)?.status,
      isRunning: true,
      startedAt: now
    });

    // Start timer
    const interval = setInterval(() => {
      setTasks(prevTasks => prevTasks.map(t => {
        if (t.id === taskId && t.isRunning) {
          return { ...t, timeSpent: t.timeSpent + 1 };
        }
        return t;
      }));
    }, 1000);

    setTimers(prev => ({ ...prev, [taskId]: interval }));
  };

  // Pause task timer
  const pauseTask = (taskId) => {
    if (timers[taskId]) {
      clearInterval(timers[taskId]);
      setTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[taskId];
        return newTimers;
      });
    }

    updateTask(taskId, {
      isRunning: false,
      startedAt: null
    });
  };

  // Complete task
  const completeTask = (taskId) => {
    pauseTask(taskId);
    updateTask(taskId, {
      status: 'Completed',
      progress: 100,
      isRunning: false
    });
  };

  // Get tasks for specific user
  const getTasksForUser = (userId) => {
    return tasks.filter(task => task.assignedTo === userId);
  };

  // Get all tasks (Admin view)
  const getAllTasks = () => {
    return tasks;
  };

  return (
    <TasksContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      startTask,
      pauseTask,
      completeTask,
      getTasksForUser,
      getAllTasks
    }}>
      {children}
    </TasksContext.Provider>
  );
};
