import { X } from 'lucide-react';
import { useSettings, darkThemes, lightThemes } from '../contexts/SettingsContext';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import Switch from './Switch';

const SettingsMenu = ({ onClose }: { onClose: () => void }) => {
  const { settings, updateSettings, setTheme, setColorScheme } = useSettings();
  const menuRef = useRef<HTMLDivElement>(null);
  const [tempTextSize, setTempTextSize] = useState(settings.textSize);
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    setTempTextSize(settings.textSize);
  }, [settings.textSize, onClose]);

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div ref={menuRef} className="settings-sidebar relative h-full w-80 shadow-xl animate-slide-in overflow-auto">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('accessibilitySettings')}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 space-y-6">
          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('theme')}
            </label>
            <select
              value={settings.theme}
              onChange={e => setTheme(e.target.value as 'light' | 'dark')}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-400 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="light">{t('light')}</option>
              <option value="dark">{t('dark')}</option>
            </select>
          </div>
          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('colorScheme')}
            </label>
            <select
              value={settings.theme === 'dark' ? settings.darkTheme : settings.lightTheme}
              onChange={e => setColorScheme(e.target.value)}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-400 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              {(settings.theme === 'dark' ? darkThemes : lightThemes).map(scheme => (
                <option key={scheme} value={scheme}>
                  {t(scheme.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/-([a-z])/g, g => ' ' + g[1].toUpperCase())) || t(scheme) || scheme.split(/-|(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
          {/* Background Animation */}
          <div className="flex items-center">
            <Switch
              id="background-animation"
              checked={!!settings.backgroundAnimation}
              onChange={e => updateSettings({ backgroundAnimation: e.target.checked })}
            />
            <label htmlFor="background-animation" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              {t('enableBackgroundAnimation')}
            </label>
          </div>
          {/* Text Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('textSize')}
            </label>
            <div className="flex flex-col">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={tempTextSize === 'small' ? 0 : tempTextSize === 'medium' ? 1 : 2}
                onChange={e => {
                  const value = parseInt(e.target.value);
                  const size = value === 0 ? 'small' : value === 1 ? 'medium' : 'large';
                  setTempTextSize(size as 'small' | 'medium' | 'large');
                }}
                onMouseUp={() => updateSettings({ textSize: tempTextSize })}
                className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>{t('small')}</span>
                <span>{t('medium')}</span>
                <span>{t('large')}</span>
              </div>
            </div>
          </div>
          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('language')}
            </label>
            <select
              value={settings.language}
              onChange={e => updateSettings({ language: e.target.value as 'en' | 'vi' })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-400 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
            </select>
          </div>
          {/* Font Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('fontStyle')}
            </label>
            <select
              value={settings.fontStyle}
              onChange={e => updateSettings({ fontStyle: e.target.value as 'open_sans' | 'opendyslexic-regular' | 'opendyslexic-bold' | 'pt_serif' })}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-400 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="open_sans">Open Sans</option>
              <option value="opendyslexic-regular">OpenDyslexic Regular</option>
              <option value="opendyslexic-bold">OpenDyslexic Bold</option>
              <option value="pt_serif">PT Serif</option>
            </select>
          </div>
          {/* Custom Cursor */}
          <div className="flex items-center">
            <Switch
              id="custom-cursor"
              checked={!!settings.customCursorEnabled}
              onChange={e => updateSettings({ customCursorEnabled: e.target.checked })}
            />
            <label htmlFor="custom-cursor" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              {t('enableCustomCursor')}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
