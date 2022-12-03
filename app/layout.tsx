"use client"

import styles from './layout.module.css'
import '../styles/globals.css'
import '../styles/design-tokens.css'
import { League_Spartan} from '@next/font/google'
// Fallback fonts neccesary here?
import Aside from "../components/aside"
import React, { useState } from 'react';

const league_Spartan = League_Spartan({ subsets: ['latin']})

export default function Layout({ children }: {
    children: React.ReactNode;
  }) {

    //false is light mide, true is dark mode
    //To do: save preference on user browser
    const [darkMode, setDarkMode] = useState(false);;

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
        <body style={{fontFamily: `${league_Spartan.style.fontFamily}`}} className={styles.localVar}>
          <aside className={styles.aside}>
            <Aside darkMode={darkMode} setDarkMode={setDarkMode}/>
          </aside>
          <div className={styles.content}>
          {children}
          </div>
        </body>
      </html>
      )
  }
