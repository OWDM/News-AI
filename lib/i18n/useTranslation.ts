import { useLanguageContext } from './LanguageContext';
import { translations, Translations } from './translations';

export function useTranslation(): Translations {
  const { language } = useLanguageContext();
  return translations[language];
}
