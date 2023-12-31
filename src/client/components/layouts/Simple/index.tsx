import { FC, PropsWithChildren } from 'react';
import { CommonHead } from '~/client/components/parts/CommonHead';
import { LayoutGetter } from '~/types/next';
import { InferComponentPropsType } from '~/types/react';

const SimpleLayout: FC<
  PropsWithChildren<InferComponentPropsType<typeof CommonHead>>
> = ({ pageTitle, children }) => {
  return (
    <>
      <CommonHead pageTitle={pageTitle} />
      <main className="relative flex w-screen flex-col items-center bg-accent-primary-sub">
        <div
          className="relative w-full max-w-390"
          style={{
            boxShadow: '0px 1px 44px 0px #0000001A',
          }}
        >
          <div className="relative h-screen min-h-screen w-full overflow-hidden bg-white">
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
  const pageWithLayout: LayoutGetter = (page) => {
    return <SimpleLayout {...options}>{page}</SimpleLayout>;
  };
  return pageWithLayout;
};
