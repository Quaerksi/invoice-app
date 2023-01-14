import Document,{ Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'

// _document.tsx and _app.tsx get replaced in Next.js 13 through layout.js

// creates overall page structure
export  default class customDocument extends Document  {

    // static async getInitialProps(
    //     ctx: DocumentContext
    //   ): Promise<DocumentInitialProps> {
    //     const initialProps = await Document.getInitialProps(ctx)
    
    //     return initialProps
    //   }

      render() {
        return (
          <Html>
            <Head>
              <meta property="custom" content="I am in every page even 404" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
              <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600&display=swap" rel="stylesheet" />
            </Head>
            <body style={{fontFamily: `'League Spartan', sans-serif`}} >
            {/* <body style={{fontFamily: `'League Spartan', sans-serif;`}} className="theme-switch"> */}
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }
}
