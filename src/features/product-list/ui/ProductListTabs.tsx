import classNames from 'classnames';

interface ProductListTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ProductListTabs = ({
  activeTab,
  setActiveTab
}: ProductListTabsProps) => {
  return (
    <div className="flex justify-center w-full mt-3">
      <div
        className={classNames(
          'flex justify-center items-center w-full py-2 cursor-pointer text-sm',
          activeTab === 'ongoing'
            ? 'border-b-2 border-cheeseYellow cursor-pointer font-bold'
            : 'border-b-2 border-gray-300'
        )}
        onClick={() => setActiveTab('ongoing')}
      >
        정식 경매
      </div>
      <div
        className={classNames(
          'flex justify-center w-full items-center py-2 cursor-pointer text-sm',
          activeTab === 'pre-enroll'
            ? 'border-b-2 border-cheeseYellow cursor-pointer font-bold'
            : 'border-b-2 border-gray-300'
        )}
        onClick={() => setActiveTab('pre-enroll')}
      >
        사전 경매
      </div>
    </div>
  );
};
