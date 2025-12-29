import { Clock, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, Button, Badge } from '../components/ui';

/**
 * Attendance View Component
 */
export const AttendanceView = () => (
  <div className="space-y-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">Attendance & Timesheet</h2>
      <div className="flex space-x-3">
        <Button variant="secondary" className="space-x-2">
          <Download size={16} />
          <span>Export Report</span>
        </Button>
        <Button className="space-x-2">
          <Clock size={16} />
          <span>Clock In</span>
        </Button>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="p-6 col-span-1 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-[var(--text-secondary)]">October 2023</h3>
          <div className="flex space-x-2">
            <Button variant="secondary" className="px-2 py-1 h-8 text-xs">Previous</Button>
            <Button variant="secondary" className="px-2 py-1 h-8 text-xs">Next</Button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div key={d} className="text-xs font-medium text-[var(--muted-foreground)] py-2">{d}</div>
          ))}
        </div>
        {/* Mock Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({length: 31}, (_, i) => i + 1).map(day => {
            const isWeekend = (day + 1) % 7 === 0 || (day + 1) % 7 === 1;
            const status = isWeekend ? 'weekend' : day === 24 ? 'today' : day > 24 ? 'future' : Math.random() > 0.1 ? 'present' : 'absent';
            
            let bgClass = "bg-[var(--card)] hover:bg-[var(--muted)] border-[var(--border)] text-[var(--text-secondary)]";
            if (status === 'present') bgClass = "bg-[var(--success-bg)] border-[var(--success-bg)] text-[var(--success)]";
            if (status === 'absent') bgClass = "bg-[var(--error-bg)] border-[var(--error-bg)] text-[var(--error)]";
            if (status === 'weekend') bgClass = "bg-[var(--muted)]/50 border-transparent text-[var(--muted-foreground)]";
            if (status === 'today') bgClass = "ring-2 ring-[var(--primary)] bg-[var(--accent)] text-[var(--accent-foreground)] border-[var(--accent)] z-10";
            
            return (
              <div key={day} className={`h-24 rounded-lg border p-2 flex flex-col justify-between transition-all ${bgClass}`}>
                <span className="text-xs font-medium">{day}</span>
                {status === 'present' && <span className="text-[10px] font-bold">9h 15m</span>}
                {status === 'absent' && <span className="text-[10px] font-bold">Absent</span>}
                {status === 'today' && <span className="text-[10px] font-bold">Active</span>}
              </div>
            )
          })}
        </div>
      </Card>

      <div className="space-y-6">
        <Card className="p-6 text-center">
          <div className="w-32 h-32 rounded-full border-4 border-[var(--border)] border-t-[var(--primary)] mx-auto flex flex-col items-center justify-center mb-4 relative">
            <span className="text-3xl font-bold text-[var(--text-primary)]">04:23</span>
            <span className="text-xs text-[var(--muted-foreground)] uppercase">Hrs Worked</span>
          </div>
          <p className="text-[var(--muted-foreground)] text-sm mb-6">Clocked in at 09:00 AM</p>
          <Button variant="danger" className="w-full">Clock Out</Button>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-[var(--text-secondary)] mb-4">Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded bg-[var(--muted)]">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">Total Hours</p>
                  <p className="font-bold text-[var(--text-secondary)]">142 Hrs</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded bg-[var(--muted)]">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[var(--success-bg)] text-[var(--success)] rounded">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">On Time</p>
                  <p className="font-bold text-[var(--text-secondary)]">18 Days</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded bg-[var(--muted)]">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[var(--error-bg)] text-[var(--error)] rounded">
                  <AlertCircle size={16} />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted-foreground)]">Absent/Leave</p>
                  <p className="font-bold text-[var(--text-secondary)]">2 Days</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
);
