import Script from 'next/script';
import { FC, PropsWithChildren } from 'react';
import { useLiff } from '~/client/features/liff/useLiff';

const LiffScript: FC<{
  liffId: string;
}> = ({ liffId }) => {
  const { initialize } = useLiff({
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
    liffId: string;
  }>
> = ({ children, liffId }) => {
  return (
    <>
      <LiffScript liffId={liffId} />
      {children}
    </>
  );
};
