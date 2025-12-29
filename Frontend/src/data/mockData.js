/**
 * Mock Data for Employee Management System
 */

export const USER_PROFILE = {
  name: "Alex Morgan",
  role: "Senior Product Designer",
  department: "Product & Engineering",
  avatar: "AM",
  employeeId: "EMP-2024-042",
  manager: "Sarah Connor",
  joinDate: "Aug 15, 2021",
  email: "alex.m@acmecorp.com",
  phone: "+1 (555) 012-3456"
};

export const STATS = {
  leaveBalance: 12,
  pendingTasks: 5,
  avgPerformance: 4.8,
  attendance: "98%"
};

export const ATTENDANCE_LOGS = [
  { date: "Oct 24, 2023", checkIn: "09:02 AM", checkOut: "06:15 PM", status: "Present", duration: "9h 13m" },
  { date: "Oct 23, 2023", checkIn: "08:55 AM", checkOut: "06:00 PM", status: "Present", duration: "9h 05m" },
  { date: "Oct 22, 2023", checkIn: "09:10 AM", checkOut: "06:30 PM", status: "Present", duration: "9h 20m" },
  { date: "Oct 21, 2023", checkIn: "-", checkOut: "-", status: "Weekend", duration: "-" },
];

export const LEAVE_HISTORY = [
  { type: "Sick Leave", dates: "Oct 12 - Oct 13", days: 2, status: "Approved", reason: "Viral fever" },
  { type: "Casual Leave", dates: "Sep 05", days: 1, status: "Approved", reason: "Personal work" },
  { type: "Earned Leave", dates: "Dec 20 - Dec 24", days: 5, status: "Pending", reason: "Winter vacation" },
];

export const TASKS = [
  { id: 1, title: "Q4 Design System Update", due: "Today", priority: "High", status: "In Progress" },
  { id: 2, title: "Mobile App Usability Review", due: "Tomorrow", priority: "Medium", status: "To Do" },
  { id: 3, title: "Submit Expense Report", due: "Oct 28", priority: "Low", status: "Completed" },
];

export const PAYSLIPS = [
  { month: "September 2023", amount: "$5,400", date: "Sep 30, 2023", id: "PAY-Sep23" },
  { month: "August 2023", amount: "$5,400", date: "Aug 31, 2023", id: "PAY-Aug23" },
  { month: "July 2023", amount: "$5,250", date: "Jul 31, 2023", id: "PAY-Jul23" },
];

export const ANNOUNCEMENTS = [
  { id: 1, title: "New WFH Policy Update", date: "2 hours ago", tag: "Policy", content: "We have updated our remote work guidelines effective next month." },
  { id: 2, title: "Annual Town Hall", date: "Yesterday", tag: "Event", content: "Join us this Friday for the global all-hands meeting." },
];

export const TEAM_MEMBERS = [
  { name: "Sarah Connor", role: "VP of Design", status: "Online" },
  { name: "John Doe", role: "UX Researcher", status: "In Meeting" },
  { name: "Emily Chen", role: "UI Developer", status: "Offline" },
  { name: "Mike Ross", role: "Product Manager", status: "Online" },
];

export const MOCK_GOALS = [
  { id: 1, title: "Design System Migration", progress: 75, status: "On Track" },
  { id: 2, title: "Mentor Junior Designers", progress: 40, status: "At Risk" },
];
