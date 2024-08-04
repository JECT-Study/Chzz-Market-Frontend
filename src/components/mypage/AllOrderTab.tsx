import classNames from 'classnames';

interface AllOrderTabProps {
  activeTab: boolean;
  setActiveTab: (activeTab: boolean) => void;
}

const AllOrderTab = ({ activeTab, setActiveTab }: AllOrderTabProps) => {
  return (
    <div className="flex justify-center w-full mt-3">
      <div
        className={classNames(
          'flex justify-center items-center w-full py-2 ml-4 cursor-pointer text-sm',
          activeTab === true
            ? 'border-b-2 border-cheeseYellow'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab(!activeTab)}
      >
        진행 중인 경매
      </div>
      <div
        className={classNames(
          'flex justify-center w-full items-center py-2 mr-4 cursor-pointer text-sm',
          activeTab === false
            ? 'border-b-2 border-cheeseYellow'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab(!activeTab)}
      >
        사전 등록 경매
      </div>
    </div>
  );
};

export default AllOrderTab;
