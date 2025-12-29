import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Clock, 
  Target,
  Calendar,
  Zap,
  CheckCircle
} from 'lucide-react';
import { Card, Badge } from '../ui';

/**
 * Progress vs Deadline Analytics Component
 * Analyzes task progress against deadline with predictive insights
 */
export const ProgressVsDeadlineAnalytics = ({ task }) => {
  // Calculate analytics
  const calculateAnalytics = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const startDate = task.actualStartDate 
      ? new Date(task.actualStartDate) 
      : task.plannedStartDate 
      ? new Date(task.plannedStartDate)
      : now;
    
    const totalDuration = dueDate - startDate;
    const elapsed = now - startDate;
    const remaining = dueDate - now;
    
    const expectedProgress = totalDuration > 0 
      ? Math.min(100, Math.round((elapsed / totalDuration) * 100))
      : 0;
    
    const actualProgress = task.progress;
    const progressDelta = actualProgress - expectedProgress;
    
    const daysRemaining = Math.ceil(remaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.ceil(remaining / (1000 * 60 * 60));
    
    // Delay probability calculation
    let delayProbability = 0;
    let delayRisk = 'Low';
    
    if (progressDelta < -20) {
      delayProbability = 75;
      delayRisk = 'High';
    } else if (progressDelta < -10) {
      delayProbability = 50;
      delayRisk = 'Medium';
    } else if (progressDelta < 0) {
      delayProbability = 25;
      delayRisk = 'Low';
    }
    
    // If already overdue
    if (remaining < 0 && actualProgress < 100) {
      delayProbability = 100;
      delayRisk = 'Critical';
    }
    
    // Task velocity (progress per day)
    const daysElapsed = Math.max(1, Math.ceil(elapsed / (1000 * 60 * 60 * 24)));
    const velocity = actualProgress / daysElapsed;
    
    // Buffer time calculation
    const hoursSpent = task.timeSpent / 3600;
    const estimatedRemaining = task.estimatedHours - hoursSpent;
    const bufferHours = daysRemaining * 8 - estimatedRemaining; // Assuming 8 hour work days
    
    return {
      expectedProgress,
      actualProgress,
      progressDelta,
      daysRemaining,
      hoursRemaining,
      delayProbability,
      delayRisk,
      velocity,
      bufferHours,
      isOverdue: remaining < 0,
      isAhead: progressDelta > 10,
      isOnTrack: progressDelta >= -10 && progressDelta <= 10,
      isBehind: progressDelta < -10
    };
  };

  const analytics = calculateAnalytics();

  // Get status color based on progress
  const getProgressStatus = () => {
    if (analytics.isOverdue) {
      return {
        color: 'danger',
        bgClass: 'bg-[rgb(var(--error-bg))]',
        textClass: 'text-[rgb(var(--error))]',
        borderClass: 'border-[rgb(var(--error))]',
        icon: AlertTriangle,
        label: 'Overdue'
      };
    }
    if (analytics.isAhead) {
      return {
        color: 'success',
        bgClass: 'bg-[rgb(var(--success-bg))]',
        textClass: 'text-[rgb(var(--success))]',
        borderClass: 'border-[rgb(var(--success))]',
        icon: TrendingUp,
        label: 'Ahead of Schedule'
      };
    }
    if (analytics.isOnTrack) {
      return {
        color: 'info',
        bgClass: 'bg-[rgb(var(--info-bg))]',
        textClass: 'text-[rgb(var(--info))]',
        borderClass: 'border-[rgb(var(--info))]',
        icon: CheckCircle,
        label: 'On Track'
      };
    }
    return {
      color: 'warning',
      bgClass: 'bg-[rgb(var(--warning-bg))]',
      textClass: 'text-[rgb(var(--warning))]',
      borderClass: 'border-[rgb(var(--warning))]',
      icon: TrendingDown,
      label: 'Behind Schedule'
    };
  };

  const progressStatus = getProgressStatus();
  const StatusIcon = progressStatus.icon;

  // Get delay risk color
  const getDelayRiskConfig = (risk) => {
    const configs = {
      'Low': { color: 'success', percent: 25 },
      'Medium': { color: 'warning', percent: 50 },
      'High': { color: 'danger', percent: 75 },
      'Critical': { color: 'danger', percent: 100 }
    };
    return configs[risk] || configs['Low'];
  };

  const delayRiskConfig = getDelayRiskConfig(analytics.delayRisk);

  return (
    <Card className="p-5">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[rgb(var(--text-primary))] flex items-center gap-2">
            <Target size={20} className="text-[rgb(var(--primary))]" />
            Progress Analytics
          </h3>
          <Badge type={progressStatus.color}>
            {progressStatus.label}
          </Badge>
        </div>

        {/* Progress Comparison */}
        <div className={`p-4 rounded-lg border-2 ${progressStatus.borderClass} ${progressStatus.bgClass}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <StatusIcon size={24} className={progressStatus.textClass} />
              <div>
                <p className="text-sm font-medium text-[rgb(var(--text-secondary))]">
                  Current Status
                </p>
                <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
                  {analytics.actualProgress}%
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[rgb(var(--text-secondary))]">
                Expected
              </p>
              <p className="text-2xl font-bold text-[rgb(var(--muted-foreground))]">
                {analytics.expectedProgress}%
              </p>
            </div>
          </div>
          
          {/* Delta Indicator */}
          <div className="flex items-center gap-2 pt-2 border-t border-[rgb(var(--border))]">
            {analytics.progressDelta > 0 ? (
              <>
                <TrendingUp size={16} className="text-[rgb(var(--success))]" />
                <span className="text-sm font-medium text-[rgb(var(--success))]">
                  {analytics.progressDelta}% ahead
                </span>
              </>
            ) : analytics.progressDelta < 0 ? (
              <>
                <TrendingDown size={16} className="text-[rgb(var(--error))]" />
                <span className="text-sm font-medium text-[rgb(var(--error))]">
                  {Math.abs(analytics.progressDelta)}% behind
                </span>
              </>
            ) : (
              <>
                <CheckCircle size={16} className="text-[rgb(var(--success))]" />
                <span className="text-sm font-medium text-[rgb(var(--success))]">
                  Perfectly on track
                </span>
              </>
            )}
          </div>
        </div>

        {/* Deadline Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-[rgb(var(--muted-foreground))]" />
              <span className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                Time Remaining
              </span>
            </div>
            <p className="text-lg font-bold text-[rgb(var(--text-primary))]">
              {analytics.isOverdue ? (
                <span className="text-[rgb(var(--error))]">
                  {Math.abs(analytics.daysRemaining)} days overdue
                </span>
              ) : analytics.daysRemaining === 0 ? (
                <span className="text-[rgb(var(--warning))]">
                  Due today
                </span>
              ) : (
                `${analytics.daysRemaining} days`
              )}
            </p>
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              {analytics.hoursRemaining > 0 ? `~${analytics.hoursRemaining} hours` : 'Overdue'}
            </p>
          </div>

          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-[rgb(var(--muted-foreground))]" />
              <span className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                Buffer Time
              </span>
            </div>
            <p className="text-lg font-bold text-[rgb(var(--text-primary))]">
              {analytics.bufferHours > 0 ? (
                <span className="text-[rgb(var(--success))]">
                  +{Math.round(analytics.bufferHours)}h
                </span>
              ) : (
                <span className="text-[rgb(var(--error))]">
                  {Math.round(analytics.bufferHours)}h
                </span>
              )}
            </p>
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              {analytics.bufferHours > 0 ? 'Cushion available' : 'No buffer'}
            </p>
          </div>
        </div>

        {/* Task Velocity */}
        <div className="p-3 bg-[rgb(var(--accent))] rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-[rgb(var(--accent-foreground))]" />
              <div>
                <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                  Task Velocity
                </p>
                <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                  {analytics.velocity.toFixed(1)}% per day
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[rgb(var(--muted-foreground))]">
                Speed of progress
              </p>
            </div>
          </div>
        </div>

        {/* Delay Probability */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">
              Delay Probability
            </span>
            <Badge type={delayRiskConfig.color}>
              {analytics.delayRisk} Risk
            </Badge>
          </div>
          <div className="h-3 w-full bg-[rgb(var(--secondary))] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                analytics.delayProbability > 60 
                  ? 'bg-[rgb(var(--error))]' 
                  : analytics.delayProbability > 30 
                  ? 'bg-[rgb(var(--warning))]' 
                  : 'bg-[rgb(var(--success))]'
              }`}
              style={{ width: `${analytics.delayProbability}%` }}
            />
          </div>
          <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
            {analytics.delayProbability}% chance of delay
          </p>
        </div>

        {/* Recommendation */}
        {analytics.isBehind && !analytics.isOverdue && (
          <div className="p-3 bg-[rgb(var(--warning-bg))] border border-[rgb(var(--warning))] rounded-lg">
            <div className="flex gap-2">
              <AlertTriangle size={18} className="text-[rgb(var(--warning))] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                  Action Recommended
                </p>
                <p className="text-xs text-[rgb(var(--text-secondary))]">
                  Task is behind schedule. Consider reallocating resources or adjusting deadline.
                </p>
              </div>
            </div>
          </div>
        )}

        {analytics.isOverdue && (
          <div className="p-3 bg-[rgb(var(--error-bg))] border border-[rgb(var(--error))] rounded-lg">
            <div className="flex gap-2">
              <AlertTriangle size={18} className="text-[rgb(var(--error))] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[rgb(var(--text-primary))] mb-1">
                  Task Overdue
                </p>
                <p className="text-xs text-[rgb(var(--text-secondary))]">
                  This task has passed its deadline. Immediate attention required.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
