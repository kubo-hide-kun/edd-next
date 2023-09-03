import Document, { Html, Main, NextScript } from 'next/document';

/**
 * @see https://nextjs.org/docs/messages/no-document-import-in-page
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;