import classNames from 'classnames';
import Image from 'next/image';
import { FC, useMemo } from 'react';

type User = {
  name: string;
  icon: string;
};

export const Member: FC<{
  user: User;
  price: number;
  lastPostedAt: string;
  isMe?: boolean;
}> = ({ user, price, lastPostedAt, isMe = false }) => {
  const priceStatus = useMemo(() => {
    if (price < 0) return 'minus';
    else if (price > 0) return 'plus';
    else return 'zero';
  }, [price]);

  const priceToString = useMemo(() => {
    if (price < 0) return `- ${Math.abs(price).toString()}`;
    else if (price > 0) return `+ ${price.toString()}`;
    else return '± 0';
  }, [price]);

  return (
    <div
      className={classNames(
        'relative flex items-center justify-between gap-5 rounded-xl px-15 py-20',
        {
          'bg-accent-primary-sub': isMe,
          'bg-gray-light': !isMe,
        }
      )}
    >
      <div className="flex items-center gap-10">
        <div className="h-36 w-36 shrink-0 overflow-hidden rounded-full">
          <Image
            src={user.icon}
            width={50}
            height={50}
            alt={`${user.name} icon}`}
            className="h-full w-full"
          />
        </div>
        <span className="text-lg text-surface-base-1">{user.name}</span>
      </div>
      <span
        className={classNames('text-lg', {
          'text-accent-primary': priceStatus === 'minus',
          'text-accent-secondary': priceStatus === 'plus',
          'text-surface-base-1': priceStatus === 'zero',
        })}
      >
        {priceToString}
      </span>
      <span className="absolute bottom-10 right-15 text-xs text-surface-base-3">
        {lastPostedAt}
      </span>
    </div>
  );
};
