import { createSimpleLayoutGetter } from '~/client/components/layouts/Simple';
import { NextPageWithLayout } from '~/types/next';

const PageComponent: NextPageWithLayout = () => {
  return <div>Root</div>;
};

PageComponent.getLayout = createSimpleLayoutGetter();

export const RootPage = PageComponent;
