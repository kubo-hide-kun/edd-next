import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { createSimpleLayoutGetter } from '~/client/components/layouts/Simple';
import { Dropdown } from '~/client/components/parts/Dropdown';
import { MemberList } from '~/client/components/parts/MemberList';
import { SearchInput } from '~/client/components/parts/SearchInput';
import { Tab, DisplayStatus } from '~/client/components/parts/Tab';
import { Timeline } from '~/client/components/parts/Timeline';
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

  const posts = [
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円 ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 \n -132円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円 ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 \n -132円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円 ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 \n -132円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円 ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 \n -132円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
      createdAt: '2023/04/32 12:32:43',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      createdAt: '2023/04/32 12:32:43',
      isMe: true,
    },
  ];

  const users = [
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      price: 3000,
      lastPostedAt: '2023/05/23',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      price: -3000,
      lastPostedAt: '2023/05/23',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      price: 0,
      lastPostedAt: '2023/05/23',
    },
    {
      user: {
        name: '中嶋柊',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      price: 3000,
      lastPostedAt: '2023/05/23',
    },
  ];

  return (
    <div className="flex h-full flex-col gap-16 px-16 py-14">
      <div className="flex h-134 w-full shrink-0 flex-col items-center justify-center rounded-2xl bg-accent-primary text-white">
        <h1 className="mb-16 text-2xl">EDDハッカソン</h1>
        <p className="text-xs">貸し借り収支</p>
        <p className="text-2xl">+12,300円</p>
      </div>
      <Tab
        displayStatus={displayStatus}
        onChange={handleTabChange}
        className="shrink-0"
      />
      <div className="flex items-center justify-between space-x-20 px-10">
        <SearchInput className="w-224" />
        <Dropdown items={ORDER_ITEMS} onChange={handleOrderChange} />
      </div>
      <div className="relative h-full w-full overflow-hidden">
        <div
          className={classNames(
            'absolute left-0 top-0 flex h-full w-[calc(var(--history-main-content-width)*2)] transition-transform duration-200 [--history-main-content-width:calc(100vw-32px)]',
            {
              'translate-x-0': displayStatus === DisplayStatus.TimeLine,
              '-translate-x-[var(--history-main-content-width)]':
                displayStatus === DisplayStatus.Member,
            }
          )}
        >
          <Timeline posts={posts} />
          <MemberList users={users} />
        </div>
      </div>
    </div>
  );
};

PageComponent.getLayout = createSimpleLayoutGetter();

export const WebRootPage = PageComponent;
