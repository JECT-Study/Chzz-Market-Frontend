import { useState } from 'react';
import Button from '@/components/common/Button';
import classNames from 'classnames';

interface ProductButtonsProps {
  setSortType: (sortType: string) => void;
}

const ProductButtons = ({ setSortType }: ProductButtonsProps) => {
  const [activeFilter, setActiveFilter] = useState('');

  return (
    <div className="flex h-22px space-x-3 p-4">
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'popularity' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('popularity');
          setActiveFilter('popularity');
        }}
      >
        인기
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'expensive' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('expensive');
          setActiveFilter('expensive');
        }}
      >
        높은 가격순
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'cheap' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('cheap');
          setActiveFilter('cheap');
        }}
      >
        낮은 가격순
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'newest' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('newest');
          setActiveFilter('newest');
        }}
      >
        최신순
      </Button>
    </div>
  );
};

export default ProductButtons;
