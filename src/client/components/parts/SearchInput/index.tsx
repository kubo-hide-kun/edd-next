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
        'flex h-28 w-full items-center gap-8 rounded-full border border-gray-light bg-gray-light px-12 focus-within:border-accent-primary',
        className
      )}
    >
      <SearchVector className="h-16 w-16" />
      <div className=" h-3/5 w-1 rounded-full bg-surface-base-3" />
      <input
        type="search"
        name="search"
        className="my-8 w-full bg-gray-light text-xs focus:outline-none"
        onChange={onChange}
        placeholder="検索"
      />
    </div>
  );
};
