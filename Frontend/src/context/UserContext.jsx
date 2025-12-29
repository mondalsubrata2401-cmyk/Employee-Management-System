import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

// Mock users data
const USERS = {
  employee: {
    id: 'emp001',
    name: 'Alex Morgan',
    email: 'alex.morgan@acmehr.com',
    role: 'Employee',
    department: 'Product Design',
    employeeId: 'EMP-2021-001',
    phone: '+1 (555) 123-4567',
    manager: 'Sarah Connor',
    joinDate: 'Aug 15, 2021'
  },
  admin: {
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
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('employee'); // 'employee' or 'admin'
  
  const switchUser = (userType) => {
    setCurrentUser(userType);
  };

  const getUserProfile = () => {
    return USERS[currentUser];
  };

  const isAdmin = () => {
    return currentUser === 'admin';
  };

  const isEmployee = () => {
    return currentUser === 'employee';
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      switchUser, 
      getUserProfile, 
      isAdmin, 
      isEmployee,
      USERS 
    }}>
      {children}
    </UserContext.Provider>
  );
};
