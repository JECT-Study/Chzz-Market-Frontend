import Button from '../common/Button';
import XButton from '../common/XButton';
import Modal from './Modal';

const banks = [
  { id: 1, name: 'NH농협', img: '/bank_NH.svg' },
  { id: 2, name: 'KB국민', img: '/bank_KB.svg' },
  { id: 3, name: '카카오뱅크', img: '/bank_kakao.svg' },
  { id: 4, name: '신한', img: '/bank_shinhan.svg' },
  { id: 5, name: '우리', img: '/bank_uri.svg' },
  { id: 6, name: 'IBK기업', img: '/bank_IBK.svg' },
  { id: 7, name: '하나', img: '/bank_hana.svg' },
  { id: 8, name: '새마을', img: '/bank_saemaul.svg' },
  { id: 9, name: '시티', img: '/bank_CITY.svg' },
  { id: 10, name: 'K뱅크', img: '/bank_Kbank.svg' },
];

interface Props {
  onClose: () => void;
}

const SelectBank = ({ onClose }: Props) => {
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
