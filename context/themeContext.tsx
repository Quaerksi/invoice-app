// Context/LoginContext
import React, {useEffect, useState, createContext } from "react";

interface ThemeProviderProps{
    children: React.ReactNode
}

export const ThemeContext = createContext({themeMode: 'light', setThemeMode: (themeMode: string) => {}});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {  
    
    // const [loggedIn, setLoggedIn] = useState(false); 
    const [themeMode, setThemeMode] = useState<string>('light')

     // handle theme mode
     useEffect(() => {
      console.log('Use effect')
      if(themeMode === 'dark'){
        console.log('Use effect 1 dark')
        document.documentElement.setAttribute('data-theme', 'dark');
        // localStorage.setItem('theme', 'dark'); 
      } else if (themeMode === 'light'){
        console.log('Use effect 2 light')
        document.documentElement.setAttribute('data-theme', 'light');
        // localStorage.setItem('theme', 'dark'); 
      }
      else{
        console.log('WARNING wrong theme mode name')
      }
    }, [themeMode])
    
      //To do: save preference on user browser
      // HANDLE SAVED THEME MODE
      // let currentTheme;
      // useEffect(() => {
      //   currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
      //   if (currentTheme) {
      //     document.documentElement.setAttribute('data-theme', currentTheme);
      //     if (currentTheme === 'dark') {     
      //        // buttn has to be toggled to be fitting the mode
      //     }
      // }
      // }, []);

        
    return (
      <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
        {children}
      </ThemeContext.Provider>
    );
  };