# Role-Based Task Management System

## Overview
The system now supports two user roles: **Admin** and **Employee**, each with different permissions and capabilities.

## User Roles

### 👤 Employee (Alex Morgan)
- **Can**: View assigned tasks, start/pause timers, update progress, complete tasks
- **Cannot**: Create or assign new tasks
- **Dashboard**: Standard employee dashboard with personal metrics
- **Tasks Page**: Shows only tasks assigned to them

### 👨‍💼 Admin (Sarah Connor)
- **Can**: Assign tasks to employees, view all tasks, monitor team progress
- **Cannot**: Work on tasks (admin is for management only)
- **Dashboard**: Admin dashboard with task assignment interface
- **Tasks Page**: Shows all tasks across the team

## Key Features

### 1. User Switching
- **Location**: Bottom of sidebar
- **Button**: "Switch to Admin" / "Switch to Employee"
- **Effect**: Instantly switches between user profiles
- **Auto-reset**: Returns to dashboard when switching

### 2. Admin Dashboard
**Features:**
- Welcome banner with admin-specific messaging
- Task assignment button (prominent)
- Team statistics (total, completed, in progress, not started)
- Completion rate percentage
- Employee tasks overview with progress bars
- Quick assign task modal

**Task Assignment Modal:**
- Task title (required)
- Description
- Assign to employee (dropdown)
- Priority (Low/Medium/High)
- Category (Development/Review/Presentation/etc.)
- Due date (required)
- Estimated hours

### 3. Employee Dashboard
**Features:**
- Personal welcome message
- View tasks button
- Clock in/out functionality
- Personal attendance status
- Individual performance metrics
- Leave balance
- Recent attendance logs

### 4. Tasks Page (Employee View)
**Features:**
- View only assigned tasks
- Start/pause timer on tasks
- Update progress (0-100%)
- Complete tasks
- Search and filter tasks
- Real-time statistics
- **No "Add Task" button** (employees cannot create tasks)

### 5. Tasks Page (Admin View)
**Features:**
- View all tasks across team
- Monitor employee progress
- See task status and completion
- Search and filter all tasks
- Team-wide statistics
- **No task execution** (admins manage, not execute)

## User Profiles

### Employee Profile
```javascript
{
  id: 'emp001',
  name: 'Alex Morgan',
  email: 'alex.morgan@acmehr.com',
  role: 'Employee',
  department: 'Product Design',
  employeeId: 'EMP-2021-001',
  phone: '+1 (555) 123-4567',
  manager: 'Sarah Connor',
  joinDate: 'Aug 15, 2021'
}
```

### Admin Profile
```javascript
{
  id: 'adm001',
  name: 'Sarah Connor',
  email: 'sarah.connor@acmehr.com',
  role: 'Admin',
  department: 'Management',
  employeeId: 'ADM-2020-001',
  phone: '+1 (555) 987-6543',
  manager: 'CEO',
  joinDate: 'Jan 10, 2020'
}
```

## Task Object Structure

```javascript
{
  id: number,
  title: string,
  description: string,
  priority: 'Low' | 'Medium' | 'High',
  status: 'Not Started' | 'In Progress' | 'Completed',
  progress: number (0-100),
  dueDate: string (ISO date),
  estimatedHours: number,
  timeSpent: number (seconds),
  startedAt: number | null,
  isRunning: boolean,
  category: string,
  assignedTo: string (user ID),
  assignedBy: string (admin ID),
  assignedDate: string (ISO date)
}
```

## Workflow

### Admin Workflow: Assigning a Task
1. **Login as Admin** (click "Switch to Admin" in sidebar)
2. **Navigate to Dashboard** (shows admin dashboard automatically)
3. **Click "Assign New Task"** button
4. **Fill in task details**:
   - Enter task title
   - Add description
   - Select employee (currently only Alex Morgan)
   - Set priority level
   - Choose category
   - Set due date
   - Estimate hours needed
5. **Click "Assign Task"**
6. **Task appears** in employee's task list immediately

### Employee Workflow: Completing a Task
1. **Login as Employee** (click "Switch to Employee" in sidebar)
2. **Navigate to Tasks** (click "My Tasks" in sidebar)
3. **Find your task** in the list
4. **Click "Start"** to begin timer
5. **Work on the task** (timer runs automatically)
6. **Click "Update Progress"** to set completion percentage
7. **Click "Pause"** if taking a break
8. **Click "Complete"** when finished

## Context Providers

### UserContext
**Purpose**: Manages user authentication and role switching

**Methods:**
- `getUserProfile()` - Get current user's profile
- `switchUser(userType)` - Switch between 'employee' and 'admin'
- `isAdmin()` - Check if current user is admin
- `isEmployee()` - Check if current user is employee

**Usage:**
```javascript
import { useUser } from '../context/UserContext';

function MyComponent() {
  const { getUserProfile, isAdmin, switchUser } = useUser();
  const user = getUserProfile();
  
  if (isAdmin()) {
    // Show admin features
  }
}
```

### TasksContext
**Purpose**: Manages tasks across all users

**Methods:**
- `addTask(task)` - Add new task (admin only)
- `updateTask(taskId, updates)` - Update task properties
- `startTask(taskId)` - Start task timer
- `pauseTask(taskId)` - Pause task timer
- `completeTask(taskId)` - Mark task as complete
- `getTasksForUser(userId)` - Get tasks for specific user
- `getAllTasks()` - Get all tasks (admin view)

**Usage:**
```javascript
import { useTasks } from '../context/TasksContext';

function MyComponent() {
  const { addTask, getTasksForUser } = useTasks();
  const userTasks = getTasksForUser('emp001');
}
```

## Files Created/Modified

### New Files:
1. `src/context/UserContext.jsx` - User management
2. `src/context/TasksContext.jsx` - Task management
3. `src/pages/AdminDashboard.jsx` - Admin dashboard

### Modified Files:
1. `src/App.jsx` - Added role-based routing
2. `src/components/layout/Sidebar.jsx` - Added user switcher
3. `src/pages/Tasks.jsx` - Removed add task button for employees

## Security Considerations

### Current Implementation (Demo):
- ⚠️ Client-side role switching (for demonstration)
- ⚠️ No authentication required
- ⚠️ All data in memory (lost on refresh)

### Production Requirements:
- ✅ Server-side authentication
- ✅ JWT tokens or session management
- ✅ Role-based access control (RBAC)
- ✅ API endpoints with permission checks
- ✅ Database persistence
- ✅ Audit logging

## Testing the System

### Test as Employee:
1. Ensure "Employee" is selected (check sidebar bottom)
2. Go to Dashboard - see employee dashboard
3. Go to Tasks - see only assigned tasks
4. Try to start/pause/complete tasks
5. Verify no "Add Task" button exists

### Test as Admin:
1. Click "Switch to Admin" in sidebar
2. Go to Dashboard - see admin dashboard
3. Click "Assign New Task"
4. Fill in task details and assign
5. Go to Tasks - see all tasks
6. Verify task appears for employee

### Test User Switching:
1. Start as Employee
2. Note current dashboard
3. Click "Switch to Admin"
4. Verify dashboard changes
5. Verify sidebar shows "Sarah Connor"
6. Switch back to Employee
7. Verify everything resets

## Future Enhancements

### Potential Features:
1. **Multiple Employees**: Support for multiple team members
2. **Task Comments**: Communication on tasks
3. **Task History**: Audit trail of changes
4. **Notifications**: Alert employees of new assignments
5. **Task Templates**: Quick task creation
6. **Bulk Assignment**: Assign multiple tasks at once
7. **Task Dependencies**: Link related tasks
8. **Time Reports**: Export time tracking data
9. **Performance Analytics**: Team productivity metrics
10. **Custom Roles**: More granular permissions

## API Integration (Future)

### Endpoints Needed:
```
POST   /api/auth/login           - User authentication
GET    /api/users/me             - Get current user
POST   /api/tasks                - Create task (admin only)
GET    /api/tasks                - Get tasks (filtered by role)
GET    /api/tasks/:id            - Get specific task
PUT    /api/tasks/:id            - Update task
DELETE /api/tasks/:id            - Delete task (admin only)
POST   /api/tasks/:id/start      - Start task timer
POST   /api/tasks/:id/pause      - Pause task timer
POST   /api/tasks/:id/complete   - Complete task
GET    /api/tasks/user/:userId   - Get user's tasks
```

## Troubleshooting

### Tasks not showing for employee?
- Check if tasks are assigned to 'emp001'
- Verify user is in Employee mode
- Check TasksContext is properly loaded

### Can't assign tasks as admin?
- Verify you're in Admin mode (check sidebar)
- Ensure all required fields are filled
- Check browser console for errors

### User switch not working?
- Refresh the page
- Check UserContext is properly initialized
- Verify sidebar has switch button

## Summary

✅ **Admin** can assign tasks from dashboard
✅ **Employee** can only work on assigned tasks
✅ **No "Add Task"** button for employees
✅ **User switching** available in sidebar
✅ **Role-based** dashboards and permissions
✅ **Real-time** task updates across views
✅ **Complete** task lifecycle management

The system is now ready for role-based task management! 🎉
