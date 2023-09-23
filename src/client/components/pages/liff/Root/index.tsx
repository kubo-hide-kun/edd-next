import { useRecoilValue } from 'recoil';
import { createSimpleLayoutGetter } from '~/client/components/layouts/Simple';
import { liffUserState } from '~/client/features/liff/useLiff';
import { NextPageWithLayout } from '~/types/next';

const PageComponent: NextPageWithLayout = () => {
  const LineUser = useRecoilValue(liffUserState);
  return (
    <div>
      <div>liff root</div>
      <p>{LineUser?.userId || 'noId'}</p>
      <p>{LineUser?.displayName || 'noName'}</p>
    </div>
  );
};

PageComponent.getLayout = createSimpleLayoutGetter();

export const LiffRootPage = PageComponent;
