import { useRecoilValue } from 'recoil';
import { createSimpleLayoutGetter } from '~/client/components/layouts/Simple';
import { liffUserState } from '~/client/features/liff/useLiff';
import { NextPageWithLayout } from '~/types/next';

const PageComponent: NextPageWithLayout = () => {
  const { userId, displayName, isLoggedIn } = useRecoilValue(liffUserState);
  return (
    <div>
      <div>liff root</div>
      <p>{userId || 'No Id'}</p>
      <p>{displayName || 'No Name'}</p>
      <p>{isLoggedIn ? 'true' : 'false'}</p>
    </div>
  );
};

PageComponent.getLayout = createSimpleLayoutGetter();

export const LiffRootPage = PageComponent;
