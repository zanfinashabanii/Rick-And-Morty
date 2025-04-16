import React, { createContext, useState } from 'react';
import { translations } from './translations';

export const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {},
  t: {},
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'de' : 'en'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
