import Script from 'next/script';
import { FC, PropsWithChildren } from 'react';
import { useLiffUserState } from '~/client/feature/liff/useLiff';

const LiffScript: FC<{
  liffId: string;
}> = ({ liffId }) => {
  const { initialize } = useLiffUserState({
    liffId,
  });
  return (
    <Script
      src="https://static.line-scdn.net/liff/edge/2/sdk.js"
      onLoad={initialize}
    />
  );
};

/**
 * @description LIFF SDK を読み込むためのプロバイダー
 */
export const LiffProvider: FC<
  PropsWithChildren<{
    liifId: string;
  }>
> = ({ children, liifId }) => {
  return (
    <>
      <LiffScript liffId={liifId} />
      {children}
    </>
  );
};
