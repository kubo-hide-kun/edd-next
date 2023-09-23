import { useState } from 'react';
import { createSimpleLayoutGetter } from '~/client/components/layouts/Simple';
import { SearchInput } from '~/client/components/parts/SearchInput';
import { Tab, DisplayStatus } from '~/client/components/parts/Tab';
import { NextPageWithLayout } from '~/types/next';
import { InferComponentPropsType } from '~/types/react';

const PageComponent: NextPageWithLayout = () => {
  const [displayStatus, setDisplayStatus] = useState<DisplayStatus>(
    DisplayStatus.TimeLine
  );
  const handleTabChange: InferComponentPropsType<typeof Tab>['onChange'] = (
    displayStatus
  ) => {
    setDisplayStatus(displayStatus);
  };

  return (
    <div className="px-24 py-28">
      <div className="mb-16 flex h-134 w-full flex-col items-center justify-center rounded-lg bg-accent-primary text-white">
        <h1 className="mb-16 text-2xl">EDDハッカソン</h1>
        <p className="text-xs">貸し借り収支</p>
        <p className="text-2xl">+12,300円</p>
      </div>
      <Tab
        className="mb-16"
        displayStatus={displayStatus}
        onChange={handleTabChange}
      />
      <div className="flex items-center justify-between">
        <SearchInput className="w-224" />
      </div>
    </div>
  );
};

PageComponent.getLayout = createSimpleLayoutGetter();

export const RootPage = PageComponent;
