import { FC } from 'react';
import { CommonHead } from '~/client/components/parts/CommonHead';
import { LayoutGetter } from '~/types/next';
import { InferComponentPropsType } from '~/types/react';

export const SimpleLayout: FC<{
  children: React.ReactNode;
  pageTitle?: string;
}> = ({ pageTitle, children }) => {
  return (
    <>
      <CommonHead pageTitle={pageTitle} />
      <main className="relative flex w-screen flex-col items-center bg-white-salmon">
        <div
          className="relative w-full max-w-390"
          style={{
            boxShadow: '0px 1px 44px 0px #0000001A',
          }}
        >
          <div className="relative min-h-screen w-full overflow-hidden bg-white">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export const createSimpleLayoutGetter = (
  options?: Omit<InferComponentPropsType<typeof SimpleLayout>, 'children'>
): LayoutGetter => {
  const pageWithLayout = (page) => {
    return <SimpleLayout {...options}>{page}</SimpleLayout>;
  };
  return pageWithLayout;
};
