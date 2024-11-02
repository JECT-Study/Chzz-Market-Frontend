import classNames from 'classnames';

interface UserOrderTabProps {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const UserOrderTab = ({ activeTab, setActiveTab }: UserOrderTabProps) => {
  return (
    <div className='flex justify-center w-full'>
      <div
        className={classNames(
          'flex justify-center items-center w-full py-2 text-body2 web:text-heading3 cursor-pointer',
          activeTab === 'ongoing'
            ? 'border-b-2 border-cheeseYellow'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('ongoing')}
      >
        진행중인 경매
      </div>
      <div
        className={classNames(
          'flex justify-center items-center w-full py-2 text-body2 web:text-heading3 cursor-pointer',
          activeTab === 'end'
            ? 'border-b-2 border-cheeseYellow'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('end')}
      >
        종료된 경매
      </div>
    </div>
  );
};

export default UserOrderTab;
