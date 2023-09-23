import classNames from 'classnames';
import { FC, useState } from 'react';
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

  const handleItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;
    if (!id) {
      return;
    }
    setSelectedId(id);
    onChange?.(id);
    setIsOpen(false);
  };

  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <div className={classNames('relative inline-block text-left', className)}>
      <div className="relative w-88">
        <button
          className="hover:bg-gray-50 inline-flex w-full items-center justify-center space-x-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-surface-base-2"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedItem?.label}</span>
          <SortVector />
        </button>
        <div
          className={classNames(
            'absolute left-0 top-0 z-10 w-88 overflow-hidden rounded-md bg-white drop-shadow-lg transition-all duration-300',
            [isOpen ? 'visible' : 'invisible']
          )}
          role="none"
        >
          {items.map((item) => (
            <button
              key={item.id}
              className="block max-h-24 w-full text-center text-sm text-surface-base-2 transition-all duration-300"
              data-id={item.id}
              style={{ height: isOpen ? '36px' : '0' }}
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
