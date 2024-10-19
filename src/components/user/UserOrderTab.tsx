import classNames from 'classnames';

interface UserOrderTabProps {
  activeTab: boolean;
  setActiveTab: (activeTab: boolean) => void;
}

const UserOrderTab = ({ activeTab, setActiveTab }: UserOrderTabProps) => {
  return (
    <div className="flex justify-center w-full mt-3">
      <div
        className={classNames(
          'flex justify-center items-center w-full py-2 cursor-pointer font-bold',
          activeTab === true
            ? 'border-b-2 border-cheeseYellow'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab(!activeTab)}
      >
        정식 경매
      </div>
      <div
        className={classNames(
          'flex justify-center w-full items-center py-2 cursor-pointer font-bold',
          activeTab === false
            ? 'border-b-2 border-cheeseYellow'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab(!activeTab)}
      >
        사전 경매
      </div>
    </div>
  );
};

export default UserOrderTab;
