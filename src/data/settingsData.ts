
// User settings interface
export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    quizReminders: boolean;
    achievementAlerts: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reduceMotion: boolean;
  };
  quizPreferences: {
    autoSubmit: boolean;
    showTimer: boolean;
    showHints: boolean;
  };
  privacy: {
    showProfileToOthers: boolean;
    shareActivity: boolean;
    allowDataCollection: boolean;
  };
}

// Default settings
const defaultSettings: UserSettings = {
  id: '1',
  userId: '1',
  theme: 'system',
  notifications: {
    email: true,
    push: true,
    quizReminders: true,
    achievementAlerts: true,
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
  },
  quizPreferences: {
    autoSubmit: true,
    showTimer: true,
    showHints: true,
  },
  privacy: {
    showProfileToOthers: true,
    shareActivity: true,
    allowDataCollection: true,
  },
};

// Mock database of user settings
let userSettingsDB: UserSettings[] = [defaultSettings];

// Get user settings
export const getUserSettings = (userId: string): UserSettings => {
  const userSettings = userSettingsDB.find(settings => settings.userId === userId);
  
  if (!userSettings) {
    // Create default settings for new user
    const newSettings = { 
      ...defaultSettings, 
      id: `settings-${Date.now()}`, 
      userId 
    };
    userSettingsDB.push(newSettings);
    return newSettings;
  }
  
  return userSettings;
};

// Update user settings
export const updateUserSettings = (
  userId: string, 
  updatedSettings: Partial<UserSettings>
): UserSettings => {
  const existingSettings = getUserSettings(userId);
  
  const updatedUserSettings = {
    ...existingSettings,
    ...updatedSettings,
    // Ensure nested objects are properly merged
    notifications: {
      ...existingSettings.notifications,
      ...(updatedSettings.notifications || {})
    },
    accessibility: {
      ...existingSettings.accessibility,
      ...(updatedSettings.accessibility || {})
    },
    quizPreferences: {
      ...existingSettings.quizPreferences,
      ...(updatedSettings.quizPreferences || {})
    },
    privacy: {
      ...existingSettings.privacy,
      ...(updatedSettings.privacy || {})
    },
  };
  
  // Update in our mock database
  userSettingsDB = userSettingsDB.map(settings => 
    settings.userId === userId ? updatedUserSettings : settings
  );
  
  return updatedUserSettings;
};

// Reset user settings to default
export const resetUserSettings = (userId: string): UserSettings => {
  const resetSettings = { 
    ...defaultSettings, 
    id: `settings-${Date.now()}`, 
    userId 
  };
  
  userSettingsDB = userSettingsDB.map(settings => 
    settings.userId === userId ? resetSettings : settings
  );
  
  return resetSettings;
};
