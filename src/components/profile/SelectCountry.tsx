import { countries } from '@/constants/countries';
import Button from '../common/Button';
import Modal from './Modal';

interface Props {
  onClose: () => void;
  setProfileRegion: (region: string) => void;
}

const SelectCountry = ({ onClose, setProfileRegion }: Props) => {
  return (
    <Modal isOpen onClose={onClose}>
      <div className="h-full">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold">지역 선택</h2>
          <button className="text-2xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-10 h-2/5">
          {countries.map((item) => (
            <Button
              key={item.id}
              size="medium"
              className="rounded-lg border-gray3"
              color="white"
              type="button"
              onClick={() => {
                setProfileRegion(item.name);
                onClose();
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SelectCountry;
