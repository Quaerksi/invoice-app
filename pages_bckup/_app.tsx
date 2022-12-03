import '../styles/globals.css'
import '../styles/design-tokens.css'
import type { AppProps } from 'next/app'
import { League_Spartan, Roboto_Flex} from '@next/font/google'
// Fallback fonts neccesary here?


// If loading a variable font, you don't need to specify the font weight
// {axes:['wdth', 'slnt', 'opsz']}} 
// const league_Spartan = Roboto_Flex({ subsets: ['latin'], add)
const league_Spartan = League_Spartan({ subsets: ['latin']})
// League Spartan: Medium 500, Bold 700

export default function App({ Component, pageProps }: AppProps) {

  //Code is executed only on server
  return (
      <>
            <style jsx global>{`
              html {
                font-family: ${league_Spartan.style.fontFamily};
              }
            `}</style>
            <Component {...pageProps} />
      </>
    )
}