import classNames from 'classnames';
import { FC } from 'react';

// TODO: ここに DisplayStatus は定義しない。別ファイルに定義する。
export enum DisplayStatus {
  TimeLine,
  Member,
}

export const Tab: FC<{
  className?: string;
  displayStatus: DisplayStatus;
  onChange: (displayStatus: DisplayStatus) => void;
}> = ({ className, displayStatus, onChange }) => {
  const handleClick = () => {
    if (displayStatus === DisplayStatus.TimeLine) {
      onChange(DisplayStatus.Member);
    }
    if (displayStatus === DisplayStatus.Member) {
      onChange(DisplayStatus.TimeLine);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  return (
    <div
      className={classNames(
        'service-tab flex h-40 w-full select-none items-center rounded-xl border-2 border-accent-primary',
        className
      )}
      data-status={displayStatus}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <button
        className={classNames('z-10 w-1/2 transition-all duration-500', {
          'text-white': displayStatus === DisplayStatus.TimeLine,
          'text-surface-base-2': displayStatus === DisplayStatus.Member,
        })}
      >
        タイムライン
      </button>
      <button
        className={classNames('z-10 w-1/2 transition-all duration-500', {
          'text-white': displayStatus === DisplayStatus.Member,
          'text-surface-base-2': displayStatus === DisplayStatus.TimeLine,
        })}
      >
        メンバー
      </button>
    </div>
  );
};
