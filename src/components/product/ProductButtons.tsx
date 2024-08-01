import { useState } from 'react';
import Button from '@/components/common/Button';
import classNames from 'classnames';

const ProductButtons = () => {
  const [activeFilter, setActiveFilter] = useState('');

  return (
    <div className="flex h-22px space-x-3 p-4">
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'popular' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => setActiveFilter('popular')}
      >
        인기
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'highPrice' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => setActiveFilter('highPrice')}
      >
        높은 가격순
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'lowPrice' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => setActiveFilter('lowPrice')}
      >
        낮은 가격순
      </Button>
      <Button
        size="xsmall"
        color={classNames(activeFilter === 'latest' ? 'black' : 'white')}
        hoverColor="black"
        type="button"
        className="rounded-full"
        onClick={() => setActiveFilter('latest')}
      >
        최신순
      </Button>
    </div>
  );
};

export default ProductButtons;
