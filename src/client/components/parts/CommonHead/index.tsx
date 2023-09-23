import Head from 'next/head';
import { FC } from 'react';
import { application } from '~/constants/application';

export const CommonHead: FC<{
  pageTitle?: string;
  isNoIndex?: boolean;
}> = ({
  pageTitle = `${application.name} | ${application.nameSuffix}`,
  isNoIndex = false,
}) => {
  return (
    <Head>
      {/* 一般 */}
      <title>{pageTitle}</title>
      <meta name="application-name" content={application.name} />
      <meta name="description" content={application.description} />
      <meta name="theme-color" content={application.themeColor} />
      <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" href="/favicon.ico" />
      {isNoIndex && <meta name="robots" content="noindex" />}

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={application.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={application.url} />
      <meta property="og:image" content={application.ogpImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={application.description} />
      <meta name="twitter:image" content={application.ogpImageUrl} />
    </Head>
  );
};
