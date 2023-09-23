import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

type User = {
  name: string;
  icon: string;
};

export const Message: FC<{
  user: User;
  text: string;
  createdAt: string;
  isMe?: boolean;
}> = ({ user, text, createdAt, isMe = false }) => {
  return (
    <div
      className={classNames('relative flex gap-5', {
        'flex-row-reverse': isMe,
        'items-start': !isMe,
      })}
    >
      <div className="h-32 w-32 shrink-0 overflow-hidden rounded-full">
        <Image
          src={user.icon}
          width={50}
          height={50}
          alt={`${user.name} icon}`}
          className="h-full w-full"
        />
      </div>
      <div
        className={classNames('flex w-full flex-col gap-3', {
          'items-end': isMe,
          'items-start': !isMe,
        })}
      >
        <span className="ml-5 select-none py-2 text-xs text-surface-base-2">
          {user.name}
        </span>
        <div
          className={classNames('flex items-end gap-5', {
            'flex-row-reverse': isMe,
          })}
        >
          <div
            className={classNames(
              'relative w-fit max-w-[80%] whitespace-pre-wrap rounded-[14px] bg-white px-13 py-4 text-sm text-surface-base-1',
              {
                'service-timeline-chat-right': isMe,
                'service-timeline-chat-left': !isMe,
              }
            )}
          >
            {text}
          </div>
          <span
            className={classNames('h-fit text-xs text-surface-base-3', {
              'text-end': isMe,
            })}
          >
            {createdAt}
          </span>
        </div>
      </div>
    </div>
  );
};
