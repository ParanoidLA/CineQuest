// ThemeContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { Appearance, useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const paperTheme = useMemo(
    () => (theme === 'dark' ? DarkTheme : DefaultTheme),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <PaperProvider theme={paperTheme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
