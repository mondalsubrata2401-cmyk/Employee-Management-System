/**
 * Badge Component
 * Status indicator with different color variants
 */
export const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-rose-50 text-rose-700 border-rose-100",
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };
  
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${styles[type] || styles.neutral}`}>
      {children}
    </span>
  );
};
