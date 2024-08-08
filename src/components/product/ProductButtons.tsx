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
        color={classNames(
          activeFilter === 'participantCount' ? 'black' : 'white',
        )}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('participantCount');
          setActiveFilter('participantCount');
        }}
      >
        인기
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'highPrice' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('highPrice');
          setActiveFilter('highPrice');
        }}
      >
        높은 가격순
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'lowPrice' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('lowPrice');
          setActiveFilter('lowPrice');
        }}
      >
        낮은 가격순
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'latest' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => {
          setSortType('latest');
          setActiveFilter('latest');
        }}
      >
        최신순
      </Button>
    </div>
  );
};

export default ProductButtons;
