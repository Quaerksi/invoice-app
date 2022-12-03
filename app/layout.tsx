import styles from './layout.module.css'
// import '../styles/globals.css'
import '../styles/design-tokens.css'
import { League_Spartan, Roboto_Flex} from '@next/font/google'
// Fallback fonts neccesary here?

const league_Spartan = League_Spartan({ subsets: ['latin']})
const fontFam:String = league_Spartan.style.fontFamily;

export default function Layout({ children }: {
    children: React.ReactNode;
  }) {
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
        <body style={{fontFamily: `${fontFam}`}} className={styles.localVar}>
          <aside className={styles.aside}>aside</aside>
          <div className={styles.content}>
          {children}
          </div>
        </body>
      </html>
      )
  }
