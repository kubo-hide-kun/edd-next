import Head from 'next/head';
import { FC } from 'react';
import { Service } from '~/schemas/entities/Service';

export const CommonHead: FC<{
  pageTitle: string;
}> = ({ pageTitle = `${Service.APP.name} | ${Service.APP.nameSuffix}` }) => {
  return (
    <Head>
      {/* 一般 */}
      <title>{pageTitle}</title>
      <meta name="application-name" content={Service.APP.name} />
      <meta name="description" content={Service.APP.description} />
      <meta name="theme-color" content={Service.APP.themeColor} />
      <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="robot" content="noindex" />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={Service.APP.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={Service.APP.url} />
      <meta property="og:image" content={Service.APP.ogpImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={Service.APP.description} />
      <meta name="twitter:image" content={Service.APP.ogpImageUrl} />
    </Head>
  );
};
