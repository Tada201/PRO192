import  { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Global mouse click audio feedback (works regardless of custom cursor)

export const darkThemes = ['modern-dark', 'blue-professional', 'deep-purple'] as const;
export const lightThemes = ['light-minimal', 'light-warm', 'light-cool', 'pastel'] as const;

interface Settings {
  theme: 'light' | 'dark';
  darkTheme: (typeof darkThemes)[number];
  lightTheme: (typeof lightThemes)[number];
  textSize: 'small' | 'medium' | 'large';
  contrast: 'normal' | 'high';
  language: 'en' | 'vi';
  fontStyle: 'open_sans' | 'opendyslexic-regular' | 'opendyslexic-bold' | 'pt_serif';
  colorBlindnessMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  customCursorEnabled?: boolean;
  audioEnabled?: boolean;
  backgroundAnimation: boolean;
  designerMode?: boolean;
}


interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setColorScheme: (scheme: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  function castSettings(raw: any): Settings {
    return {
      theme: raw.theme as 'light' | 'dark',
      darkTheme: raw.darkTheme as (typeof darkThemes)[number],
      lightTheme: raw.lightTheme as (typeof lightThemes)[number],
      textSize: raw.textSize as 'small' | 'medium' | 'large',
      contrast: raw.contrast as 'normal' | 'high',
      language: raw.language as 'en' | 'vi',
      fontStyle: raw.fontStyle as 'open_sans' | 'opendyslexic-regular' | 'opendyslexic-bold' | 'pt_serif',
      colorBlindnessMode: raw.colorBlindnessMode as 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia',
      customCursorEnabled: raw.customCursorEnabled,
      audioEnabled: raw.audioEnabled,
      backgroundAnimation: raw.backgroundAnimation,
      designerMode: raw.designerMode
    };
  }

  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('pro192-settings');
      return savedSettings ? castSettings(JSON.parse(savedSettings)) : castSettings({
        theme: 'dark',
        darkTheme: 'blue-professional',
        lightTheme: 'light-minimal',
        textSize: 'medium',
        contrast: 'normal',
        language: 'en',
        fontStyle: 'open_sans',
        colorBlindnessMode: 'none',
        customCursorEnabled: true,
        audioEnabled: true,
        backgroundAnimation: true,
        designerMode: false
      });
    }
    return castSettings({
      theme: 'dark',
      darkTheme: 'blue-professional',
      lightTheme: 'light-minimal',
      textSize: 'medium',
      contrast: 'normal',
      language: 'en',
      fontStyle: 'open_sans',
      colorBlindnessMode: 'none',
      customCursorEnabled: true,
      audioEnabled: true,
      backgroundAnimation: true,
      designerMode: false
    });
  });

  // Apply settings to document
  useEffect(() => {
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply designer mode
    if (settings.designerMode) {
      document.documentElement.classList.add('designer-mode');
    } else {
      document.documentElement.classList.remove('designer-mode');
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


    // Apply color scheme
    const html = document.documentElement;
    Array.from(html.classList)
      .filter(className => className.startsWith('scheme-'))
      .forEach(className => html.classList.remove(className));

    const currentScheme = settings.theme === 'dark' ? settings.darkTheme : settings.lightTheme;
    html.classList.add(`scheme-${currentScheme}`);

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
    // If theme or color scheme is being updated, apply immediately for global effect
    let mergedSettings = { ...settings, ...newSettings };
    // If theme is being set, also update color scheme to match default for that theme if not provided
    if (newSettings.theme) {
      if (newSettings.theme === 'dark' && !('darkTheme' in newSettings)) {
        mergedSettings.darkTheme = settings.darkTheme || 'modern-dark';
      }
      if (newSettings.theme === 'light' && !('lightTheme' in newSettings)) {
        mergedSettings.lightTheme = settings.lightTheme || 'light-minimal';
      }
    }
    setSettings(mergedSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pro192-settings', JSON.stringify(mergedSettings));
    }
    // Force re-apply all settings to document for global update
    setTimeout(() => {
      // This will trigger the useEffect to re-apply all settings
      setSettings(s => ({ ...s }));
    }, 0);
  };

  const setTheme = (theme: 'light' | 'dark') => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const updatedSettings = { ...settings, theme };
    if (typeof window !== 'undefined') {
      localStorage.setItem('pro192-settings', JSON.stringify(updatedSettings));
    }
    setSettings(updatedSettings);
  };

  const setColorScheme = (scheme: string) => {
    const html = document.documentElement;
    Array.from(html.classList)
      .filter(className => className.startsWith('scheme-'))
      .forEach(className => html.classList.remove(className));
    html.classList.add(`scheme-${scheme}`);
    let updatedSettings;
    if (settings.theme === 'dark') {
      updatedSettings = { ...settings, darkTheme: scheme as (typeof darkThemes)[number] };
    } else {
      updatedSettings = { ...settings, lightTheme: scheme as (typeof lightThemes)[number] };
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('pro192-settings', JSON.stringify(updatedSettings));
    }
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, setTheme, setColorScheme }}>
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
      if (settings.audioEnabled && !audioPlayingRef.current) {
        audioPlayingRef.current = true;
        if (devtool) console.log('[CustomCursor] Playing click audio');
        const audio = document.createElement('audio');
        audio.preload = 'auto';
        if (audio.canPlayType('audio/webm')) {
          audio.src = '/audio/granted.webm';
        } else {
          audio.src = '/audio/granted.wav';
        }
        audio.onended = () => {
          if (devtool) console.log('[CustomCursor] Audio ended');
          audioPlayingRef.current = false;
        };
        audio.onpause = () => {
          if (devtool) console.log('[CustomCursor] Audio paused');
          audioPlayingRef.current = false;
        };
        audio.onerror = () => {
          if (devtool) console.log('[CustomCursor] Audio error');
          audioPlayingRef.current = false;
        };
        audio.play().catch(() => {
          if (devtool) console.log('[CustomCursor] Audio play error');
          audioPlayingRef.current = false;
        });
      }
    };
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [settings.audioEnabled]);
  return null;
}