import classNames from 'classnames';
import { ChangeEventHandler, FC } from 'react';
import { SearchVector } from '~/client/components/vectors/Search';

export const SearchInput: FC<{
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ className, onChange }) => {
  return (
    <div
      className={classNames(
        'flex h-28 w-full items-center rounded-lg bg-gray-light px-12',
        className
      )}
    >
      <SearchVector className="h-16 w-16" />
      <input
        type="search"
        name="search"
        className="my-8 ml-8 border-l border-surface-base-3 bg-gray-light pl-8 text-xs"
        onChange={onChange}
        placeholder="検索"
      />
    </div>
  );
};
