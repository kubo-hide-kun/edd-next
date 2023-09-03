import Document, { Html, Head, Main, NextScript } from 'next/document';

/**
 * @see https://nextjs.org/docs/messages/no-document-import-in-page
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
