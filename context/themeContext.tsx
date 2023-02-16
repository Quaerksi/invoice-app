// Context/LoginContext
import React, {useEffect, useState, createContext } from "react";

interface ThemeProviderProps{
    children: React.ReactNode
}

export const ThemeContext = createContext({themeMode: 'light', setThemeMode: (themeMode: string) => {}});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {  
    
    // const [loggedIn, setLoggedIn] = useState(false); 
    const [themeMode, setThemeMode] = useState<string>()

     // handle theme mode
     useEffect(() => {

      if(themeMode === 'dark'){

        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); 

      } else if (themeMode === 'light'){
       
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); 
      }
      else{
        console.log('WARNING wrong theme mode name')
      }
    }, [themeMode])

      // save theme mode in browser
      let currentTheme;
      useEffect(() => {

        currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
        if (currentTheme) {

          if (currentTheme === 'dark') {

            setThemeMode('dark')
          } else {

            setThemeMode('light')
          }
        } else {
        localStorage.setItem('theme', 'light')
        setThemeMode('light')
      }
      }, []);

        
    return (
      <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
        {children}
      </ThemeContext.Provider>
    );
  };