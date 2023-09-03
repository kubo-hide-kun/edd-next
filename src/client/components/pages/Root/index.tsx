import { NextPageWithLayout } from '~/types/next';

const PageComponent: NextPageWithLayout = () => {
  return <div>Root</div>;
};

PageComponent.getLayout = (page) => page;

export const RootPage = PageComponent;
