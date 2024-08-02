import classNames from 'classnames';

interface OrderListTabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const OrderListTab = ({ activeTab, setActiveTab }: OrderListTabProps) => {
  const tabClass = 'flex-1 text-center py-2 cursor-pointer';

  return (
    <div className="w-full flex justify-between items-center">
      <div
        className={classNames(
          tabClass,
          activeTab === 'joinedAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('joinedAuctions')}
      >
        참여한
        <br /> 경매
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'successfulAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('successfulAuctions')}
      >
        경매 참여
        <br /> 성공
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'failedAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('failedAuctions')}
      >
        경매 참여
        <br /> 실패
      </div>
      <div
        className={classNames(
          tabClass,
          activeTab === 'closedAuctions'
            ? 'border-b-2 border-cheeseYellow font-bold'
            : 'text-gray2 border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('closedAuctions')}
      >
        종료된
        <br /> 경매
      </div>
    </div>
  );
};

export default OrderListTab;
