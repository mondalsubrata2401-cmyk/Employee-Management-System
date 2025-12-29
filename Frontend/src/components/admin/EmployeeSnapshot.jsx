import { 
  User, 
  Briefcase, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Award,
  Activity,
  Brain,
  Calendar,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { Card, Badge } from '../ui';
import { EMPLOYEES } from '../../data/employeeData';

/**
 * Employee Snapshot Component
 * Comprehensive employee overview before task assignment
 */
export const EmployeeSnapshot = ({ employeeId, taskCategory, estimatedHours }) => {
  // Get employee data
  const employee = EMPLOYEES.find(emp => emp.id === employeeId);
  
  if (!employee) {
    return (
      <Card className="p-6">
        <p className="text-center text-[rgb(var(--muted-foreground))]">
          Employee not found
        </p>
      </Card>
    );
  }

  // Get workload color
  const getWorkloadColor = (level) => {
    const colors = {
      'Low': { bg: 'bg-[rgb(var(--success-bg))]', text: 'text-[rgb(var(--success))]', badge: 'success' },
      'Balanced': { bg: 'bg-[rgb(var(--info-bg))]', text: 'text-[rgb(var(--info))]', badge: 'info' },
      'High': { bg: 'bg-[rgb(var(--warning-bg))]', text: 'text-[rgb(var(--warning))]', badge: 'warning' },
      'Overloaded': { bg: 'bg-[rgb(var(--error-bg))]', text: 'text-[rgb(var(--error))]', badge: 'danger' }
    };
    return colors[level] || colors['Balanced'];
  };

  const workloadColor = getWorkloadColor(employee.workload.workloadLevel);

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'Present': 'success',
      'WFH': 'info',
      'On Leave': 'warning',
      'Sick': 'danger'
    };
    return colors[status] || 'neutral';
  };

  // Find matching skills for task
  const matchingSkills = taskCategory 
    ? employee.skills.filter(skill => 
        skill.name.toLowerCase().includes(taskCategory.toLowerCase()) ||
        taskCategory.toLowerCase().includes(skill.name.toLowerCase())
      )
    : [];

  // Get performance trend icon
  const getTrendIcon = (trend) => {
    if (trend === 'improving') return { icon: TrendingUp, color: 'text-[rgb(var(--success))]' };
    if (trend === 'declining') return { icon: AlertTriangle, color: 'text-[rgb(var(--error))]' };
    return { icon: Activity, color: 'text-[rgb(var(--info))]' };
  };

  const trendConfig = getTrendIcon(employee.performance.trend);
  const TrendIcon = trendConfig.icon;

  return (
    <div className="space-y-4">
      {/* Header - Basic Info */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-[rgb(var(--accent-foreground))] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-[rgb(var(--text-primary))] mb-1">
                  {employee.name}
                </h3>
                <p className="text-[rgb(var(--text-secondary))] font-medium mb-2">
                  {employee.role}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge type="neutral">
                    <Briefcase size={12} className="mr-1" />
                    {employee.department}
                  </Badge>
                  <Badge type="indigo">
                    {employee.experienceLevel}
                  </Badge>
                  <Badge type={getStatusColor(employee.currentStatus)}>
                    <Activity size={12} className="mr-1" />
                    {employee.currentStatus}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[rgb(var(--muted-foreground))]">
                  Reports to
                </p>
                <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                  {employee.manager}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Workload & Availability */}
      <Card className="p-5">
        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
          <Clock size={18} className="text-[rgb(var(--primary))]" />
          Workload & Availability
        </h4>
        
        {/* Workload Level Indicator */}
        <div className={`p-4 rounded-lg mb-4 ${workloadColor.bg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">
              Current Workload
            </span>
            <Badge type={workloadColor.badge}>
              {employee.workload.workloadLevel}
            </Badge>
          </div>
          <div className="h-2 w-full bg-white/50 rounded-full overflow-hidden">
            <div 
              className={`h-full ${workloadColor.text} opacity-70 rounded-full transition-all`}
              style={{ width: `${employee.workload.capacity}%` }}
            />
          </div>
          <p className="text-xs text-[rgb(var(--text-secondary))] mt-2">
            Capacity: {employee.workload.capacity}%
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Active Tasks
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.workload.activeTasks}
            </p>
          </div>
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Due This Week
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.workload.tasksDueThisWeek}
            </p>
          </div>
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Avg Daily Hours
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.workload.avgDailyHours}h
            </p>
          </div>
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Available Hours
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.workload.availableHours}h
            </p>
          </div>
        </div>
      </Card>

      {/* Productivity Metrics */}
      <Card className="p-5">
        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
          <Zap size={18} className="text-[rgb(var(--primary))]" />
          Productivity Metrics
        </h4>
        
        <div className="space-y-3">
          {/* On-time Rate */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-[rgb(var(--text-secondary))]">
                On-time Completion Rate
              </span>
              <span className="text-sm font-bold text-[rgb(var(--success))]">
                {employee.productivity.onTimeRate}%
              </span>
            </div>
            <div className="h-2 w-full bg-[rgb(var(--secondary))] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[rgb(var(--success))] rounded-full"
                style={{ width: `${employee.productivity.onTimeRate}%` }}
              />
            </div>
          </div>

          {/* Productivity Scores Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center p-2 bg-[rgb(var(--accent))] rounded">
              <p className="text-xs text-[rgb(var(--muted-foreground))]">Avg Completion</p>
              <p className="text-lg font-bold text-[rgb(var(--text-primary))]">
                {employee.productivity.avgCompletionTime}d
              </p>
            </div>
            <div className="text-center p-2 bg-[rgb(var(--accent))] rounded">
              <p className="text-xs text-[rgb(var(--muted-foreground))]">Task Velocity</p>
              <p className="text-lg font-bold text-[rgb(var(--text-primary))]">
                {employee.productivity.taskVelocity}/wk
              </p>
            </div>
            <div className="text-center p-2 bg-[rgb(var(--accent))] rounded">
              <p className="text-xs text-[rgb(var(--muted-foreground))]">Focus Score</p>
              <p className="text-lg font-bold text-[rgb(var(--text-primary))]">
                {employee.productivity.focusScore}%
              </p>
            </div>
          </div>

          {/* Overtime indicator */}
          <div className="flex items-center justify-between p-2 bg-[rgb(var(--muted))] rounded">
            <span className="text-sm text-[rgb(var(--text-secondary))]">
              Overtime Frequency
            </span>
            <Badge type={
              employee.productivity.overtimeFrequency === 'Low' ? 'success' :
              employee.productivity.overtimeFrequency === 'Medium' ? 'warning' : 'danger'
            }>
              {employee.productivity.overtimeFrequency}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Skills & Task Fit */}
      <Card className="p-5">
        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
          <Brain size={18} className="text-[rgb(var(--primary))]" />
          Skills & Task Fit
        </h4>

        {/* Matching Skills */}
        {matchingSkills.length > 0 && (
          <div className="mb-4 p-3 bg-[rgb(var(--success-bg))] border border-[rgb(var(--success))] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-[rgb(var(--success))]" />
              <span className="text-sm font-medium text-[rgb(var(--text-primary))]">
                {matchingSkills.length} Matching Skill{matchingSkills.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchingSkills.map((skill, idx) => (
                <Badge key={idx} type="success">
                  {skill.name} - {skill.level}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* All Skills */}
        <div className="space-y-2">
          {employee.skills.map((skill, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-[rgb(var(--text-primary))]">
                    {skill.name}
                  </span>
                  <Badge type={
                    skill.level === 'Expert' ? 'success' :
                    skill.level === 'Comfortable' ? 'info' : 'warning'
                  } className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
                <div className="h-1.5 w-full bg-[rgb(var(--secondary))] rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      skill.level === 'Expert' ? 'bg-[rgb(var(--success))]' :
                      skill.level === 'Comfortable' ? 'bg-[rgb(var(--info))]' : 'bg-[rgb(var(--warning))]'
                    }`}
                    style={{ 
                      width: skill.level === 'Expert' ? '100%' : 
                             skill.level === 'Comfortable' ? '70%' : '40%' 
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-[rgb(var(--muted-foreground))] ml-3">
                {skill.yearsExp}y exp
              </span>
            </div>
          ))}
        </div>

        {/* Task History */}
        <div className="mt-4 pt-4 border-t border-[rgb(var(--border))]">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">Tasks Completed</p>
              <p className="text-xl font-bold text-[rgb(var(--text-primary))]">
                {employee.taskHistory.totalCompleted}
              </p>
            </div>
            <div>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">Success Rate</p>
              <p className="text-xl font-bold text-[rgb(var(--success))]">
                {Math.round((employee.taskHistory.totalCompleted / employee.taskHistory.totalAssigned) * 100)}%
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Trends */}
      <Card className="p-5">
        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-[rgb(var(--primary))]" />
          Performance Trends
        </h4>

        {/* Trend Indicator */}
        <div className="mb-4 p-3 bg-[rgb(var(--accent))] rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">
              Performance Trend
            </span>
            <div className="flex items-center gap-2">
              <TrendIcon size={18} className={trendConfig.color} />
              <span className={`text-sm font-bold ${trendConfig.color} capitalize`}>
                {employee.performance.trend}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Weekly Rate
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.performance.weeklyCompletionRate}%
            </p>
          </div>
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Monthly Rate
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.performance.monthlyCompletionRate}%
            </p>
          </div>
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Reliability
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.performance.reliabilityScore}%
            </p>
          </div>
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Quality Score
            </p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.performance.qualityScore}%
            </p>
          </div>
        </div>
      </Card>

      {/* Work Quality */}
      <Card className="p-5">
        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
          <Award size={18} className="text-[rgb(var(--primary))]" />
          Work Quality
        </h4>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">Rework Count</p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.quality.reworkCount}
            </p>
          </div>
          <div className="text-center p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">Avg Review</p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.quality.avgReviewScore}/5
            </p>
          </div>
          <div className="text-center p-3 bg-[rgb(var(--muted))] rounded-lg">
            <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">Approval Rate</p>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {employee.quality.approvalRate}%
            </p>
          </div>
        </div>
      </Card>

      {/* Behavioral Insights */}
      <Card className="p-5">
        <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-4 flex items-center gap-2">
          <Activity size={18} className="text-[rgb(var(--primary))]" />
          Behavioral Insights
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-[rgb(var(--muted))] rounded">
            <span className="text-sm text-[rgb(var(--text-secondary))]">
              Peak Hours
            </span>
            <span className="text-sm font-semibold text-[rgb(var(--text-primary))]">
              {employee.behavior.peakHours}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-[rgb(var(--muted))] rounded">
            <span className="text-sm text-[rgb(var(--text-secondary))]">
              Focus Pattern
            </span>
            <span className="text-sm font-semibold text-[rgb(var(--text-primary))]">
              {employee.behavior.focusTimePattern}
            </span>
          </div>
          <div className="flex items-center justify-between p-2 bg-[rgb(var(--muted))] rounded">
            <span className="text-sm text-[rgb(var(--text-secondary))]">
              Context Switching
            </span>
            <Badge type={
              employee.behavior.contextSwitching === 'Low' ? 'success' :
              employee.behavior.contextSwitching === 'Medium' ? 'warning' : 'danger'
            }>
              {employee.behavior.contextSwitching}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-[rgb(var(--muted))] rounded">
            <span className="text-sm text-[rgb(var(--text-secondary))]">
              Burnout Risk
            </span>
            <Badge type={
              employee.behavior.burnoutRisk === 'Low' ? 'success' :
              employee.behavior.burnoutRisk === 'Medium' ? 'warning' : 'danger'
            }>
              {employee.behavior.burnoutRisk}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Alerts & Warnings */}
      {(employee.workload.workloadLevel === 'Overloaded' || 
        employee.behavior.burnoutRisk === 'High' ||
        employee.performance.trend === 'declining') && (
        <Card className="p-5 bg-[rgb(var(--warning-bg))] border-2 border-[rgb(var(--warning))]">
          <div className="flex gap-3">
            <AlertCircle size={24} className="text-[rgb(var(--warning))] flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-[rgb(var(--text-primary))] mb-2">
                ⚠️ Assignment Warnings
              </h4>
              <ul className="text-sm text-[rgb(var(--text-secondary))] space-y-1">
                {employee.workload.workloadLevel === 'Overloaded' && (
                  <li>• Employee is currently overloaded - consider reassigning tasks</li>
                )}
                {employee.behavior.burnoutRisk === 'High' && (
                  <li>• High burnout risk detected - additional tasks not recommended</li>
                )}
                {employee.performance.trend === 'declining' && (
                  <li>• Performance trend declining - may need support or reduced workload</li>
                )}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};