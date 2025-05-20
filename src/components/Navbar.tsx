import { Menu, Sun, Moon, Settings } from 'lucide-react';
import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import SettingsMenu from './SettingsMenu';
import { useTranslation } from '../hooks/useTranslation';

interface NavbarProps {
  onMenuToggle: () => void;
  isSidebarExpanded: boolean;
}

const Navbar = ({ onMenuToggle, isSidebarExpanded }: NavbarProps) => {
  const { settings, updateSettings } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  const { t } = useTranslation();

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <header className="bg-blue-900 dark:bg-gray-800 shadow-sm sticky top-0 z-30">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="flex justify-between h-16">
          <div className="flex">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 md:hidden"
              onClick={onMenuToggle}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/media/logo.png"
                alt="PRO192 Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-300 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700"
              aria-label={t(settings.theme === 'light' ? 'dark' : 'light')}
            >
              {settings.theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => updateSettings({ audioEnabled: !settings.audioEnabled })}
              className={`p-2 rounded-full text-gray-300 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700 ${settings.audioEnabled ? '' : 'opacity-60'}`}
              aria-label={settings.audioEnabled ? 'Disable audio feedback' : 'Enable audio feedback'}
              title={settings.audioEnabled ? 'Disable audio feedback' : 'Enable audio feedback'}
            >
              <span className="text-xl">{settings.audioEnabled ? '🔊' : '🔇'}</span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-full text-gray-300 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700"
                aria-label={t('accessibilitySettings')}
              >
                <Settings className="h-5 w-5" />
              </button>
              
              {showSettings && (
                <SettingsMenu onClose={() => setShowSettings(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
