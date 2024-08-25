import { banks } from '@/constants/bank';
import Button from '../common/Button';
import XButton from '../common/XButton';
import Modal from './Modal';

interface Props {
  onClose: () => void;
  setBank: (bank: string) => void;
}

const SelectBank = ({ onClose, setBank }: Props) => {
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
            <XButton />
          </button>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-2">
            {banks.map((item) => (
              <Button
                key={item.id}
                type="button"
                className="flex flex-col items-center justify-center w-24 h-24 border border-gary-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
                color="gray3"
                onClick={() => {
                  setBank(item.name);
                  onClose();
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-10 h-10 mb-2"
                />
                <p className="text-black text-sm font-medium">{item.name}</p>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectBank;
