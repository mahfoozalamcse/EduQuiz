
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/dashboard/StatCard';
import { QuizCard } from '@/components/ui/dashboard/QuizCard';
import { BookOpen, Users, BarChart3, CheckCircle } from 'lucide-react';
import { quizzes, quizAttempts } from '@/data/quizData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalStudents: 0,
    averageScore: 0,
    attendanceRate: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    // Simulate loading data
    const loadData = async () => {
      // Wait for a short delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate stats
      const totalQuizzes = quizzes.length;
      const totalStudents = 32; // Mock data
      
      if (quizAttempts.length > 0) {
        const totalScore = quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
        const averageScore = Math.round(totalScore / quizAttempts.length);
        const attendanceMarked = quizAttempts.filter(attempt => attempt.attendanceMarked).length;
        const attendanceRate = Math.round((attendanceMarked / quizAttempts.length) * 100);
        
        setStats({
          totalQuizzes,
          totalStudents,
          averageScore,
          attendanceRate,
        });
        
        // Get recent submissions
        const recent = [...quizAttempts]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
          .map(attempt => ({
            ...attempt,
            quizTitle: quizzes.find(q => q.id === attempt.quizId)?.title || 'Unknown Quiz',
            studentName: 'Student Demo', // Mock student name
          }));
        
        setRecentSubmissions(recent);
      }
      
      setLoading(false);
    };

    loadData();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout allowedRoles={['teacher']}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse-slow">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout allowedRoles={['teacher']}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Quizzes"
            value={stats.totalQuizzes}
            icon={<BookOpen className="h-5 w-5" />}
          />
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon={<BarChart3 className="h-5 w-5" />}
            trend={
              stats.averageScore > 0
                ? { value: stats.averageScore - 60, isPositive: stats.averageScore >= 60 }
                : undefined
            }
          />
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            icon={<CheckCircle className="h-5 w-5" />}
          />
        </div>
        
        {/* Recent Quiz Submissions */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Recent Quiz Submissions</h2>
            <Button variant="outline" size="sm">View all</Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Quiz</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.studentName}</TableCell>
                      <TableCell>{submission.quizTitle}</TableCell>
                      <TableCell>{submission.score}%</TableCell>
                      <TableCell>{new Date(submission.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          submission.attendanceMarked
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }`}>
                          {submission.attendanceMarked ? 'Attendance Marked' : 'Below Threshold'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        {/* Quizzes */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">My Quizzes</h2>
            <Button size="sm">Create New Quiz</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                id={quiz.id}
                title={quiz.title}
                subject={quiz.subject}
                description={quiz.description}
                duration={quiz.duration}
                questionsCount={quiz.questions.length}
                difficulty={quiz.difficulty}
                completedCount={quizAttempts.filter(a => a.quizId === quiz.id).length}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
