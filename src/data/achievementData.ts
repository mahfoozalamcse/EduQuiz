
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'medal' | 'badge' | 'award';
  unlockedAt: string | null; // Date string when unlocked, null if locked
  progress?: {
    current: number;
    target: number;
  };
  category: 'quiz' | 'performance' | 'activity' | 'special';
}

// Mock achievements data for students
const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Quiz Completed',
    description: 'Complete your first quiz',
    icon: 'trophy',
    unlockedAt: '2023-10-15T14:32:00Z',
    category: 'quiz'
  },
  {
    id: '2',
    title: 'Perfect Score',
    description: 'Score 100% on any quiz',
    icon: 'medal',
    unlockedAt: null,
    progress: {
      current: 80,
      target: 100
    },
    category: 'performance'
  },
  {
    id: '3',
    title: 'Quiz Master',
    description: 'Complete 10 quizzes',
    icon: 'award',
    unlockedAt: null,
    progress: {
      current: 3,
      target: 10
    },
    category: 'quiz'
  },
  {
    id: '4',
    title: 'Speed Demon',
    description: 'Complete a quiz in less than half the allotted time',
    icon: 'badge',
    unlockedAt: '2023-10-17T10:20:00Z',
    category: 'performance'
  },
  {
    id: '5',
    title: 'Subject Expert',
    description: 'Score over 90% on 3 quizzes in the same subject',
    icon: 'medal',
    unlockedAt: null,
    progress: {
      current: 1,
      target: 3
    },
    category: 'performance'
  },
  {
    id: '6',
    title: 'Consistency King',
    description: 'Complete at least one quiz every day for a week',
    icon: 'trophy',
    unlockedAt: null,
    progress: {
      current: 3,
      target: 7
    },
    category: 'activity'
  },
  {
    id: '7',
    title: 'Early Bird',
    description: 'Complete a quiz before 8 AM',
    icon: 'badge',
    unlockedAt: '2023-10-20T07:45:00Z',
    category: 'activity'
  },
  {
    id: '8',
    title: 'Full Attendance',
    description: 'Maintain 100% attendance for a month',
    icon: 'award',
    unlockedAt: null,
    progress: {
      current: 75,
      target: 100
    },
    category: 'activity'
  }
];

// Get all achievements
export const getAchievements = () => {
  return achievements;
};

// Get achievements for a user
export const getUserAchievements = (userId: string) => {
  // In a real app, we would filter achievements based on user progress
  // For now, return all achievements
  return achievements;
};

// Unlock an achievement
export const unlockAchievement = (achievementId: string) => {
  const achievement = achievements.find(a => a.id === achievementId);
  if (achievement && !achievement.unlockedAt) {
    achievement.unlockedAt = new Date().toISOString();
    return true;
  }
  return false;
};

// Update achievement progress
export const updateAchievementProgress = (achievementId: string, progress: number) => {
  const achievement = achievements.find(a => a.id === achievementId);
  if (achievement && achievement.progress) {
    achievement.progress.current = progress;
    if (progress >= achievement.progress.target && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString();
    }
    return true;
  }
  return false;
};
