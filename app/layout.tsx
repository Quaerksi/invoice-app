"use client"

import '../styles/design-tokens.css'
import '../styles/globals.css'
import styles from './layout.module.css'
import { League_Spartan} from '@next/font/google'

// Context theme
import { ThemeProvider } from '../context/themeContext'
// component
import Aside from "../components/aside"


// Fallback fonts neccesary here?
const league_Spartan = League_Spartan({ subsets: ['latin']})

export default function Layout({ children }: {
    children: React.ReactNode;
  }) {

    //handle theme mode
    // const {themeMode} = useThemeContext();

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
        
          <body style={{fontFamily: `${league_Spartan.style.fontFamily}`}} className={styles.contentOrder}>
            <ThemeProvider>
              <Aside />
              <div className={styles.content}>
                {children}
              </div>
            </ThemeProvider>
          </body>
        
      </html>
      )
  }
