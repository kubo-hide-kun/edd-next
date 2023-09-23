import { FC } from 'react';
import { Member } from '~/client/components/parts/MemberList/Member';

type User = {
  name: string;
  icon: string;
};

type Users = {
  user: User;
  price: number;
  lastPostedAt: string;
  isMe?: boolean;
};

export const MemberList: FC<{ users: Users[] }> = ({ users }) => {
  return (
    <div className="h-full w-[var(--history-main-content-width)] overflow-hidden rounded-xl">
      <div className="service-timeline-scroll-bar h-full w-full overflow-y-auto overflow-x-hidden px-5 py-10">
        <div className="flex w-full flex-col gap-5">
          {users.map((item, index) => {
            return <Member key={index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};
