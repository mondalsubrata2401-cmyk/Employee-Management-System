# Employee Management System - Frontend

A professional, minimal, and enterprise-grade Employee Management System built with React and Tailwind CSS.

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        # Top navigation bar
│   │   │   └── Sidebar.jsx       # Sidebar navigation
│   │   └── ui/
│   │       ├── Avatar.jsx        # User avatar component
│   │       ├── Badge.jsx         # Status badge component
│   │       ├── Button.jsx        # Reusable button component
│   │       ├── Card.jsx          # Card container component
│   │       ├── Modal.jsx         # Modal dialog component
│   │       └── index.js          # UI components barrel export
│   ├── data/
│   │   └── mockData.js           # Mock data for development
│   ├── pages/
│   │   ├── Attendance.jsx        # Attendance & timesheet view
│   │   ├── Dashboard.jsx         # Main dashboard view
│   │   ├── Leave.jsx             # Leave management view
│   │   ├── Payslips.jsx          # Payslips & documents view
│   │   ├── Performance.jsx       # Performance & OKRs view
│   │   ├── Profile.jsx           # User profile view
│   │   └── Placeholder.jsx       # Placeholder for unimplemented modules
│   ├── utils/
│   │   └── geminiApi.js          # Google Gemini AI integration
│   ├── App.jsx                   # Main application component
│   ├── index.css                 # Global styles & animations
│   └── main.jsx                  # Application entry point
├── package.json
└── vite.config.js
```

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (600-700)
- **Background**: Off-white / Light gray (Slate 50)
- **Success**: Emerald
- **Warning**: Amber
- **Danger**: Rose
- **Neutral**: Slate

### Typography
- Sans-serif system fonts
- Clear hierarchy (H1, H2, body, labels)
- Consistent font weights

### Layout Principles
- Soft shadows for depth
- Subtle rounded corners (8-12px)
- Consistent spacing system (4px grid)
- Micro-interactions on hover/active states

## 🚀 Features

### ✅ Implemented Modules

1. **Dashboard**
   - Welcome section with user greeting
   - Quick stats cards (leave balance, hours worked, performance)
   - Recent attendance table
   - Task overview
   - Team members widget
   - Announcements feed

2. **Attendance & Time Tracking**
   - Clock in/out functionality UI
   - Monthly calendar view
   - Daily attendance logs
   - Statistics (total hours, on-time days)
   - Export reports option

3. **Leave Management**
   - Apply for leave with AI-powered draft generation ✨
   - Leave balance visualization
   - Leave history table
   - Status tracking (Approved/Pending)

4. **Payslips & Documents**
   - Latest salary summary
   - Salary breakdown (Basic, HRA, Allowances)
   - Tax projection widget
   - Payslip history with download option
   - Search functionality

5. **Performance & Growth**
   - AI-powered OKR suggestions ✨
   - Goal progress tracking
   - Feedback & reviews section
   - Overall rating display
   - Skills matrix

6. **Profile**
   - Personal information display
   - Contact details
   - Job information
   - Bank details (masked)
   - Document management

### 🚧 Placeholder Modules
- Tasks & Work Management
- Team Directory

## 🤖 AI Features

The application integrates Google's Gemini AI for intelligent assistance:

1. **Leave Request Drafting**: AI generates professional leave request messages
2. **OKR Suggestions**: AI suggests personalized objectives and key results

> **Note**: Add your Gemini API key in `src/utils/geminiApi.js` to enable AI features

## 🎯 Key Design Principles

- **Professional & Subtle**: Calm color palette, no flashy animations
- **Enterprise-Grade**: Consistent with modern SaaS tools (similar to Workday, BambooHR)
- **Productivity-Focused**: Clear hierarchy, easy navigation
- **Responsive**: Works on desktop, tablet, and mobile
- **Accessible**: Clear labels, proper contrast ratios

## 📦 Tech Stack

- **React** 18+ with Hooks
- **Vite** - Fast build tool
- **Tailwind CSS** v4 - Utility-first styling
- **Lucide React** - Icon library
- **Google Gemini AI** - AI-powered features

## 🛠️ Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
cd Frontend
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use)

### Build for Production
```bash
npm run build
```

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation, multi-column layouts
- **Tablet**: Collapsible sidebar, optimized layouts
- **Mobile**: Hidden sidebar with hamburger menu, single-column layouts

## 🎨 Custom Styling

The project uses custom scrollbar styles and animations defined in `index.css`:
- Subtle scrollbars matching the design system
- Smooth fade-in and slide animations
- Zoom effects for modals
- Consistent animation timing

## 🔐 Security Notes

- Bank details are masked in the UI
- Document access shows verification status
- Payslip information is access-controlled (UI level)

## 📄 License

This is a demonstration project for educational purposes.

---

**Built with ❤️ for modern enterprise HR management**
