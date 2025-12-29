import { FileText, Download } from 'lucide-react';
import { Card, Button, Badge, Avatar } from '../components/ui';
import { USER_PROFILE } from '../data/mockData';

/**
 * Profile View Component
 */
export const ProfileView = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div className="relative mb-12">
      <div className="h-32 bg-linear-to-r from-slate-200 to-slate-300 rounded-xl"></div>
      <div className="absolute -bottom-10 left-6 flex items-end space-x-4">
        <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
          <Avatar name={USER_PROFILE.name} size="xl" />
        </div>
        <div className="pb-1">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{USER_PROFILE.name}</h2>
          <p className="text-[var(--muted-foreground)]">{USER_PROFILE.role}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <Button variant="secondary" className="bg-white/80 backdrop-blur">Edit Profile</Button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Contact Info</h3>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-[var(--muted-foreground)] text-xs uppercase mb-1">Email</label>
              <p className="font-medium text-[var(--text-secondary)]">{USER_PROFILE.email}</p>
            </div>
            <div>
              <label className="block text-[var(--muted-foreground)] text-xs uppercase mb-1">Phone</label>
              <p className="font-medium text-[var(--text-secondary)]">{USER_PROFILE.phone}</p>
            </div>
            <div>
              <label className="block text-[var(--muted-foreground)] text-xs uppercase mb-1">Location</label>
              <p className="font-medium text-[var(--text-secondary)]">New York, USA</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Bank Details</h3>
          <div className="flex items-center justify-between p-3 bg-[var(--muted)] rounded border border-[var(--border)] mb-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-[var(--secondary)]"></div>
              <div>
                <p className="text-sm font-bold text-[var(--text-secondary)]">Chase Bank</p>
                <p className="text-xs text-[var(--muted-foreground)]">**** 4589</p>
              </div>
            </div>
            <Badge type="success">Verified</Badge>
          </div>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Job Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-[var(--muted-foreground)] text-xs uppercase mb-1">Employee ID</label>
              <p className="font-medium text-[var(--text-secondary)]">{USER_PROFILE.employeeId}</p>
            </div>
            <div>
              <label className="block text-[var(--muted-foreground)] text-xs uppercase mb-1">Department</label>
              <p className="font-medium text-[var(--text-secondary)]">{USER_PROFILE.department}</p>
            </div>
            <div>
              <label className="block text-[var(--muted-foreground)] text-xs uppercase mb-1">Reporting Manager</label>
              <div className="flex items-center space-x-2 mt-1">
                <Avatar name={USER_PROFILE.manager} size="sm" />
                <span className="font-medium text-[var(--text-secondary)]">{USER_PROFILE.manager}</span>
              </div>
            </div>
            <div>
              <label className="block text-[var(--muted-foreground)] text-xs uppercase mb-1">Date of Joining</label>
              <p className="font-medium text-[var(--text-secondary)]">{USER_PROFILE.joinDate}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Documents</h3>
          <div className="space-y-3">
            {[
              { name: "Employment Contract.pdf", date: "Aug 15, 2021" },
              { name: "NDA_Agreement.pdf", date: "Aug 15, 2021" },
              { name: "Tax_Declaration_FY23.pdf", date: "Apr 10, 2023" }
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText size={18} className="text-[var(--muted-foreground)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">{doc.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Uploaded {doc.date}</p>
                  </div>
                </div>
                <Button variant="ghost" className="p-1 h-auto text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                  <Download size={16} />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  </div>
);
