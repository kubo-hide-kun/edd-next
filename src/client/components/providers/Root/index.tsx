import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import { LiffProvider } from '~/client/components/providers/Liff';
import { NextPageWithLayout } from '~/types/next';

/**
 * ページ間で共通のレイアウトを適用するための実装
 * @see https://nextjs.org/docs/basic-features/layouts#with-typescript
 */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const withLiffProvider = (Component: ReactNode, liffId: string | undefined) => {
  return <LiffProvider liffId={liffId}>{Component}</LiffProvider>;
};

const WithConditionalProviders: FC = ({ children }) => {
  const router = useRouter();
  const path = router.asPath;
  let component = children;

  if (path.includes('liff')) {
    component = withLiffProvider(component, process.env.NEXT_PUBLIC_LIFF_ID);
  }

  return <>{component}</>;
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
        <WithConditionalProviders>
          <Component {...pageProps} />
        </WithConditionalProviders>
      </SWRConfig>
    </RecoilRoot>
  );

  return component;
};
