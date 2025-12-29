import { X } from 'lucide-react';

/**
 * Modal Component
 * Reusable modal dialog with backdrop
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--card)] rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
          <h3 className="font-semibold text-[var(--text-primary)]">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-[var(--muted-foreground)] hover:text-[var(--text-secondary)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
