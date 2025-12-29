/**
 * Test Utilities for Rendering Components with Mock Contexts
 * Provides helper functions for testing React components with required contexts
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../context/UserContext';
import { TasksProvider } from '../context/TasksContext';
import { ThemeProvider } from '../context/ThemeContext';

/**
 * Custom render function that wraps components with all necessary providers
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} options - Render options
 * @param {Object} options.userContextValue - Mock value for UserContext
 * @param {Object} options.tasksContextValue - Mock value for TasksContext
 * @param {Object} options.themeContextValue - Mock value for ThemeContext
 * @param {Object} options.renderOptions - Additional options to pass to render
 * @returns {Object} - Render result with additional utilities
 */
export function renderWithProviders(
  ui,
  {
    userContextValue = null,
    tasksContextValue = null,
    themeContextValue = null,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    let content = children;

    // Wrap with ThemeProvider if needed
    if (themeContextValue !== null) {
      content = (
        <ThemeProvider value={themeContextValue}>
          {content}
        </ThemeProvider>
      );
    } else {
      content = <ThemeProvider>{content}</ThemeProvider>;
    }

    // Wrap with TasksProvider if needed
    if (tasksContextValue !== null) {
      content = (
        <TasksProvider value={tasksContextValue}>
          {content}
        </TasksProvider>
      );
    } else {
      content = <TasksProvider>{content}</TasksProvider>;
    }

    // Wrap with UserProvider if needed
    if (userContextValue !== null) {
      content = (
        <UserProvider value={userContextValue}>
          {content}
        </UserProvider>
      );
    } else {
      content = <UserProvider>{content}</UserProvider>;
    }

    // Wrap with Router
    content = <BrowserRouter>{content}</BrowserRouter>;

    return content;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Render component with only Router (no context providers)
 * @param {React.ReactElement} ui - The component to render
 * @param {Object} renderOptions - Additional options to pass to render
 * @returns {Object} - Render result
 */
export function renderWithRouter(ui, renderOptions = {}) {
  function Wrapper({ children }) {
    return <BrowserRouter>{children}</BrowserRouter>;
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Create mock user context value
 * @param {Object} overrides - Properties to override in the default mock
 * @returns {Object} - Mock user context value
 */
export function createMockUserContext(overrides = {}) {
  return {
    user: {
      name: 'Test User',
      role: 'Admin',
      department: 'Engineering',
      avatar: 'TU',
      employeeId: 'EMP-TEST-001',
      ...overrides.user
    },
    setUser: overrides.setUser || (() => {}),
    logout: overrides.logout || (() => {}),
    ...overrides
  };
}

/**
 * Create mock tasks context value
 * @param {Object} overrides - Properties to override in the default mock
 * @returns {Object} - Mock tasks context value
 */
export function createMockTasksContext(overrides = {}) {
  return {
    tasks: overrides.tasks || [],
    addTask: overrides.addTask || (() => {}),
    updateTask: overrides.updateTask || (() => {}),
    deleteTask: overrides.deleteTask || (() => {}),
    ...overrides
  };
}

/**
 * Create mock theme context value
 * @param {Object} overrides - Properties to override in the default mock
 * @returns {Object} - Mock theme context value
 */
export function createMockThemeContext(overrides = {}) {
  return {
    theme: overrides.theme || 'light',
    toggleTheme: overrides.toggleTheme || (() => {}),
    ...overrides
  };
}

/**
 * Create mock employee data for testing
 * @param {Object} overrides - Properties to override in the default mock
 * @returns {Object} - Mock employee object
 */
export function createMockEmployee(overrides = {}) {
  return {
    id: 'emp001',
    name: 'Test Employee',
    email: 'test@example.com',
    role: 'Developer',
    department: 'Engineering',
    employeeId: 'EMP-2024-001',
    phone: '+1 (555) 123-4567',
    manager: 'Test Manager',
    joinDate: '2024-01-01',
    experienceLevel: 'Mid',
    currentStatus: 'Present',
    workload: {
      activeTasks: 3,
      tasksDueThisWeek: 1,
      workloadLevel: 'Balanced',
      avgDailyHours: 7.5,
      capacity: 60,
      availableHours: 20
    },
    productivity: {
      avgCompletionTime: 4.0,
      onTimeRate: 85,
      overdueRate: 10,
      idleTime: 15,
      productiveTime: 85,
      overtimeFrequency: 'Low',
      taskVelocity: 2.5,
      focusScore: 80
    },
    skills: [
      { name: 'React', level: 'Comfortable', yearsExp: 2 },
      { name: 'TypeScript', level: 'New', yearsExp: 1 }
    ],
    performance: {
      weeklyCompletionRate: 90,
      monthlyCompletionRate: 88,
      trend: 'stable',
      reliabilityScore: 85,
      consistencyScore: 87,
      successRate: 92,
      deadlineAdherence: 85,
      qualityScore: 88
    },
    quality: {
      reworkCount: 2,
      avgReviewScore: 4.2,
      bugCount: 3,
      approvalRate: 90
    },
    behavior: {
      peakHours: '10:00 AM - 2:00 PM',
      focusTimePattern: 'Morning person',
      contextSwitching: 'Low',
      burnoutRisk: 'Low',
      collaborationScore: 85
    },
    taskHistory: {
      totalCompleted: 50,
      totalAssigned: 60,
      avgTasksPerWeek: 3.0,
      preferredCategories: ['Development', 'Review']
    },
    ...overrides
  };
}

/**
 * Create mock task data for testing
 * @param {Object} overrides - Properties to override in the default mock
 * @returns {Object} - Mock task object
 */
export function createMockTask(overrides = {}) {
  return {
    id: 'task001',
    title: 'Test Task',
    description: 'This is a test task',
    category: 'Development',
    priority: 'Medium',
    complexity: 'Medium',
    estimatedHours: 8,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    requiredSkills: ['React', 'TypeScript'],
    state: 'In Progress',
    progress: 50,
    assignedTo: 'emp001',
    createdAt: new Date(),
    lastActivity: new Date(),
    ...overrides
  };
}

/**
 * Create mock alert data for testing
 * @param {Object} overrides - Properties to override in the default mock
 * @returns {Object} - Mock alert object
 */
export function createMockAlert(overrides = {}) {
  return {
    id: 'alert001',
    type: 'overload',
    severity: 'warning',
    message: 'Employee workload is high',
    employeeId: 'emp001',
    timestamp: new Date(),
    actionable: true,
    suggestion: 'Consider redistributing tasks',
    ...overrides
  };
}

/**
 * Wait for async updates in tests
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Promise that resolves after the specified time
 */
export function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
