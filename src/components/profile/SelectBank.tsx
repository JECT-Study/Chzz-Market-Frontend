import { banks } from '@/constants/bank';
import XButton from '@/assets/icons/x_button.svg';
import Button from '../common/Button';
import Modal from './Modal';

interface Props {
  onClose: () => void;
  onSelect: (bank: string) => void;
}

const SelectBank = ({ onClose, onSelect }: Props) => {
  return (
    <Modal isOpen onClose={onClose}>
      <div className="">
        <div className="relative flex justify-center mb-4">
          <h2 className="text-2xl font-bold">은행</h2>
          <button
            className="absolute right-0 p-2"
            onClick={onClose}
            aria-label="닫기"
          >
            <img src={XButton} alt="x_button" className="size-6" />
          </button>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-2">
            {banks.map((item) => (
              <Button
                key={item.id}
                type="button"
                className="flex flex-col items-center justify-center w-24 h-24 transition duration-300 border rounded-lg shadow-sm border-gary-300 hover:bg-gray-100"
                color="gray3"
                onClick={() => {
                  onSelect(item.name);
                  onClose();
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 mb-2"
                />
                <p className="text-sm font-medium text-black">{item.name}</p>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectBank;
