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
          activeTab === 'joinedAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
          isWidthScreen && 'p-2',
        )}
        onClick={() => setActiveTab('joinedAuctions')}
      >
        {isWidthScreen ? (
          '참여한 경매'
        ) : (
          <>
            참여한
            <br />
            경매
          </>
        )}
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'successfulAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
          isWidthScreen && 'p-2',
        )}
        onClick={() => setActiveTab('successfulAuctions')}
      >
        {isWidthScreen ? (
          '경매 참여 성공'
        ) : (
          <>
            경매 참여
            <br /> 성공
          </>
        )}
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'failedAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
          isWidthScreen && 'p-2',
        )}
        onClick={() => setActiveTab('failedAuctions')}
      >
        {isWidthScreen ? (
          '경매 참여 실패'
        ) : (
          <>
            경매 참여
            <br /> 실패
          </>
        )}
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'closedAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
          isWidthScreen && 'p-2',
        )}
        onClick={() => setActiveTab('closedAuctions')}
      >
        {isWidthScreen ? (
          '종료된 경매'
        ) : (
          <>
            종료된
            <br />
            경매
          </>
        )}
      </div>
    </div>
  );
};

export default OrderListTab;
