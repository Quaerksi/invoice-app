"use client"

import '../styles/design-tokens.css'
import '../styles/globals.css'
import styles from './layout.module.css'

// Context theme
import { ThemeProvider } from '../context/themeContext'
// component
import Aside from "../app/componentsApp/aside"

export default function Layout({ children }: {
    children: React.ReactNode;
  }) {

    return (
      <>
        <ThemeProvider>
          <div className={styles.contentOrder}>
            <Aside />
            <div className={styles.content}>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </>
    )
}
