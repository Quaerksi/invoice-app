import Document,{ Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'

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
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }
}
