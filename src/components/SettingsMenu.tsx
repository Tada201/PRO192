import  { X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useEffect, useRef, useState } from 'react';
import { translations } from '../data/translations';

interface SettingsMenuProps {
  onClose: () => void;
}

const SettingsMenu = ({ onClose }: SettingsMenuProps) => {
  const { settings, updateSettings } = useSettings();
  const menuRef = useRef<HTMLDivElement>(null);
  const [tempTextSize, setTempTextSize] = useState(settings.textSize);
  
  const { textSize, language } = settings;
  const t = translations[language] || translations['en'];

  const applyTextSize = () => {
    updateSettings({ textSize: tempTextSize });
  };

  const setLanguage = (lang: 'en' | 'vi') => {
    updateSettings({ language: lang });
  };
  
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

  // Reset tempTextSize when settings.textSize changes or menu closes
  useEffect(() => {
    setTempTextSize(textSize);
  }, [textSize, onClose]);

  return (
    <div 
      ref={menuRef}
      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 origin-top-right z-50"
    >
      <div className="py-1 p-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{t.accessibilitySettings}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="textSizeSlider" className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.textSize}</label>
            <input
              id="textSizeSlider"
              type="range"
              min={0}
              max={2}
              step={1}
              value={['small', 'medium', 'large'].indexOf(tempTextSize)}
              onChange={(e) => {
                const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
                setTempTextSize(sizes[parseInt(e.target.value)]);
              }}
              className="w-full mt-1"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1 px-1 select-none">
              <span>{t.small}</span>
              <span>{t.medium}</span>
              <span>{t.large}</span>
            </div>
            {tempTextSize !== textSize && (
              <button
                onClick={applyTextSize}
                className="mt-2 w-full bg-blue-600 text-white py-1 rounded-md text-sm hover:bg-blue-700 transition"
              >
                Apply
              </button>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.language}</label>
            <select
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-1 px-2 text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'vi')}
            >
              <option value="en">{t.english}</option>
              <option value="vi">{t.vietnamese}</option>
            </select>
          </div>

          <div>
            <label htmlFor="fontStyleSelect" className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.fontStyle}</label>
            <select
              id="fontStyleSelect"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-1 px-2 text-sm"
              value={settings.fontStyle}
              onChange={(e) => updateSettings({ fontStyle: e.target.value as any })}
            >
              <option value="open_sans">{t.openSans}</option>
              <option value="opendyslexic-regular">{t.openDyslexicRegular}</option>
              <option value="opendyslexic-bold">{t.openDyslexicBold}</option>
              <option value="pt_serif">{t.ptSerif}</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300">{t.customCursor}</label>
            <div className="mt-1">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={settings.customCursorEnabled}
                  onChange={(e) => updateSettings({ customCursorEnabled: e.target.checked })}
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{t.enableCustomCursor}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
