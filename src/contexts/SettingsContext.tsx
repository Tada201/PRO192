import  { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Global mouse click audio feedback (works regardless of custom cursor)

interface Settings {
  theme: 'light' | 'dark';
  textSize: 'small' | 'medium' | 'large';
  contrast: 'normal' | 'high';
  language: 'en' | 'vi';
  fontStyle: 'open_sans' | 'opendyslexic-regular' | 'opendyslexic-bold' | 'pt_serif';
  colorBlindnessMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  customCursorEnabled?: boolean; // Add this line
  audioEnabled?: boolean;
}

const defaultSettings: Settings = {
  theme: 'light',
  textSize: 'medium',
  contrast: 'normal',
  language: 'en',
  fontStyle: 'open_sans',
  colorBlindnessMode: 'none',
  customCursorEnabled: true, // Always enabled by default
  audioEnabled: true // Always enabled by default
};

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('pro192-settings');
      return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    }
    return defaultSettings;
  });

  // Apply settings to document
  useEffect(() => {
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply text size
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    switch (settings.textSize) {
      case 'small':
        document.documentElement.classList.add('text-sm');
        break;
      case 'medium':
        document.documentElement.classList.add('text-base');
        break;
      case 'large':
        document.documentElement.classList.add('text-lg');
        break;
    }

    // Apply contrast
    if (settings.contrast === 'high') {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

  // Apply font style
  document.documentElement.classList.remove('font-opendyslexic-regular', 'font-opendyslexic-bold', 'font-open-sans', 'font-pt-serif');
  switch (settings.fontStyle) {
    case 'opendyslexic-regular':
      document.documentElement.classList.add('font-opendyslexic-regular');
      document.documentElement.style.fontFamily = "'OpenDyslexic-Regular', serif";
      break;
    case 'opendyslexic-bold':
      document.documentElement.classList.add('font-opendyslexic-bold');
      document.documentElement.style.fontFamily = "'OpenDyslexic-Bold', serif";
      break;
    case 'open_sans':
      document.documentElement.classList.add('font-open-sans');
      document.documentElement.style.fontFamily = "'Open Sans', Arial, sans-serif";
      break;
    case 'pt_serif':
      document.documentElement.classList.add('font-pt-serif');
      document.documentElement.style.fontFamily = "'PT Serif', Georgia, serif";
      break;
    default:
      document.documentElement.style.fontFamily = "";
      break;
  }


    // Apply color blindness mode classes
    document.documentElement.classList.remove('color-blindness-protanopia', 'color-blindness-deuteranopia', 'color-blindness-tritanopia');
    switch (settings.colorBlindnessMode) {
      case 'protanopia':
        document.documentElement.classList.add('color-blindness-protanopia');
        break;
      case 'deuteranopia':
        document.documentElement.classList.add('color-blindness-deuteranopia');
        break;
      case 'tritanopia':
        document.documentElement.classList.add('color-blindness-tritanopia');
        break;
    }

    // Language setting does not require DOM class changes currently
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pro192-settings', JSON.stringify(updatedSettings));
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Global mouse click audio feedback (works regardless of custom cursor)
export function GlobalMouseAudio() {
  const { settings } = useSettings();
  useEffect(() => {
    const handleMouseDown = () => {
      if (settings.audioEnabled) {
        const audio = document.createElement('audio');
        audio.preload = 'auto';
        if (audio.canPlayType('audio/webm')) {
          audio.src = '/audio/granted.webm';
        } else {
          audio.src = '/audio/granted.wav';
        }
        audio.play().catch(() => {});
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [settings.audioEnabled]);
  return null;
}
