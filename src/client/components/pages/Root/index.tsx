import { useCallback, useState } from 'react';
import { createSimpleLayoutGetter } from '~/client/components/layouts/Simple';
import { Dropdown } from '~/client/components/parts/Dropdown';
import { SearchInput } from '~/client/components/parts/SearchInput';
import { Tab, DisplayStatus } from '~/client/components/parts/Tab';
import { NextPageWithLayout } from '~/types/next';
import { InferComponentPropsType } from '~/types/react';

const ORDER_ITEMS: InferComponentPropsType<typeof Dropdown>['items'] = [
  {
    id: 'newest',
    label: '新しい順',
  },
  {
    id: 'oldest',
    label: '古い順',
  },
  {
    id: 'hightest',
    label: '高額順',
  },
  {
    id: 'lowest',
    label: '低額順',
  },
];

const PageComponent: NextPageWithLayout = () => {
  const [displayStatus, setDisplayStatus] = useState<DisplayStatus>(
    DisplayStatus.TimeLine
  );
  const handleTabChange: InferComponentPropsType<typeof Tab>['onChange'] = (
    displayStatus
  ) => {
    setDisplayStatus(displayStatus);
  };

  const [selectedOrderId, setSelectedOrderId] = useState(ORDER_ITEMS[0].id);
  const handleOrderChange: InferComponentPropsType<
    typeof Dropdown
  >['onChange'] = useCallback(
    (id) => {
      setSelectedOrderId(id);
    },
    [setSelectedOrderId]
  );

  // eslint-disable-next-line no-console
  console.log(selectedOrderId);

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
      <div className="flex items-center justify-between space-x-20">
        <SearchInput className="w-224" />
        <Dropdown items={ORDER_ITEMS} onChange={handleOrderChange} />
      </div>
    </div>
  );
};

PageComponent.getLayout = createSimpleLayoutGetter();

export const RootPage = PageComponent;
