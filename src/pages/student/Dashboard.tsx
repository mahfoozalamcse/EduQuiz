
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/dashboard/StatCard';
import { QuizCard } from '@/components/ui/dashboard/QuizCard';
import { BookOpen, Award, Clock, Calendar } from 'lucide-react';
import { getUserQuizzes, getUserQuizAttempts, quizzes } from '@/data/quizData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userQuizzes, setUserQuizzes] = useState(quizzes);
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    completedQuizzes: 0,
    averageScore: 0,
    totalTime: 0,
    attendanceRate: 0,
  });

  useEffect(() => {
    if (!user) return;

    // Simulate loading data
    const loadData = async () => {
      // Wait for a short delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fetchedQuizzes = getUserQuizzes(user.id);
      const fetchedAttempts = getUserQuizAttempts(user.id);
      
      setUserQuizzes(fetchedQuizzes);
      setQuizAttempts(fetchedAttempts);
      
      // Calculate stats
      if (fetchedAttempts.length > 0) {
        const completedQuizzes = fetchedAttempts.length;
        const totalScore = fetchedAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
        const averageScore = Math.round(totalScore / completedQuizzes);
        const totalTime = fetchedAttempts.reduce((sum, attempt) => sum + attempt.timeTaken, 0);
        const attendanceMarked = fetchedAttempts.filter(attempt => attempt.attendanceMarked).length;
        const attendanceRate = Math.round((attendanceMarked / completedQuizzes) * 100);
        
        setStats({
          completedQuizzes,
          averageScore,
          totalTime,
          attendanceRate,
        });
      }
      
      setLoading(false);
    };

    loadData();
  }, [user]);

  // Format time (seconds) to minutes and seconds
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Get upcoming quizzes (not attempted yet)
  const upcomingQuizzes = userQuizzes.filter(quiz => 
    !quizAttempts.some(attempt => attempt.quizId === quiz.id)
  );

  // Get recent quiz attempts
  const recentAttempts = [...quizAttempts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  if (loading) {
    return (
      <DashboardLayout allowedRoles={['student']}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse-slow">Loading dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Completed Quizzes"
            value={stats.completedQuizzes}
            icon={<BookOpen className="h-5 w-5" />}
          />
          <StatCard
            title="Average Score"
            value={`${stats.averageScore}%`}
            icon={<Award className="h-5 w-5" />}
            trend={
              stats.averageScore > 0
                ? { value: stats.averageScore - 60, isPositive: stats.averageScore >= 60 }
                : undefined
            }
          />
          <StatCard
            title="Total Time"
            value={formatTime(stats.totalTime)}
            icon={<Clock className="h-5 w-5" />}
          />
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            icon={<Calendar className="h-5 w-5" />}
          />
        </div>
        
        {/* Upcoming Quizzes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Upcoming Quizzes</h2>
          {upcomingQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  subject={quiz.subject}
                  description={quiz.description}
                  duration={quiz.duration}
                  questionsCount={quiz.questions.length}
                  difficulty={quiz.difficulty}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You've attempted all available quizzes.</p>
          )}
        </div>
        
        {/* Recent Performance */}
        {recentAttempts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Recent Performance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Recent attempt cards */}
              <div className="grid grid-cols-1 gap-4">
                {recentAttempts.map((attempt) => {
                  const quiz = userQuizzes.find(q => q.id === attempt.quizId);
                  if (!quiz) return null;
                  
                  return (
                    <Card key={attempt.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription>
                          Completed on {new Date(attempt.date).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Score: {attempt.score}%</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              attempt.score >= 60 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {attempt.attendanceMarked ? 'Attendance Marked' : 'Below Threshold'}
                            </span>
                          </div>
                          <Progress value={attempt.score} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            Time taken: {formatTime(attempt.timeTaken)} of {quiz.duration} minutes allowed
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Performance summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your quiz performance summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Average Score</span>
                        <span className="text-sm">{stats.averageScore}%</span>
                      </div>
                      <Progress value={stats.averageScore} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Attendance Rate</span>
                        <span className="text-sm">{stats.attendanceRate}%</span>
                      </div>
                      <Progress value={stats.attendanceRate} className="h-2" />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Quiz Completion</span>
                        <span className="text-sm">
                          {stats.completedQuizzes}/{userQuizzes.length} completed
                        </span>
                      </div>
                      <Progress 
                        value={(stats.completedQuizzes / userQuizzes.length) * 100} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
