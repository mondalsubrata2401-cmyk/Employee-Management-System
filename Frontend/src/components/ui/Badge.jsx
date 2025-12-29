/**
 * Badge Component
 * Status indicator with different color variants
 */
export const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    success: "bg-[var(--success-bg)] text-[var(--success)] border-[var(--success-bg)]",
    warning: "bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning-bg)]",
    danger: "bg-[var(--error-bg)] text-[var(--error)] border-[var(--error-bg)]",
    neutral: "bg-[var(--secondary)] text-[var(--text-secondary)] border-[var(--border)]",
    indigo: "bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)]",
  };
  
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border transition-colors ${styles[type] || styles.neutral}`}>
      {children}
    </span>
  );
};
