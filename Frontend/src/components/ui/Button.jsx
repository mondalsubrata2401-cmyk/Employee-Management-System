import { Loader2 } from 'lucide-react';

/**
 * Button Component
 * Customizable button with multiple variants and loading state
 */
export const Button = ({ 
  children, 
  variant = "primary", 
  className = "", 
  loading = false, 
  icon: Icon, 
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] focus:ring-[var(--ring)] shadow-sm",
    secondary: "bg-[var(--card)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--muted)] focus:ring-[var(--ring)] shadow-sm",
    ghost: "text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)]",
    danger: "bg-[var(--error)] text-[var(--error-foreground)] hover:opacity-90 focus:ring-[var(--error)]",
    magic: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-sm",
  };
  
  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`} 
      disabled={loading} 
      {...props}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin mr-2" />
      ) : (
        Icon && <Icon size={18} className="mr-2" />
      )}
      {children}
    </button>
  );
};
