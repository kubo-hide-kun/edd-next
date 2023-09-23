import classNames from 'classnames';
import { FC, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { SortVector } from '~/client/components/vectors/Sort';

export const Dropdown: FC<{
  className?: string;
  items: {
    id: string;
    label: string;
  }[];
  onChange?: (id: string) => void;
}> = ({ className, items, onChange }) => {
  const [selectedId, setSelectedId] = useState(items[0].id);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.stopPropagation();
      setIsOpen((prev) => !prev);
    },
    [setIsOpen]
  );

  const handleItemClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      const { id } = event.currentTarget.dataset;
      if (!id) {
        return;
      }
      setSelectedId(id);
      onChange?.(id);
      setIsOpen(false);
    },
    [setSelectedId, onChange, setIsOpen]
  );

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId),
    [items, selectedId]
  );

  return (
    <div className={classNames('relative inline-block text-left', className)}>
      <div className="relative w-88">
        <button
          className="hover:bg-gray-50 inline-flex w-full items-center justify-end space-x-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-surface-base-2"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={handleButtonClick}
        >
          <span>{selectedItem?.label}</span>
          <SortVector />
        </button>
        <div
          className={classNames(
            'absolute left-0 top-0 z-10 w-88 overflow-hidden rounded-md bg-white drop-shadow-lg transition-all duration-300',
            {
              visible: isOpen,
              invisible: !isOpen,
            }
          )}
          role="none"
        >
          {items.map((item) => (
            <button
              key={item.id}
              className={classNames(
                'block w-full text-center text-sm text-surface-base-2 transition-all duration-300',
                {
                  'h-36': isOpen,
                  'h-0': !isOpen,
                  'bg-accent-primary-sub': item.id === selectedId,
                }
              )}
              data-id={item.id}
              role="menuitem"
              onClick={handleItemClick}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
