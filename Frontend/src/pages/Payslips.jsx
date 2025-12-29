import { Download, FileText, Search, TrendingUp } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { PAYSLIPS } from '../data/mockData';

/**
 * Payslips View Component
 */
export const PayslipsView = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-[var(--text-primary)]">Payslips & Documents</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Latest Payslip Summary */}
      <Card className="p-6 md:col-span-2 bg-linear-to-r from-slate-800 to-slate-900 text-white border-none">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-slate-300 text-sm mb-1">Most Recent Salary</p>
            <h3 className="text-3xl font-bold">$5,400.00</h3>
            <p className="text-emerald-400 text-sm mt-1 flex items-center">
              <TrendingUp size={14} className="mr-1" /> No changes from last month
            </p>
          </div>
          <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <Download size={16} className="mr-2" /> Download PDF
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Basic</p>
            <p className="text-lg font-semibold">$3,200</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">HRA</p>
            <p className="text-lg font-semibold">$1,600</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Allowances</p>
            <p className="text-lg font-semibold">$600</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-[var(--text-secondary)] mb-4">Tax Projection</h3>
        <div className="relative pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[var(--text-secondary)]">Paid so far</span>
            <span className="font-bold text-[var(--text-primary)]">$12,400</span>
          </div>
          <div className="h-2 w-full bg-[var(--secondary)] rounded-full mb-6">
            <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: '65%' }}></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[var(--muted-foreground)] border-b border-[var(--border)] pb-2">
              <span>Taxable Income</span>
              <span>$64,800</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--muted-foreground)] pb-2">
              <span>Proj. Tax</span>
              <span>$6,200</span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <Card>
      <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
        <h3 className="font-semibold text-[var(--text-primary)]">Payslip History</h3>
        <div className="relative">
          <input type="text" placeholder="Search by year..." className="pl-8 pr-3 py-1.5 text-sm border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--ring)]" />
          <Search size={14} className="absolute left-2.5 top-2.5 text-[var(--muted-foreground)]" />
        </div>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {PAYSLIPS.map((slip, i) => (
          <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[var(--muted)] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded-lg">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-medium text-[var(--text-primary)]">{slip.month}</p>
                <p className="text-xs text-[var(--muted-foreground)]">ID: {slip.id} • Processed {slip.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <span className="font-semibold text-[var(--text-secondary)]">{slip.amount}</span>
              <Button variant="ghost" className="text-[var(--primary)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] p-2 h-auto">
                <Download size={18} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </div>
);
