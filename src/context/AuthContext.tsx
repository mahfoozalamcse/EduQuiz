
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner"; 

// Define user roles
export type UserRole = 'student' | 'teacher' | 'admin';
 
// Define user interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Define context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  { id: '1', name: 'Student Demo', email: 'student@example.com', role: 'student' },
  { id: '2', name: 'Teacher Demo', email: 'teacher@example.com', role: 'teacher' },
  { id: '3', name: 'Admin Demo', email: 'admin@example.com', role: 'admin' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize - check for stored user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('eduquiz_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    // For demo purposes we'll just simulate a login delay
    await new Promise(r => setTimeout(r, 1000));
    
    // Find the user in our mock database
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('eduquiz_user', JSON.stringify(foundUser));
      toast.success(`Welcome back, ${foundUser.name}`);
    } else {
      toast.error('Invalid credentials');
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    // For demo purposes we'll just simulate a registration delay
    await new Promise(r => setTimeout(r, 1000));
    
    // Check if email is already in use
    if (mockUsers.some(u => u.email === email)) {
      toast.error('Email already in use');
      setLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create a new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      role
    };
    
    // Add the user to our mock database
    mockUsers.push(newUser);
    
    // Log in the new user
    setUser(newUser);
    localStorage.setItem('eduquiz_user', JSON.stringify(newUser));
    
    toast.success('Registration successful');
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('eduquiz_user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
