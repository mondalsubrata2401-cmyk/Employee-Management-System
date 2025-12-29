import { 
  Award, 
  RefreshCw, 
  Star, 
  Bug, 
  CheckCircle, 
  XCircle,
  ThumbsUp,
  AlertTriangle
} from 'lucide-react';
import { Card, Badge } from '../ui';

/**
 * Work Quality Indicators Component
 * Displays quality metrics for tasks
 */
export const WorkQualityIndicators = ({ task }) => {
  // Calculate quality score
  const calculateQualityScore = () => {
    let score = 100;
    
    // Deduct for rework
    score -= task.reworkCount * 10;
    
    // Deduct for bugs
    score -= task.bugCount * 5;
    
    // Bonus for approval
    if (task.approved) score += 10;
    
    // Factor in review score
    if (task.reviewScore) {
      const reviewBonus = (task.reviewScore - 3) * 10; // 3.0 is baseline
      score += reviewBonus;
    }
    
    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const qualityScore = calculateQualityScore();

  // Get quality rating
  const getQualityRating = (score) => {
    if (score >= 90) return { label: 'Excellent', color: 'success', icon: Award };
    if (score >= 75) return { label: 'Good', color: 'info', icon: ThumbsUp };
    if (score >= 60) return { label: 'Fair', color: 'warning', icon: AlertTriangle };
    return { label: 'Needs Improvement', color: 'danger', icon: XCircle };
  };

  const qualityRating = getQualityRating(qualityScore);
  const RatingIcon = qualityRating.icon;

  // Get review score stars
  const getReviewStars = (score) => {
    if (!score) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < Math.floor(score)
            ? 'text-[rgb(var(--warning))] fill-[rgb(var(--warning))]'
            : i < score
            ? 'text-[rgb(var(--warning))] fill-[rgb(var(--warning))] opacity-50'
            : 'text-[rgb(var(--muted-foreground))]'
        }
      />
    ));
  };

  return (
    <Card className="p-5">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[rgb(var(--text-primary))] flex items-center gap-2">
            <Award size={20} className="text-[rgb(var(--primary))]" />
            Work Quality
          </h3>
          <Badge type={qualityRating.color}>
            {qualityRating.label}
          </Badge>
        </div>

        {/* Quality Score Circle */}
        <div className="flex items-center justify-center py-4">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgb(var(--secondary))"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke={
                  qualityScore >= 90
                    ? 'rgb(var(--success))'
                    : qualityScore >= 75
                    ? 'rgb(var(--info))'
                    : qualityScore >= 60
                    ? 'rgb(var(--warning))'
                    : 'rgb(var(--error))'
                }
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(qualityScore / 100) * 352} 352`}
                className="transition-all duration-1000"
              />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <RatingIcon
                size={28}
                className={
                  qualityScore >= 90
                    ? 'text-[rgb(var(--success))]'
                    : qualityScore >= 75
                    ? 'text-[rgb(var(--info))]'
                    : qualityScore >= 60
                    ? 'text-[rgb(var(--warning))]'
                    : 'text-[rgb(var(--error))]'
                }
              />
              <p className="text-3xl font-bold text-[rgb(var(--text-primary))] mt-1">
                {qualityScore}
              </p>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">Score</p>
            </div>
          </div>
        </div>

        {/* Quality Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Rework Count */}
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded ${
                task.reworkCount === 0 
                  ? 'bg-[rgb(var(--success-bg))] text-[rgb(var(--success))]' 
                  : task.reworkCount <= 2
                  ? 'bg-[rgb(var(--warning-bg))] text-[rgb(var(--warning))]'
                  : 'bg-[rgb(var(--error-bg))] text-[rgb(var(--error))]'
              }`}>
                <RefreshCw size={14} />
              </div>
              <span className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                Rework
              </span>
            </div>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {task.reworkCount}
            </p>
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              {task.reworkCount === 0 ? 'Perfect!' : task.reworkCount === 1 ? '1 revision' : `${task.reworkCount} revisions`}
            </p>
          </div>

          {/* Bug Count */}
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 rounded ${
                task.bugCount === 0 
                  ? 'bg-[rgb(var(--success-bg))] text-[rgb(var(--success))]' 
                  : task.bugCount <= 3
                  ? 'bg-[rgb(var(--warning-bg))] text-[rgb(var(--warning))]'
                  : 'bg-[rgb(var(--error-bg))] text-[rgb(var(--error))]'
              }`}>
                <Bug size={14} />
              </div>
              <span className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))]">
                Bugs
              </span>
            </div>
            <p className="text-2xl font-bold text-[rgb(var(--text-primary))]">
              {task.bugCount}
            </p>
            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1">
              {task.bugCount === 0 ? 'No issues' : `${task.bugCount} found`}
            </p>
          </div>
        </div>

        {/* Review Score */}
        {task.reviewScore && (
          <div className="p-3 bg-[rgb(var(--accent))] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[rgb(var(--text-secondary))]">
                Review Rating
              </span>
              <div className="flex items-center gap-1">
                {getReviewStars(task.reviewScore)}
              </div>
            </div>
            <p className="text-lg font-bold text-[rgb(var(--text-primary))]">
              {task.reviewScore.toFixed(1)} / 5.0
            </p>
          </div>
        )}

        {/* Approval Status */}
        <div className={`p-3 rounded-lg border-2 ${
          task.approved 
            ? 'bg-[rgb(var(--success-bg))] border-[rgb(var(--success))]' 
            : task.status === 'Completed'
            ? 'bg-[rgb(var(--warning-bg))] border-[rgb(var(--warning))]'
            : 'bg-[rgb(var(--muted))] border-[rgb(var(--border))]'
        }`}>
          <div className="flex items-center gap-3">
            {task.approved ? (
              <>
                <CheckCircle size={24} className="text-[rgb(var(--success))]" />
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                    Approved
                  </p>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Work meets quality standards
                  </p>
                </div>
              </>
            ) : task.status === 'Review' ? (
              <>
                <AlertTriangle size={24} className="text-[rgb(var(--warning))]" />
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                    Pending Approval
                  </p>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Awaiting manager review
                  </p>
                </div>
              </>
            ) : task.status === 'Completed' ? (
              <>
                <XCircle size={24} className="text-[rgb(var(--error))]" />
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                    Not Yet Approved
                  </p>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Completed but awaiting approval
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-6 h-6 border-2 border-[rgb(var(--muted-foreground))] rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-[rgb(var(--text-primary))]">
                    In Progress
                  </p>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Work not yet submitted for review
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Review Feedback */}
        {task.reviewFeedback && (
          <div className="p-3 bg-[rgb(var(--muted))] rounded-lg border-l-4 border-[rgb(var(--primary))]">
            <p className="text-xs uppercase tracking-wide text-[rgb(var(--muted-foreground))] mb-1">
              Manager Feedback
            </p>
            <p className="text-sm text-[rgb(var(--text-primary))] italic">
              "{task.reviewFeedback}"
            </p>
          </div>
        )}

        {/* Quality Summary */}
        <div className="pt-3 border-t border-[rgb(var(--border))]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[rgb(var(--muted-foreground))]">
              Overall Quality
            </span>
            <span className={`font-semibold ${
              qualityScore >= 90
                ? 'text-[rgb(var(--success))]'
                : qualityScore >= 75
                ? 'text-[rgb(var(--info))]'
                : qualityScore >= 60
                ? 'text-[rgb(var(--warning))]'
                : 'text-[rgb(var(--error))]'
            }`}>
              {qualityRating.label}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
