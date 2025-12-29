import { Briefcase } from 'lucide-react';

/**
 * Placeholder Component for Under Development Modules
 */
export const PlaceholderView = ({ moduleName }) => (
  <div className="flex flex-col items-center justify-center h-96 text-slate-400">
    <div className="p-4 bg-slate-100 rounded-full mb-4">
      <Briefcase size={40} className="text-slate-300" />
    </div>
    <h3 className="text-lg font-medium text-slate-600">Module Under Development</h3>
    <p className="max-w-xs text-center mt-2 text-sm">
      The {moduleName} module is currently being built by the engineering team.
    </p>
  </div>
);
