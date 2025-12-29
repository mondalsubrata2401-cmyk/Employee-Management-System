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
      status: "Not Started",
      progress: 0,
      dueDate: "2024-01-15",
      estimatedHours: 8,
      timeSpent: 0,
      startedAt: null,
      isRunning: false,
      category: "Development",
      assignedTo: "emp001",
      assignedBy: "adm001",
      assignedDate: "2024-01-08"
    },
    {
      id: 2,
      title: "Review Q4 Performance Reports",
      description: "Analyze team performance metrics for Q4",
      priority: "Medium",
      status: "Not Started",
      progress: 0,
      dueDate: "2024-01-12",
      estimatedHours: 4,
      timeSpent: 0,
      startedAt: null,
      isRunning: false,
      category: "Review",
      assignedTo: "emp001",
      assignedBy: "adm001",
      assignedDate: "2024-01-08"
    },
    {
      id: 3,
      title: "Prepare Client Presentation",
      description: "Create slides for upcoming client meeting",
      priority: "High",
      status: "Not Started",
      progress: 0,
      dueDate: "2024-01-10",
      estimatedHours: 6,
      timeSpent: 0,
      startedAt: null,
      isRunning: false,
      category: "Presentation",
      assignedTo: "emp001",
      assignedBy: "adm001",
      assignedDate: "2024-01-07"
    },
    {
      id: 4,
      title: "Code Review - Authentication Module",
      description: "Review and approve authentication feature PR",
      priority: "Low",
      status: "Not Started",
      progress: 0,
      dueDate: "2024-01-18",
      estimatedHours: 2,
      timeSpent: 0,
      startedAt: null,
      isRunning: false,
      category: "Review",
      assignedTo: "emp001",
      assignedBy: "adm001",
      assignedDate: "2024-01-08"
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
