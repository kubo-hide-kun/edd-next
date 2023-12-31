import { FC } from 'react';
import { Message } from '~/client/components/parts/Timeline/Message';

type User = {
  name: string;
  icon: string;
};

type Post = {
  user: User;
  text: string;
  createdAt: string;
  isMe?: boolean;
};

export const Timeline: FC<{
  posts: Post[];
}> = ({ posts }) => {
  return (
    <div className="h-full w-[var(--history-main-content-width)] overflow-hidden rounded-xl bg-gray-light">
      <div className="service-timeline-scroll-bar h-full w-full overflow-y-auto overflow-x-hidden px-5 py-10">
        <div className="flex w-full flex-col gap-7 px-5 py-10">
          {posts.map((item, index) => {
            return (
              <Message
                key={index}
                user={item.user}
                text={item.text}
                createdAt={item.createdAt}
                isMe={item.isMe}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
