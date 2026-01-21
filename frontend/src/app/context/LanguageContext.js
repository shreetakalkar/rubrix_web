'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState({});

  // Load saved language once
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
  }, []);

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  
  const loadTranslations = useCallback((pageTranslations) => {
    setTranslations(pageTranslations);
  }, []);

  const t = useCallback(
    (key) => {
      if (language === 'en') return null;
      return translations?.[language]?.[key] || null;
    },
    [language, translations]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        loadTranslations,
        t
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
