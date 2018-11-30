import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const globalStyle = `
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }

    button {
        background-color: transparent;
        border: none;
    }
`;

//rgba(14, 46, 71, 1)

export default class MyDocument extends Document {
    static async getInitialProps (ctx) {
        const sheet = new ServerStyleSheet()
    
        const originalRenderPage = ctx.renderPage;
        
        ctx.renderPage = () => originalRenderPage({
            enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });
    
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps, styles: [...initialProps.styles, ...sheet.getStyleElement()] }
    }

    render() {
        return (
            <html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <style dangerouslySetInnerHTML={{ __html: globalStyle }} />
                    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}