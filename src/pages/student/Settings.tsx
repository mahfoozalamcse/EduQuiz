
import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { getUserSettings, updateUserSettings, UserSettings, resetUserSettings } from '@/data/settingsData';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { 
  Monitor, 
  Moon, 
  Sun, 
  BellRing, 
  Eye, 
  EyeOff, 
  Lock, 
  Timer, 
  HelpCircle, 
  Mail,
  MessageSquare,
  Award,
  ChevronDown,
  RefreshCw,
  Save,
  UserCog,
  FileText,
  Hammer,
  Settings as SettingsIcon
} from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('general');

  useEffect(() => {
    if (user) {
      const userSettings = getUserSettings(user.id);
      setSettings(userSettings);
    }
  }, [user]);

  const handleSave = () => {
    if (user && settings) {
      updateUserSettings(user.id, settings);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }
  };

  const handleReset = () => {
    if (user) {
      const defaultSettings = resetUserSettings(user.id);
      setSettings(defaultSettings);
      toast({
        title: "Settings reset",
        description: "Your preferences have been restored to default.",
      });
    }
  };

  const updateSetting = (path: string[], value: any) => {
    if (!settings) return;
    
    const newSettings = { ...settings };
    let current: any = newSettings;
    
    // Navigate to the nested property
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    
    // Set the value
    current[path[path.length - 1]] = value;
    setSettings(newSettings);
  };

  if (!settings) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse">Loading settings...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container max-w-4xl py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account preferences and settings
            </p>
          </div>
          <SettingsIcon className="h-6 w-6 text-muted-foreground" />
        </div>

        <Tabs defaultValue="general" className="space-y-4" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-5 sm:grid-cols-5 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Preferences</CardTitle>
                <CardDescription>
                  Choose how EduQuiz looks for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue={settings.theme} 
                  value={settings.theme}
                  onValueChange={(value) => updateSetting(['theme'], value as 'light' | 'dark' | 'system')}
                  className="grid grid-cols-3 gap-4"
                >
                  <div>
                    <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Sun className="mb-3 h-6 w-6" />
                      Light
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Moon className="mb-3 h-6 w-6" />
                      Dark
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <Monitor className="mb-3 h-6 w-6" />
                      System
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Advanced Settings</CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CardDescription>
                    Configure advanced options for your account
                  </CardDescription>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-4 justify-between">
                        <div>
                          <Label>Developer Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable access to developer tools and logging
                          </p>
                        </div>
                        <Switch 
                          checked={false} 
                          disabled 
                          aria-readonly
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center gap-4 justify-between">
                        <div>
                          <Label>Experimental Features</Label>
                          <p className="text-sm text-muted-foreground">
                            Try new features before they're released
                          </p>
                        </div>
                        <Switch 
                          checked={false} 
                          disabled 
                          aria-readonly
                        />
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </TabsContent>

          {/* Notifications Settings Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose when and how you'd like to be notified
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label>Email Notifications</Label>
                    </div>
                    <Switch 
                      checked={settings.notifications.email} 
                      onCheckedChange={(checked) => updateSetting(['notifications', 'email'], checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Label>Push Notifications</Label>
                    </div>
                    <Switch 
                      checked={settings.notifications.push} 
                      onCheckedChange={(checked) => updateSetting(['notifications', 'push'], checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2">
                      <BellRing className="h-4 w-4 text-muted-foreground" />
                      <Label>Quiz Reminders</Label>
                    </div>
                    <Switch 
                      checked={settings.notifications.quizReminders} 
                      onCheckedChange={(checked) => updateSetting(['notifications', 'quizReminders'], checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <Label>Achievement Alerts</Label>
                    </div>
                    <Switch 
                      checked={settings.notifications.achievementAlerts} 
                      onCheckedChange={(checked) => updateSetting(['notifications', 'achievementAlerts'], checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Settings Tab */}
          <TabsContent value="accessibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>
                  Customize your experience for better accessibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Text Size</Label>
                  <RadioGroup 
                    value={settings.accessibility.fontSize}
                    onValueChange={(value) => updateSetting(['accessibility', 'fontSize'], value as 'small' | 'medium' | 'large')}
                    className="flex gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="small" id="font-small" />
                      <Label htmlFor="font-small" className="text-sm">Small</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="medium" id="font-medium" />
                      <Label htmlFor="font-medium" className="text-base">Medium</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="large" id="font-large" />
                      <Label htmlFor="font-large" className="text-lg">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
                <Separator />
                <div className="flex items-center gap-4 justify-between">
                  <div>
                    <Label>High Contrast</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch 
                    checked={settings.accessibility.highContrast} 
                    onCheckedChange={(checked) => updateSetting(['accessibility', 'highContrast'], checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center gap-4 justify-between">
                  <div>
                    <Label>Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations and transitions
                    </p>
                  </div>
                  <Switch 
                    checked={settings.accessibility.reduceMotion} 
                    onCheckedChange={(checked) => updateSetting(['accessibility', 'reduceMotion'], checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Settings Tab */}
          <TabsContent value="quiz" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Preferences</CardTitle>
                <CardDescription>
                  Customize your quiz-taking experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 justify-between">
                  <div>
                    <Label>Auto-Submit</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically submit quiz when time runs out
                    </p>
                  </div>
                  <Switch 
                    checked={settings.quizPreferences.autoSubmit} 
                    onCheckedChange={(checked) => updateSetting(['quizPreferences', 'autoSubmit'], checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <Label>Show Timer</Label>
                  </div>
                  <Switch 
                    checked={settings.quizPreferences.showTimer} 
                    onCheckedChange={(checked) => updateSetting(['quizPreferences', 'showTimer'], checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    <Label>Show Hints</Label>
                  </div>
                  <Switch 
                    checked={settings.quizPreferences.showHints} 
                    onCheckedChange={(checked) => updateSetting(['quizPreferences', 'showHints'], checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings Tab */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your data and what others can see
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-muted-foreground" />
                    <Label>Public Profile</Label>
                  </div>
                  <Switch 
                    checked={settings.privacy.showProfileToOthers} 
                    onCheckedChange={(checked) => updateSetting(['privacy', 'showProfileToOthers'], checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <Label>Activity Sharing</Label>
                  </div>
                  <Switch 
                    checked={settings.privacy.shareActivity} 
                    onCheckedChange={(checked) => updateSetting(['privacy', 'shareActivity'], checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <Label>Data Collection</Label>
                  </div>
                  <Switch 
                    checked={settings.privacy.allowDataCollection} 
                    onCheckedChange={(checked) => updateSetting(['privacy', 'allowDataCollection'], checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button variant="outline" onClick={handleReset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset Defaults
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
