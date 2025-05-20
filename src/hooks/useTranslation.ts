import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../data/translations';

export function useTranslation() {
  const { settings } = useSettings();
  const language = settings.language || 'en';

  function t(key: string): string {
    const langTranslations = translations[language] || translations['en'];
    if (key in langTranslations) {
      return langTranslations[key as keyof typeof langTranslations];
    }
    return key;
  }

  return { t };
}
