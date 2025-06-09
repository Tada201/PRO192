import { Sun, Moon, Settings } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useSearch } from '../contexts/SearchContext';
import { useTranslation } from '../hooks/useTranslation';
import HamburgerCheckbox from './HamburgerCheckbox';

interface NavbarProps {
  onMenuToggle: () => void;
  isSidebarExpanded: boolean;
  isSidebarOpen?: boolean;
  onSettingsMenuToggle: () => void;
}

const Navbar = ({ onMenuToggle, isSidebarExpanded, isSidebarOpen, onSettingsMenuToggle }: NavbarProps) => {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();
  const { toggleSearch } = useSearch();

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <header className="bg-blue-900 dark:bg-gray-800 shadow-sm sticky top-0 z-30">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <HamburgerCheckbox checked={!!isSidebarOpen} onChange={onMenuToggle} />
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
              id="search-trigger"
              onClick={toggleSearch}
              className="bg-none border-none text-white text-2xl cursor-pointer p-1 rounded hover:bg-blue-800 dark:hover:bg-gray-700"
              aria-label="Open search"
              title="Open search"
            >
              🔍
            </button>
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
                onClick={onSettingsMenuToggle}
                className="p-2 rounded-full text-gray-300 dark:text-gray-400 hover:text-gray-200 dark:hover:text-gray-300 hover:bg-blue-800 dark:hover:bg-gray-700"
                aria-label={t('accessibilitySettings')}
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
