import classNames from 'classnames';

interface UserOrderTabProps {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

export const UserPreOrderTab = ({ activeTab, setActiveTab }: UserOrderTabProps) => {
  return (
    <div className='flex justify-center w-full'>
      <div
        className={classNames(
          'flex justify-center w-full items-center py-2 cursor-pointer font-bold',
          activeTab === 'preAuction'
            ? 'border-b-2 border-cheeseYellow'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('preAuction')}
      >
        사전 경매
      </div>
    </div>
  );
};
