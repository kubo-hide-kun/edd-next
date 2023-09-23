import classNames from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

type User = {
  name: string;
  icon: string;
};

type Props = {
  user: User;
  text: string;
  isMe?: boolean;
};

export const Message: FC<Props> = ({ user, text, isMe = false }) => {
  return (
    <div
      className={classNames('flex gap-5', {
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
        <span className="ml-5 py-2 text-xs text-surface-base-2">
          {user.name}
        </span>
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
      </div>
    </div>
  );
};
