import { useState } from 'react';
import { Calendar, Sparkles, Loader2, MoreHorizontal } from 'lucide-react';
import { Card, Button, Badge, Modal } from '../components/ui';
import { LEAVE_HISTORY } from '../data/mockData';
import { generateGeminiContent } from '../utils/geminiApi';

/**
 * Leave Management View Component
 */
export const LeaveView = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [leaveReason, setLeaveReason] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);

  const handleAIDraft = async () => {
    if (!leaveReason.trim()) return;
    setIsDrafting(true);
    const prompt = `Write a professional short leave request email to a manager. Context: ${leaveReason}. Keep it concise, polite, and professional. Do not include subject line or placeholders like [Your Name], just the body text.`;
    const draft = await generateGeminiContent(prompt);
    setLeaveReason(draft);
    setIsDrafting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Leave Management</h2>
        <Button className="space-x-2" onClick={() => setIsApplyModalOpen(true)}>
          <Calendar size={18} />
          <span>Apply Leave</span>
        </Button>
      </div>

      <Modal isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} title="Apply for Leave">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Privilege Leave</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700">Reason</label>
              <button 
                onClick={handleAIDraft}
                disabled={isDrafting}
                className="text-xs flex items-center text-purple-600 hover:text-purple-700 font-medium disabled:opacity-50"
              >
                {isDrafting ? <Loader2 size={12} className="animate-spin mr-1" /> : <Sparkles size={12} className="mr-1" />}
                ✨ Magic Draft (Type keywords first)
              </button>
            </div>
            <textarea 
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="e.g., Not feeling well, fever since last night..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <Button variant="ghost" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsApplyModalOpen(false)}>Submit Request</Button>
          </div>
        </div>
      </Modal>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Casual Leave', bal: 8, used: 4, total: 12, color: 'text-emerald-600', bar: 'bg-emerald-500' },
          { label: 'Sick Leave', bal: 5, used: 2, total: 7, color: 'text-rose-600', bar: 'bg-rose-500' },
          { label: 'Privilege Leave', bal: 15, used: 5, total: 20, color: 'text-amber-600', bar: 'bg-amber-500' }
        ].map((item, i) => (
          <Card key={i} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 text-sm font-medium">{item.label}</p>
                <h3 className={`text-3xl font-bold mt-1 ${item.color}`}>{item.bal}</h3>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Available</p>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
              <div className={`h-full ${item.bar}`} style={{ width: `${(item.used/item.total)*100}%` }}></div>
            </div>
            <p className="text-xs text-slate-400">Used {item.used} of {item.total} days</p>
          </Card>
        ))}
      </div>

      {/* History Table */}
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Leave History</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Leave Type</th>
              <th className="px-6 py-3">Date Range</th>
              <th className="px-6 py-3">Days</th>
              <th className="px-6 py-3">Reason</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {LEAVE_HISTORY.map((leave, i) => (
              <tr key={i} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-slate-700">{leave.type}</td>
                <td className="px-6 py-4 text-slate-600">{leave.dates}</td>
                <td className="px-6 py-4 text-slate-600">{leave.days}</td>
                <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{leave.reason}</td>
                <td className="px-6 py-4">
                  <Badge type={leave.status === 'Approved' ? 'success' : 'warning'}>{leave.status}</Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-indigo-600">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
