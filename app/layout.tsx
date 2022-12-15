"use client"

import '../styles/design-tokens.css'
import '../styles/globals.css'
import styles from './layout.module.css'
import { League_Spartan} from '@next/font/google'

// Fallback fonts neccesary here?
import Aside from "../components/aside"
import React, { useState, useEffect } from 'react';
import {DarkModeThemeContext} from './darkModeThemeContext';

const league_Spartan = League_Spartan({ subsets: ['latin']})

export default function Layout({ children }: {
    children: React.ReactNode;
  }) {

    //handle theme mode
    //To do: save preference on user browser
    const [themeMode, setThemeMode] = useState<string>('light')

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


    // handle theme mode
    useEffect(() => {
      console.log('Use effect')
      if(themeMode === 'dark'){
        document.documentElement.setAttribute('data-theme', 'dark');
        // localStorage.setItem('theme', 'dark'); 
      } else if (themeMode === 'light'){
        document.documentElement.setAttribute('data-theme', 'light');
        // localStorage.setItem('theme', 'dark'); 
      }
      else{
        console.log('WARNING wrong theme mode name')
      }
    }, [themeMode])

        // const DarkModeThemeContext = React.createContext<String>(`light`);
        // const DarkModeThemeContext = React.createContext<String>(`${themeMode}`);

    return (
      <html lang="en">
        <head>
          <title>Next.js</title>
          <meta property="custom" content="I am in every page even 404" />
          {/* The <style> element will be supported in the future */}
          {/* <style jsx global>{`
              html {
                font-family: ${league_Spartan.style.fontFamily};
              }
            `}</style> */}
        </head>
        <DarkModeThemeContext.Provider value={themeMode}>
          <body style={{fontFamily: `${league_Spartan.style.fontFamily}`}} className={styles.localVar}>
            <aside className={styles.aside}>
              <Aside themeMode={themeMode} setThemeMode={setThemeMode}/>
            </aside>
            <div className={styles.content}>
            {children}
            </div>
          </body>
        </DarkModeThemeContext.Provider>
      </html>
      )
  }
