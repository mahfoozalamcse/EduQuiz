
import { useState, useEffect } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth, User, UserRole } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, 
  BookOpen,
  Award,
  Settings,
  BarChart3,
  Users,
  Database,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  path: string;
  roles: UserRole[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  allowedRoles = ['student', 'teacher', 'admin'] 
}) => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Initialize based on current size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation items with role restrictions
  const sidebarItems: SidebarItem[] = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      path: `/${user?.role}/dashboard`, 
      roles: ['student', 'teacher', 'admin'] 
    },
    { 
      name: 'My Quizzes', 
      icon: BookOpen, 
      path: `/${user?.role}/quizzes`, 
      roles: ['student', 'teacher', 'admin'] 
    },
    { 
      name: 'My Performance', 
      icon: BarChart3, 
      path: '/student/performance', 
      roles: ['student'] 
    },
    { 
      name: 'Achievements', 
      icon: Award, 
      path: '/student/achievements', 
      roles: ['student'] 
    },
    { 
      name: 'Create Quiz', 
      icon: BookOpen, 
      path: '/teacher/create-quiz', 
      roles: ['teacher'] 
    },
    { 
      name: 'Student Results', 
      icon: BarChart3, 
      path: '/teacher/results', 
      roles: ['teacher'] 
    },
    { 
      name: 'Manage Users', 
      icon: Users, 
      path: '/admin/users', 
      roles: ['admin'] 
    },
    { 
      name: 'Quiz Database', 
      icon: Database, 
      path: '/admin/quiz-database', 
      roles: ['admin'] 
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      path: `/${user?.role}/settings`, 
      roles: ['student', 'teacher', 'admin'] 
    },
  ];

  // Filter items based on user role
  const filteredItems = sidebarItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  // Check if user has access
  if (mounted && (!user || (allowedRoles && !allowedRoles.includes(user.role)))) {
    return <Navigate to="/login" replace />;
  }

  // Loading state
  if (!mounted || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-full bg-white shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar - Desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:w-64 lg:flex-shrink-0 lg:flex`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar header */}
          <div className="h-16 flex items-center justify-between px-4 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">ClassPulse</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <ChevronRight className={`h-5 w-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* User info */}
          <div className="px-4 py-4 border-b">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </p>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {filteredItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 lg:ml-64 transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        {/* Content area */}
        <main className="py-6 px-4 sm:px-6 lg:px-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};
