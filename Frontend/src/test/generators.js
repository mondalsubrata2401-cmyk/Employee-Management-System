/**
 * Test Data Generators using fast-check
 * Generates random test data for Employee, Task, and related types
 */

import * as fc from 'fast-check';

// Enum generators
export const experienceLevelArb = () => 
  fc.constantFrom('Junior', 'Mid', 'Senior', 'Lead');

export const employeeStatusArb = () => 
  fc.constantFrom('Present', 'WFH', 'On Leave', 'Sick');

export const workloadLevelArb = () => 
  fc.constantFrom('Low', 'Balanced', 'High', 'Overloaded');

export const overtimeLevelArb = () => 
  fc.constantFrom('Low', 'Medium', 'High');

export const trendDirectionArb = () => 
  fc.constantFrom('improving', 'stable', 'declining');

export const contextSwitchLevelArb = () => 
  fc.constantFrom('Low', 'Medium', 'High');

export const riskLevelArb = () => 
  fc.constantFrom('Low', 'Medium', 'High');

export const skillLevelArb = () => 
  fc.constantFrom('New', 'Comfortable', 'Expert');

export const priorityArb = () => 
  fc.constantFrom('Low', 'Medium', 'High');

export const complexityLevelArb = () => 
  fc.constantFrom('Low', 'Medium', 'High');

export const taskStateArb = () => 
  fc.constantFrom('Not Started', 'In Progress', 'Review', 'Completed');

export const alertTypeArb = () => 
  fc.constantFrom('overload', 'frequent_delays', 'under_utilization', 'skill_mismatch', 'performance_decline');

export const alertSeverityArb = () => 
  fc.constantFrom('info', 'warning', 'critical');

// Skill generator
export const skillArb = () => 
  fc.record({
    name: fc.constantFrom('React', 'TypeScript', 'Node.js', 'UI Design', 'User Research', 'Prototyping', 'Testing', 'Design Systems', 'Figma', 'Illustration'),
    level: skillLevelArb(),
    yearsExp: fc.double({ min: 0, max: 15, noNaN: true })
  });

// Workload metrics generator
export const workloadMetricsArb = () => 
  fc.record({
    activeTasks: fc.integer({ min: 0, max: 20 }),
    tasksDueThisWeek: fc.integer({ min: 0, max: 10 }),
    workloadLevel: workloadLevelArb(),
    avgDailyHours: fc.double({ min: 0, max: 12, noNaN: true }),
    capacity: fc.integer({ min: 0, max: 100 }),
    availableHours: fc.double({ min: 0, max: 40, noNaN: true })
  });

// Productivity metrics generator
export const productivityMetricsArb = () => 
  fc.record({
    avgCompletionTime: fc.double({ min: 0, max: 30, noNaN: true }),
    onTimeRate: fc.integer({ min: 0, max: 100 }),
    overdueRate: fc.integer({ min: 0, max: 100 }),
    idleTime: fc.integer({ min: 0, max: 100 }),
    productiveTime: fc.integer({ min: 0, max: 100 }),
    overtimeFrequency: overtimeLevelArb(),
    taskVelocity: fc.double({ min: 0, max: 10, noNaN: true }),
    focusScore: fc.integer({ min: 0, max: 100 })
  });

// Performance metrics generator
export const performanceMetricsArb = () => 
  fc.record({
    weeklyCompletionRate: fc.integer({ min: 0, max: 100 }),
    monthlyCompletionRate: fc.integer({ min: 0, max: 100 }),
    trend: trendDirectionArb(),
    reliabilityScore: fc.integer({ min: 0, max: 100 }),
    consistencyScore: fc.integer({ min: 0, max: 100 }),
    successRate: fc.integer({ min: 0, max: 100 }),
    deadlineAdherence: fc.integer({ min: 0, max: 100 }),
    qualityScore: fc.integer({ min: 0, max: 100 })
  });

// Quality metrics generator
export const qualityMetricsArb = () => 
  fc.record({
    reworkCount: fc.integer({ min: 0, max: 20 }),
    avgReviewScore: fc.double({ min: 0, max: 5, noNaN: true }),
    bugCount: fc.integer({ min: 0, max: 50 }),
    approvalRate: fc.integer({ min: 0, max: 100 })
  });

// Behavioral metrics generator
export const behavioralMetricsArb = () => 
  fc.record({
    peakHours: fc.constantFrom('9:00 AM - 1:00 PM', '10:00 AM - 2:00 PM', '2:00 PM - 6:00 PM', '3:00 PM - 7:00 PM'),
    focusTimePattern: fc.constantFrom('Morning person', 'Afternoon person', 'Evening person'),
    contextSwitching: contextSwitchLevelArb(),
    burnoutRisk: riskLevelArb(),
    collaborationScore: fc.integer({ min: 0, max: 100 })
  });

// Task history metrics generator
export const taskHistoryMetricsArb = () => 
  fc.record({
    totalCompleted: fc.integer({ min: 0, max: 500 }),
    totalAssigned: fc.integer({ min: 0, max: 600 }),
    avgTasksPerWeek: fc.double({ min: 0, max: 10, noNaN: true }),
    preferredCategories: fc.array(
      fc.constantFrom('Development', 'Design', 'Review', 'Presentation', 'Documentation', 'Meeting', 'Bug Fix', 'Feature'),
      { minLength: 1, maxLength: 5 }
    )
  });

// Employee generator
export const employeeArb = () => 
  fc.record({
    id: fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`),
    name: fc.string({ minLength: 5, maxLength: 30 }),
    email: fc.emailAddress(),
    role: fc.constantFrom('Senior Product Designer', 'Frontend Developer', 'Backend Developer', 'Junior Designer', 'Product Manager', 'QA Engineer'),
    department: fc.constantFrom('Product Design', 'Engineering', 'Product', 'Quality Assurance'),
    employeeId: fc.string({ minLength: 5, maxLength: 15 }).map(s => `EMP-${s}`),
    phone: fc.string({ minLength: 10, maxLength: 15 }),
    manager: fc.string({ minLength: 5, maxLength: 30 }),
    joinDate: fc.date({ min: new Date('2020-01-01'), max: new Date() }).map(d => d.toISOString().split('T')[0]),
    experienceLevel: experienceLevelArb(),
    currentStatus: employeeStatusArb(),
    workload: workloadMetricsArb(),
    productivity: productivityMetricsArb(),
    skills: fc.array(skillArb(), { minLength: 1, maxLength: 8 }),
    performance: performanceMetricsArb(),
    quality: qualityMetricsArb(),
    behavior: behavioralMetricsArb(),
    taskHistory: taskHistoryMetricsArb()
  });

// Task generator
export const taskArb = () => 
  fc.record({
    id: fc.string({ minLength: 5, maxLength: 10 }).map(s => `task${s}`),
    title: fc.string({ minLength: 10, maxLength: 50 }),
    description: fc.string({ minLength: 20, maxLength: 200 }),
    category: fc.constantFrom('Development', 'Design', 'Review', 'Presentation', 'Documentation', 'Meeting', 'Bug Fix', 'Feature'),
    priority: priorityArb(),
    complexity: complexityLevelArb(),
    estimatedHours: fc.double({ min: 1, max: 40, noNaN: true }),
    dueDate: fc.date({ min: new Date(), max: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) }),
    requiredSkills: fc.array(
      fc.constantFrom('React', 'TypeScript', 'Node.js', 'UI Design', 'User Research', 'Prototyping', 'Testing'),
      { minLength: 1, maxLength: 4 }
    ),
    state: taskStateArb(),
    progress: fc.integer({ min: 0, max: 100 }),
    assignedTo: fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`),
    createdAt: fc.date({ min: new Date('2024-01-01'), max: new Date() }),
    lastActivity: fc.date({ min: new Date('2024-01-01'), max: new Date() })
  });

// Task assignment generator
export const taskAssignmentArb = () => 
  fc.record({
    title: fc.string({ minLength: 10, maxLength: 50 }),
    description: fc.string({ minLength: 20, maxLength: 200 }),
    category: fc.constantFrom('Development', 'Design', 'Review', 'Presentation', 'Documentation', 'Meeting', 'Bug Fix', 'Feature'),
    priority: priorityArb(),
    complexity: complexityLevelArb(),
    estimatedHours: fc.double({ min: 1, max: 40, noNaN: true }),
    dueDate: fc.date({ min: new Date(), max: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) }),
    requiredSkills: fc.array(
      fc.constantFrom('React', 'TypeScript', 'Node.js', 'UI Design', 'User Research', 'Prototyping', 'Testing'),
      { minLength: 1, maxLength: 4 }
    )
  });

// Alert generator
export const alertArb = () => 
  fc.record({
    id: fc.string({ minLength: 5, maxLength: 10 }).map(s => `alert${s}`),
    type: alertTypeArb(),
    severity: alertSeverityArb(),
    message: fc.string({ minLength: 20, maxLength: 100 }),
    employeeId: fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`),
    timestamp: fc.date({ min: new Date('2024-01-01'), max: new Date() }),
    actionable: fc.boolean(),
    suggestion: fc.option(fc.string({ minLength: 20, maxLength: 100 }), { nil: undefined })
  });

// Employee recommendation generator
export const employeeRecommendationArb = () => 
  fc.record({
    employee: employeeArb(),
    score: fc.integer({ min: 0, max: 100 }),
    matchReasons: fc.array(fc.string({ minLength: 10, maxLength: 50 }), { minLength: 1, maxLength: 5 }),
    riskLevel: riskLevelArb(),
    suggestedDeadline: fc.date({ min: new Date(), max: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) })
  });

// Risk assessment generator
export const riskAssessmentArb = () => 
  fc.record({
    level: riskLevelArb(),
    score: fc.integer({ min: 0, max: 100 }),
    factors: fc.array(fc.string({ minLength: 10, maxLength: 50 }), { minLength: 0, maxLength: 5 })
  });

// Skill match score generator
export const skillMatchScoreArb = () => 
  fc.record({
    percentage: fc.integer({ min: 0, max: 100 }),
    matchedSkills: fc.array(skillArb(), { minLength: 0, maxLength: 5 }),
    missingSkills: fc.array(fc.string({ minLength: 3, maxLength: 20 }), { minLength: 0, maxLength: 5 }),
    learningCurve: skillLevelArb()
  });

// Time entry generator (for time tracking)
export const timeEntryArb = () => 
  fc.record({
    id: fc.string({ minLength: 5, maxLength: 10 }).map(s => `time${s}`),
    employeeId: fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`),
    taskId: fc.string({ minLength: 5, maxLength: 10 }).map(s => `task${s}`),
    date: fc.date({ min: new Date('2024-01-01'), max: new Date() }),
    hours: fc.double({ min: 0.5, max: 12, noNaN: true }),
    type: fc.constantFrom('productive', 'idle', 'overtime', 'meeting')
  });

// Team statistics generator
export const teamStatisticsArb = () => 
  fc.record({
    totalEmployees: fc.integer({ min: 1, max: 50 }),
    activeEmployees: fc.integer({ min: 1, max: 50 }),
    avgTeamCapacity: fc.double({ min: 0, max: 100, noNaN: true }),
    totalActiveTasks: fc.integer({ min: 0, max: 200 }),
    taskBacklog: fc.integer({ min: 0, max: 100 }),
    avgTaskCycleTime: fc.double({ min: 1, max: 30, noNaN: true }),
    teamProductivity: fc.integer({ min: 0, max: 100 }),
    bottleneckEmployees: fc.array(fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`), { minLength: 0, maxLength: 5 }),
    topPerformers: fc.array(fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`), { minLength: 0, maxLength: 5 }),
    underUtilized: fc.array(fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`), { minLength: 0, maxLength: 5 }),
    overloaded: fc.array(fc.string({ minLength: 5, maxLength: 10 }).map(s => `emp${s}`), { minLength: 0, maxLength: 5 })
  });
