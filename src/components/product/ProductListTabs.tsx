import classNames from 'classnames';

interface ProductListTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductListTabs = ({ activeTab, setActiveTab }: ProductListTabsProps) => {
  return (
    <div className="flex justify-center w-full mt-3">
      <div
        className={classNames(
          'flex justify-center items-center w-full py-2 ml-4 cursor-pointer text-sm',
          activeTab === 'ongoing'
            ? 'border-b-2 border-black'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('ongoing')}
      >
        진행 중인 경매
      </div>
      <div
        className={classNames(
          'flex justify-center w-full items-center py-2 mr-4 cursor-pointer text-sm',
          activeTab === 'upcoming'
            ? 'border-b-2 border-black'
            : 'border-b-2 border-gray-300',
        )}
        onClick={() => setActiveTab('upcoming')}
      >
        사전 등록 경매
      </div>
    </div>
  );
};

export default ProductListTabs;
