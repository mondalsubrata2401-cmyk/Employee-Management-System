/**
 * Card Component
 * Reusable card container with consistent styling
 */
export const Card = ({ children, className = "" }) => (
  <div className={`bg-[var(--card)] text-[var(--card-foreground)] rounded-xl border border-[var(--border)] shadow-sm transition-colors ${className}`}>
    {children}
  </div>
);
