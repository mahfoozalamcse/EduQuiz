
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getUserQuizzes, getUserQuizAttempts, Quiz, QuizAttempt } from '@/data/quizData';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';

const Performance = () => {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    if (!user) return;
    
    const fetchedAttempts = getUserQuizAttempts(user.id);
    const fetchedQuizzes = getUserQuizzes(user.id);
    setAttempts(fetchedAttempts);
    setQuizzes(fetchedQuizzes);
  }, [user]);

  // Prepare data for charts
  const scoreData = attempts.map(attempt => {
    const quiz = quizzes.find(q => q.id === attempt.quizId);
    return {
      name: quiz?.title || 'Unknown Quiz',
      score: attempt.score,
      timeTaken: Math.round(attempt.timeTaken / 60), // Convert to minutes
      date: new Date(attempt.date).toLocaleDateString()
    };
  });

  // Calculate performance metrics
  const averageScore = scoreData.length 
    ? Math.round(scoreData.reduce((acc, curr) => acc + curr.score, 0) / scoreData.length) 
    : 0;

  const totalQuizzes = quizzes.length;
  const completedQuizzes = attempts.length;
  const completionRate = totalQuizzes ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0;

  return (
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Track your progress and quiz performance over time
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedQuizzes}/{totalQuizzes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Score Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Quiz Scores Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                className="w-full"
                config={{
                  primary: {
                    theme: { light: "#8B5CF6", dark: "#A78BFA" },
                  },
                }}
              >
                <LineChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-medium">Score:</div>
                          <div>{payload[0].value}%</div>
                        </div>
                      </div>
                    );
                  }} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="currentColor"
                    strokeWidth={2}
                    dot={{ fill: "currentColor" }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Time Taken Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Time Spent per Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                className="w-full"
                config={{
                  primary: {
                    theme: { light: "#10B981", dark: "#34D399" },
                  },
                }}
              >
                <BarChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-medium">Time:</div>
                          <div>{payload[0].value} minutes</div>
                        </div>
                      </div>
                    );
                  }} />
                  <Bar dataKey="timeTaken" fill="currentColor" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
