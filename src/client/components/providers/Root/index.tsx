import { AppProps } from 'next/app';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import { LiffProvider } from '../Liff';
import { NextPageWithLayout } from '~/types/next';

/**
 * ページ間で共通のレイアウトを適用するための実装
 * @see https://nextjs.org/docs/basic-features/layouts#with-typescript
 */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * @description _app.tsx で適用されるプロバイダー
 */
export const RootProvider: FC<AppPropsWithLayout> = ({
  Component,
  pageProps,
}) => {
  const getLayout = Component.getLayout || ((page) => page);

  const component = getLayout(
    <RecoilRoot>
      <Toaster position="top-center" />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <Component {...pageProps} />
        <LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID}></LiffProvider>
      </SWRConfig>
    </RecoilRoot>
  );

  return component;
};
