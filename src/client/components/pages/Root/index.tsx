import { useState } from 'react';
import { createSimpleLayoutGetter } from '~/client/components/layouts/Simple';
import { SearchInput } from '~/client/components/parts/SearchInput';
import { Tab, DisplayStatus } from '~/client/components/parts/Tab';
import { Timeline } from '~/client/components/parts/Timeline';
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

  const posts = [
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円 ガソリン代 +12432円',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 \n -132円',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      isMe: true,
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 -132円',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      isMe: true,
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 -132円',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 -132円',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      isMe: true,
    },
    {
      user: {
        name: 'くりち',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '水 -132円',
    },
    {
      user: {
        name: 'クボ太郎',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: '高速代 +122円',
    },
    {
      user: {
        name: 'simo',
        icon: 'https://avatars.githubusercontent.com/u/65708479?v=4',
      },
      text: 'ガソリン代 +12432円',
      isMe: true,
    },
  ];

  return (
    <div className="flex h-full flex-col gap-16 px-24 py-28">
      <div className="flex h-134 w-full shrink-0 flex-col items-center justify-center rounded-lg bg-accent-primary text-white">
        <h1 className="mb-16 text-2xl">EDDハッカソン</h1>
        <p className="text-xs">貸し借り収支</p>
        <p className="text-2xl">+12,300円</p>
      </div>
      <Tab
        displayStatus={displayStatus}
        onChange={handleTabChange}
        className="shrink-0"
      />
      <div className="flex shrink-0 items-center justify-between">
        <SearchInput className="w-224" />
      </div>
      <Timeline posts={posts} />
    </div>
  );
};

PageComponent.getLayout = createSimpleLayoutGetter();

export const RootPage = PageComponent;
