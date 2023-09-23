import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { SWRConfig } from 'swr';
import { LiffProvider } from '../Liff';
import { liffUserState } from '~/client/features/liff/useLiff';
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
  const { isLoggedIn } = useRecoilValue(liffUserState);
  const router = useRouter();
  const path = router.asPath;

  useEffect(() => {
    const VALIDATE_IGNORE: string[] = ['404', '500', 'web'];
    const isValidatePage = (): boolean => {
      return !VALIDATE_IGNORE.some((validatePath) =>
        path.includes(validatePath)
      );
    };

    if (!isLoggedIn && !isValidatePage()) {
      router.push('/web');
    }
  }, [path, isLoggedIn, router]);

  const component = getLayout(
    <RecoilRoot>
      <Toaster position="top-center" />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        }}
      >
        <LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID}>
          <Component {...pageProps} />
        </LiffProvider>
      </SWRConfig>
    </RecoilRoot>
  );

  return component;
};
