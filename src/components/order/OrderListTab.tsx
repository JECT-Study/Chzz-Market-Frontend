import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface OrderListTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const OrderListTab = ({ activeTab, setActiveTab }: OrderListTabProps) => {
  const tabClass = 'flex-1 text-center cursor-pointer';
  const [isWidthScreen, setIsWidthScreen] = useState(window.innerWidth >= 750);

  useEffect(() => {
    const handleResize = () => {
      setIsWidthScreen(window.innerWidth >= 750);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full flex justify-between items-center">
      <div
        className={classNames(
          tabClass,
          activeTab === 'AuctionHistory'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
          isWidthScreen && 'p-2',
        )}
        onClick={() => setActiveTab('AuctionHistory')}
      >
        {isWidthScreen ? (
          '입찰중인 경매'
        ) : (
          <>
            입찰중인
            <br />
            경매
          </>
        )}
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'AuctionsWon'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
          isWidthScreen && 'p-2',
        )}
        onClick={() => setActiveTab('AuctionsWon')}
      >
        {isWidthScreen ? (
          '성공한 경매'
        ) : (
          <>
            성공한
            <br /> 경매
          </>
        )}
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'AuctionsLost'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
          isWidthScreen && 'p-2',
        )}
        onClick={() => setActiveTab('AuctionsLost')}
      >
        {isWidthScreen ? (
          '실패한 경매'
        ) : (
          <>
            실패한
            <br /> 경매
          </>
        )}
      </div>
    </div>
  );
};

export default OrderListTab;
