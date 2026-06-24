import en from '@/locales/en.json';

const translations = { en };

export function useTranslation() {
  const t = (key) => {
    return key.split('.').reduce((obj, part) => obj?.[part], translations.en);
  };
  return { t };
}