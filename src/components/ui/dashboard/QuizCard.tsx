
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface QuizCardProps {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number; // in minutes
  questionsCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completedCount?: number;
  bestScore?: number;
  className?: string;
}

export const QuizCard = ({
  id,
  title,
  subject,
  description,
  duration,
  questionsCount,
  difficulty,
  completedCount,
  bestScore,
  className,
}: QuizCardProps) => {
  // Difficulty colors
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          <Badge variant="secondary">{subject}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{questionsCount} questions</span>
          </div>
          {bestScore !== undefined && (
            <div className="flex items-center">
              <Award className="mr-1 h-4 w-4" />
              <span>{bestScore}%</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        {completedCount !== undefined && (
          <p className="text-xs text-muted-foreground">
            {completedCount > 0
              ? `Completed ${completedCount} ${completedCount === 1 ? 'time' : 'times'}`
              : 'Not taken yet'}
          </p>
        )}
        <Link to={`/quiz/${id}`}>
          <Button size="sm">
            {completedCount ? 'Retake Quiz' : 'Start Quiz'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
