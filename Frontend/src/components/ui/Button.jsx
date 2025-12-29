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
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-indigo-500 shadow-sm",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
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
