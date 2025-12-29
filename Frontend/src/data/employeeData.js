/**
 * Employee Data with Performance Metrics
 * Comprehensive employee profiles for admin analytics
 */

export const EMPLOYEES = [
  {
    id: 'emp001',
    name: 'Alex Morgan',
    email: 'alex.morgan@acmehr.com',
    role: 'Senior Product Designer',
    department: 'Product Design',
    employeeId: 'EMP-2021-001',
    phone: '+1 (555) 123-4567',
    manager: 'Sarah Connor',
    joinDate: '2021-08-15',
    experienceLevel: 'Senior', // Junior / Mid / Senior / Lead
    currentStatus: 'Present', // Present / WFH / On Leave / Sick
    
    // Workload & Availability
    workload: {
      activeTasks: 4,
      tasksDueThisWeek: 2,
      workloadLevel: 'Balanced', // Low / Balanced / High / Overloaded
      avgDailyHours: 7.5,
      capacity: 75, // percentage
      availableHours: 20 // hours this week
    },
    
    // Productivity Metrics
    productivity: {
      avgCompletionTime: 4.2, // days
      onTimeRate: 87, // percentage
      overdueRate: 8, // percentage
      idleTime: 15, // percentage
      productiveTime: 85, // percentage
      overtimeFrequency: 'Low', // Low / Medium / High
      taskVelocity: 2.5, // tasks per week
      focusScore: 82 // percentage
    },
    
    // Skills & Expertise
    skills: [
      { name: 'UI Design', level: 'Expert', yearsExp: 5 },
      { name: 'User Research', level: 'Comfortable', yearsExp: 3 },
      { name: 'Prototyping', level: 'Expert', yearsExp: 4 },
      { name: 'React', level: 'Comfortable', yearsExp: 2 },
      { name: 'Design Systems', level: 'Expert', yearsExp: 4 }
    ],
    
    // Performance Trends
    performance: {
      weeklyCompletionRate: 92,
      monthlyCompletionRate: 88,
      trend: 'improving', // improving / stable / declining
      reliabilityScore: 85,
      consistencyScore: 90,
      successRate: 94,
      deadlineAdherence: 87,
      qualityScore: 91
    },
    
    // Work Quality
    quality: {
      reworkCount: 2,
      avgReviewScore: 4.5, // out of 5
      bugCount: 3,
      approvalRate: 95 // percentage
    },
    
    // Behavioral Insights
    behavior: {
      peakHours: '10:00 AM - 2:00 PM',
      focusTimePattern: 'Morning person',
      contextSwitching: 'Low',
      burnoutRisk: 'Low', // Low / Medium / High
      collaborationScore: 88
    },
    
    // Task History
    taskHistory: {
      totalCompleted: 124,
      totalAssigned: 142,
      avgTasksPerWeek: 3.5,
      preferredCategories: ['Development', 'Design', 'Review']
    }
  },
  {
    id: 'emp002',
    name: 'Jordan Lee',
    email: 'jordan.lee@acmehr.com',
    role: 'Frontend Developer',
    department: 'Engineering',
    employeeId: 'EMP-2022-015',
    phone: '+1 (555) 234-5678',
    manager: 'Sarah Connor',
    joinDate: '2022-03-10',
    experienceLevel: 'Mid',
    currentStatus: 'WFH',
    
    workload: {
      activeTasks: 6,
      tasksDueThisWeek: 4,
      workloadLevel: 'High',
      avgDailyHours: 8.2,
      capacity: 92,
      availableHours: 8
    },
    
    productivity: {
      avgCompletionTime: 3.8,
      onTimeRate: 78,
      overdueRate: 15,
      idleTime: 12,
      productiveTime: 88,
      overtimeFrequency: 'Medium',
      taskVelocity: 3.2,
      focusScore: 75
    },
    
    skills: [
      { name: 'React', level: 'Expert', yearsExp: 4 },
      { name: 'TypeScript', level: 'Comfortable', yearsExp: 2 },
      { name: 'Node.js', level: 'Comfortable', yearsExp: 3 },
      { name: 'Testing', level: 'New', yearsExp: 1 }
    ],
    
    performance: {
      weeklyCompletionRate: 85,
      monthlyCompletionRate: 82,
      trend: 'stable',
      reliabilityScore: 78,
      consistencyScore: 80,
      successRate: 88,
      deadlineAdherence: 78,
      qualityScore: 85
    },
    
    quality: {
      reworkCount: 5,
      avgReviewScore: 4.0,
      bugCount: 8,
      approvalRate: 88
    },
    
    behavior: {
      peakHours: '2:00 PM - 6:00 PM',
      focusTimePattern: 'Afternoon person',
      contextSwitching: 'Medium',
      burnoutRisk: 'Medium',
      collaborationScore: 82
    },
    
    taskHistory: {
      totalCompleted: 89,
      totalAssigned: 108,
      avgTasksPerWeek: 4.2,
      preferredCategories: ['Development', 'Bug Fix', 'Feature']
    }
  },
  {
    id: 'emp003',
    name: 'Maya Patel',
    email: 'maya.patel@acmehr.com',
    role: 'Junior Designer',
    department: 'Product Design',
    employeeId: 'EMP-2023-042',
    phone: '+1 (555) 345-6789',
    manager: 'Sarah Connor',
    joinDate: '2023-06-01',
    experienceLevel: 'Junior',
    currentStatus: 'Present',
    
    workload: {
      activeTasks: 2,
      tasksDueThisWeek: 1,
      workloadLevel: 'Low',
      avgDailyHours: 7.0,
      capacity: 45,
      availableHours: 30
    },
    
    productivity: {
      avgCompletionTime: 5.5,
      onTimeRate: 92,
      overdueRate: 5,
      idleTime: 25,
      productiveTime: 75,
      overtimeFrequency: 'Low',
      taskVelocity: 1.8,
      focusScore: 88
    },
    
    skills: [
      { name: 'UI Design', level: 'Comfortable', yearsExp: 1 },
      { name: 'Figma', level: 'Comfortable', yearsExp: 1.5 },
      { name: 'Illustration', level: 'New', yearsExp: 0.5 }
    ],
    
    performance: {
      weeklyCompletionRate: 95,
      monthlyCompletionRate: 93,
      trend: 'improving',
      reliabilityScore: 92,
      consistencyScore: 88,
      successRate: 96,
      deadlineAdherence: 92,
      qualityScore: 89
    },
    
    quality: {
      reworkCount: 1,
      avgReviewScore: 4.3,
      bugCount: 1,
      approvalRate: 93
    },
    
    behavior: {
      peakHours: '9:00 AM - 1:00 PM',
      focusTimePattern: 'Morning person',
      contextSwitching: 'Low',
      burnoutRisk: 'Low',
      collaborationScore: 90
    },
    
    taskHistory: {
      totalCompleted: 34,
      totalAssigned: 37,
      avgTasksPerWeek: 2.1,
      preferredCategories: ['Design', 'Documentation', 'Review']
    }
  }
];

// Team-level statistics
export const TEAM_STATS = {
  totalEmployees: 3,
  activeEmployees: 3,
  avgTeamCapacity: 70.67,
  totalActiveTasks: 12,
  taskBacklog: 5,
  avgTaskCycleTime: 4.5, // days
  teamProductivity: 85,
  bottleneckEmployees: ['emp002'],
  topPerformers: ['emp001', 'emp003'],
  underUtilized: ['emp003'],
  overloaded: []
};

// Task complexity analysis
export const TASK_COMPLEXITY_FACTORS = {
  Development: { baseComplexity: 'Medium', avgTime: 5 },
  Design: { baseComplexity: 'Medium', avgTime: 4 },
  Review: { baseComplexity: 'Low', avgTime: 2 },
  Presentation: { baseComplexity: 'Medium', avgTime: 6 },
  Documentation: { baseComplexity: 'Low', avgTime: 3 },
  Meeting: { baseComplexity: 'Low', avgTime: 1 },
  'Bug Fix': { baseComplexity: 'High', avgTime: 3 },
  Feature: { baseComplexity: 'High', avgTime: 8 }
};

// Smart recommendation engine
export const getRecommendedEmployee = (taskCategory, taskPriority, estimatedHours) => {
  const employees = EMPLOYEES.filter(emp => emp.currentStatus !== 'On Leave');
  
  // Score each employee
  const scored = employees.map(emp => {
    let score = 0;
    
    // Workload score (prefer lower workload)
    if (emp.workload.workloadLevel === 'Low') score += 30;
    else if (emp.workload.workloadLevel === 'Balanced') score += 20;
    else if (emp.workload.workloadLevel === 'High') score += 5;
    
    // Skill match score
    const hasSkill = emp.skills.some(skill => 
      skill.name.toLowerCase().includes(taskCategory.toLowerCase())
    );
    if (hasSkill) score += 25;
    
    // Performance score
    score += emp.performance.reliabilityScore * 0.2;
    
    // Capacity score
    if (emp.workload.availableHours >= estimatedHours) score += 15;
    
    // Priority handling
    if (taskPriority === 'High' && emp.experienceLevel === 'Senior') score += 10;
    
    return { ...emp, recommendationScore: Math.round(score) };
  });
  
  // Sort by score
  scored.sort((a, b) => b.recommendationScore - a.recommendationScore);
  
  return scored;
};

// Risk assessment
export const assessTaskRisk = (employee, estimatedHours, dueDate) => {
  let riskScore = 0;
  let riskFactors = [];
  
  // Workload risk
  if (employee.workload.workloadLevel === 'High') {
    riskScore += 30;
    riskFactors.push('High current workload');
  } else if (employee.workload.workloadLevel === 'Overloaded') {
    riskScore += 50;
    riskFactors.push('Employee overloaded');
  }
  
  // Capacity risk
  if (employee.workload.availableHours < estimatedHours) {
    riskScore += 25;
    riskFactors.push('Insufficient available hours');
  }
  
  // Performance risk
  if (employee.productivity.onTimeRate < 80) {
    riskScore += 20;
    riskFactors.push('Below average on-time delivery');
  }
  
  // Deadline risk
  const daysUntilDue = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  if (daysUntilDue < 3) {
    riskScore += 15;
    riskFactors.push('Tight deadline');
  }
  
  // Burnout risk
  if (employee.behavior.burnoutRisk === 'High') {
    riskScore += 20;
    riskFactors.push('High burnout risk');
  }
  
  let riskLevel = 'Low';
  if (riskScore > 60) riskLevel = 'High';
  else if (riskScore > 30) riskLevel = 'Medium';
  
  return {
    level: riskLevel,
    score: riskScore,
    factors: riskFactors
  };
};
