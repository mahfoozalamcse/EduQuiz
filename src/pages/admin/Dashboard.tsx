
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/dashboard/StatCard';
import { Users, BookOpen, Award, Shield, ArrowUpRight } from 'lucide-react';
import { quizzes, quizAttempts } from '@/data/quizData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuizzes: 0,
    totalAttempts: 0,
    averageScore: 0,
  });
  const [usersDistribution, setUsersDistribution] = useState({
    students: 0,
    teachers: 0,
    admins: 0,
  });

  useEffect(() => {
    if (!user) return;

    // Simulate loading data
    const loadData = async () => {
      // Wait for a short delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate stats (mock data)
      const totalUsers = 45;
      const totalQuizzes = quizzes.length;
      const totalAttempts = quizAttempts.length;
      
      let averageScore = 0;
      if (quizAttempts.length > 0) {
        const totalScore = quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
        averageScore = Math.round(totalScore / quizAttempts.length);
      }
      
      setStats({
        totalUsers,
        totalQuizzes,
        totalAttempts,
        averageScore,
      });
      
      // Mock user distribution
      setUsersDistribution({
        students: 32,
        teachers: 10,
        admins: 3,
      });
      
      setLoading(false);
    };

    loadData();
  }, [user]);
  
  // Mock data for system activity
  const systemActivity = [
    { id: 1, action: 'New user registered', user: 'Jane Doe', role: 'Student', time: '2 hours ago' },
    { id: 2, action: 'Quiz created', user: 'John Smith', role: 'Teacher', time: '5 hours ago' },
    { id: 3, action: 'Settings updated', user: 'Admin Demo', role: 'Admin', time: '1 day ago' },
    { id: 4, action: 'Quiz completed', user: 'Alice Johnson', role: 'Student', time: '1 day ago' },
    { id: 5, action: 'Attendance report generated', user: 'Teacher Demo', role: 'Teacher', time: '2 days ago' },
  ];

  if (loading) {
    return (
      <DashboardLayout allowedRoles={['admin']}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse-slow">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Total Quizzes"
            value={stats.totalQuizzes}
            icon={<BookOpen className="h-5 w-5" />}
          />
          <StatCard
            title="Quiz Attempts"
            value={stats.totalAttempts}
            icon={<Award className="h-5 w-5" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon={<Shield className="h-5 w-5" />}
          />
        </div>
        
        {/* User & Quiz Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown of users by role</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {/* Students */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Students</span>
                    <span className="text-sm">{usersDistribution.students} ({Math.round((usersDistribution.students / stats.totalUsers) * 100)}%)</span>
                  </div>
                  <Progress value={(usersDistribution.students / stats.totalUsers) * 100} className="h-2" />
                </div>
                
                {/* Teachers */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Teachers</span>
                    <span className="text-sm">{usersDistribution.teachers} ({Math.round((usersDistribution.teachers / stats.totalUsers) * 100)}%)</span>
                  </div>
                  <Progress value={(usersDistribution.teachers / stats.totalUsers) * 100} className="h-2" />
                </div>
                
                {/* Admins */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Administrators</span>
                    <span className="text-sm">{usersDistribution.admins} ({Math.round((usersDistribution.admins / stats.totalUsers) * 100)}%)</span>
                  </div>
                  <Progress value={(usersDistribution.admins / stats.totalUsers) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                Manage Users
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quiz Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Quiz Category Analytics</CardTitle>
              <CardDescription>Distribution of quizzes by subject</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                {/* Calculate subject distribution */}
                {Object.entries(
                  quizzes.reduce((acc: Record<string, number>, quiz) => {
                    acc[quiz.subject] = (acc[quiz.subject] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([subject, count]) => (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{subject}</span>
                      <span className="text-sm">{count} ({Math.round((count / quizzes.length) * 100)}%)</span>
                    </div>
                    <Progress value={(count / quizzes.length) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                View All Quizzes
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* System Activity */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Recent System Activity</h2>
            <Button variant="outline" size="sm">View All Activity</Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemActivity.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.action}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.role}</TableCell>
                      <TableCell>{activity.time}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowUpRight className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Manage Users</CardTitle>
                <CardDescription>
                  Add, edit, or remove user accounts
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Go to Users</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quiz Database</CardTitle>
                <CardDescription>
                  Manage quiz content and categories
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Manage Quizzes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Settings</CardTitle>
                <CardDescription>
                  Configure platform settings
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">Go to Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
