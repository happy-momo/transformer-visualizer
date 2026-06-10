import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'dark' | 'light';

export const AppContext = createContext<{
  lang: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  lang: 'zh',
  theme: 'dark',
  setTheme: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const lang = 'zh';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Expose it as context
  return (
    <AppContext.Provider value={{ lang, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
