
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Clock, AlertCircle } from 'lucide-react';
import { quizzes, Quiz as QuizType, Question } from '@/data/quizData';
import { useAuth } from '@/context/AuthContext';

const Quiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Find the quiz from our data
  const quiz = quizzes.find(q => q.id === id);
  
  // State for the quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Handle case where quiz is not found
  useEffect(() => {
    if (!quiz) {
      toast.error("Quiz not found");
      navigate("/student/dashboard");
      return;
    }
    
    // Initialize timer when quiz is found
    setTimeLeft(quiz.duration * 60); // Convert minutes to seconds
    setLoading(false);
  }, [quiz, navigate]);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || isQuizCompleted || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizStarted, isQuizCompleted, timeLeft]);

  const startQuiz = () => {
    setQuizStarted(true);
    toast.info("Quiz started! Good luck!");
  };

  const handleOptionSelect = (questionId: string, optionIndex: number) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    if (!quiz) return;
    
    // Calculate score
    let correctAnswers = 0;
    
    quiz.questions.forEach(question => {
      if (selectedOptions[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(calculatedScore);
    
    // Mark quiz as completed
    setIsQuizCompleted(true);
    setQuizStarted(false);
    
    // Check if score is above threshold for attendance
    const attendanceMarked = calculatedScore >= 60;
    
    // Save quiz attempt
    const timestamp = new Date().toISOString();
    const quizAttempt = {
      id: `attempt-${timestamp}`,
      userId: user?.id || '',
      quizId: quiz.id,
      score: calculatedScore,
      timeTaken: (quiz.duration * 60) - timeLeft,
      date: timestamp,
      attendanceMarked,
      completed: true,
      answers: Object.values(selectedOptions)
    };
    
    // In a real app, we would save this to a database
    // For now, we'll just show a toast notification
    if (attendanceMarked) {
      toast.success("Quiz completed! Attendance has been marked.");
    } else {
      toast.info("Quiz completed. Score was below the attendance threshold.");
    }
    
    // Store in localStorage for demo purposes
    const attemptHistory = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
    attemptHistory.push(quizAttempt);
    localStorage.setItem('quiz_attempts', JSON.stringify(attemptHistory));
  };

  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (loading) {
    return (
      <DashboardLayout allowedRoles={['student']}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse">Loading quiz...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!quiz) {
    return (
      <DashboardLayout allowedRoles={['student']}>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The quiz you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/student/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          {quizStarted && !isQuizCompleted && (
            <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-950/30 text-orange-800 dark:text-orange-400 px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{formatTimeRemaining(timeLeft)}</span>
            </div>
          )}
        </div>
        
        {!quizStarted && !isQuizCompleted && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Subject</h3>
                <p>{quiz.subject}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Description</h3>
                <p>{quiz.description}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="font-medium mb-1">Questions</h3>
                  <p>{quiz.questions.length}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Time Limit</h3>
                  <p>{quiz.duration} minutes</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Difficulty</h3>
                  <p className="capitalize">{quiz.difficulty}</p>
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-md text-amber-800 dark:text-amber-400 mt-4">
                <h3 className="font-medium mb-1">Important Note</h3>
                <p className="text-sm">
                  You need to score at least 60% to have your attendance marked for this quiz.
                  Once you start, the timer cannot be paused.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={startQuiz} className="w-full">Start Quiz</Button>
            </CardFooter>
          </Card>
        )}
        
        {quizStarted && !isQuizCompleted && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {quiz.questions.length}
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </CardHeader>
            <CardContent className="pt-3">
              <h2 className="text-xl font-medium mb-6">{currentQuestion.text}</h2>
              <RadioGroup
                value={selectedOptions[currentQuestion.id]?.toString() || ''}
                onValueChange={(value) => handleOptionSelect(currentQuestion.id, parseInt(value))}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <div>
                {currentQuestionIndex === quiz.questions.length - 1 ? (
                  <Button onClick={submitQuiz}>Submit Quiz</Button>
                ) : (
                  <Button onClick={goToNextQuestion}>Next</Button>
                )}
              </div>
            </CardFooter>
          </Card>
        )}
        
        {isQuizCompleted && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-4">{score}%</div>
                <p className="text-lg">
                  {score >= 60 
                    ? "Congratulations! Your attendance has been marked." 
                    : "You didn't reach the attendance threshold."}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Your Score</span>
                  <span>{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">Summary</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Attendance Threshold</span>
                    <span>60%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Attendance Marked</span>
                    <span>{score >= 60 ? "Yes" : "No"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Total Questions</span>
                    <span>{quiz.questions.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Time Taken</span>
                    <span>
                      {formatTimeRemaining((quiz.duration * 60) - timeLeft)} of {quiz.duration} min
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate('/student/dashboard')} 
                className="w-full"
              >
                Return to Dashboard
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Quiz;
