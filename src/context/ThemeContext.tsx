import React, { createContext, useContext, useState, useEffect } from 'react';

type PlatformMode = 'ios' | 'md';
type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  platformMode: PlatformMode;
  toggleTheme: () => void;
  togglePlatformMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [platformMode, setPlatformMode] = useState<PlatformMode>('md');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  useEffect(() => {
    // Dynamically update the html mode attribute for Ionic adaptive rendering
    document.documentElement.setAttribute('mode', platformMode);
  }, [platformMode]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const togglePlatformMode = () => {
    setPlatformMode(prev => (prev === 'md' ? 'ios' : 'md'));
  };

  return (
    <ThemeContext.Provider value={{ theme, platformMode, toggleTheme, togglePlatformMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};
