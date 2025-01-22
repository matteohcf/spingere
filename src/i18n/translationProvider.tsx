import React, { PropsWithChildren, useEffect } from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { useSelector } from 'react-redux';
import it from './it.json';
import en from './en.json';
import { getDeviceLanguage } from './index.ts';
import { userSelectors } from '../store/user.ts';
import { IS_DEV } from "../../config";

export const TranslationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const language = useSelector(userSelectors.language);

  useEffect(() => {
    const deviceLanguage = IS_DEV ? 'it' : getDeviceLanguage();
    i18n
      .use(initReactI18next)
      .init({
        compatibilityJSON: 'v3',
        fallbackLng: deviceLanguage,
        lng: deviceLanguage,
        resources: {
          en: {
            translation: en,
          },
          it: {
            translation: it,
          },
        },
      })
      .catch(console.error);
  }, [language]);

  return <>{children}</>;
};
