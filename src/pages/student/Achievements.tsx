
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { getUserAchievements, Achievement } from '@/data/achievementData';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Award, Badge, Medal, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

const Achievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState<Achievement['category'] | 'all'>('all');

  useEffect(() => {
    if (!user) return;
    
    const fetchedAchievements = getUserAchievements(user.id);
    setAchievements(fetchedAchievements);
  }, [user]);

  // Filter achievements by category
  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === filter);

  // Count unlocked achievements
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const totalCount = achievements.length;
  const unlockedPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Render achievement icon based on type
  const renderIcon = (icon: Achievement['icon'], unlocked: boolean) => {
    const className = cn(
      'h-8 w-8',
      unlocked 
        ? 'text-primary' 
        : 'text-muted-foreground/40'
    );

    switch (icon) {
      case 'trophy':
        return <Trophy className={className} />;
      case 'medal':
        return <Medal className={className} />;
      case 'badge':
        return <Badge className={className} />;
      case 'award':
        return <Award className={className} />;
      default:
        return <Trophy className={className} />;
    }
  };

  return (
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground mt-2">
            Track your progress and unlock special achievements
          </p>
        </div>
        
        {/* Achievement Progress Overview */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Unlocked: {unlockedCount}/{totalCount}</span>
                <span className="font-medium">{unlockedPercentage}%</span>
              </div>
              <Progress value={unlockedPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        {/* Achievement Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all" onClick={() => setFilter('all')}>All</TabsTrigger>
            <TabsTrigger value="quiz" onClick={() => setFilter('quiz')}>Quiz</TabsTrigger>
            <TabsTrigger value="performance" onClick={() => setFilter('performance')}>Performance</TabsTrigger>
            <TabsTrigger value="activity" onClick={() => setFilter('activity')}>Activity</TabsTrigger>
            <TabsTrigger value="special" onClick={() => setFilter('special')}>Special</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="quiz" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="special" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Achievement Card Component
const AchievementCard = ({ achievement }: { achievement: Achievement }) => {
  const isUnlocked = !!achievement.unlockedAt;
  
  return (
    <Card className={cn(
      'overflow-hidden transition-all',
      isUnlocked 
        ? 'border-primary/50 bg-card' 
        : 'bg-muted/20 border-dashed'
    )}>
      <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-4">
        <div className={cn(
          'p-2 rounded-full',
          isUnlocked 
            ? 'bg-primary/10' 
            : 'bg-muted'
        )}>
          {achievement.icon === 'trophy' && <Trophy className={cn('h-6 w-6', isUnlocked ? 'text-primary' : 'text-muted-foreground/40')} />}
          {achievement.icon === 'medal' && <Medal className={cn('h-6 w-6', isUnlocked ? 'text-primary' : 'text-muted-foreground/40')} />}
          {achievement.icon === 'badge' && <Badge className={cn('h-6 w-6', isUnlocked ? 'text-primary' : 'text-muted-foreground/40')} />}
          {achievement.icon === 'award' && <Award className={cn('h-6 w-6', isUnlocked ? 'text-primary' : 'text-muted-foreground/40')} />}
        </div>
        <div>
          <CardTitle className={cn(
            'text-base',
            !isUnlocked && 'text-muted-foreground'
          )}>
            {achievement.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className={cn(
          'text-sm mb-4',
          !isUnlocked && 'text-muted-foreground'
        )}>
          {achievement.description}
        </p>
        
        {achievement.progress && !isUnlocked && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{achievement.progress.current}/{achievement.progress.target}</span>
            </div>
            <Progress 
              value={(achievement.progress.current / achievement.progress.target) * 100} 
              className="h-1.5" 
            />
          </div>
        )}
        
        {isUnlocked && (
          <div className="text-xs text-primary-foreground/70 bg-primary/10 py-1 px-2 rounded text-center">
            Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Achievements;
