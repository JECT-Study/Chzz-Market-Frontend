import Button from '../common/Button';
import Modal from './Modal';

const countries = [
  { id: 1, name: '전체' },
  { id: 2, name: '서울' },
  { id: 3, name: '인천' },
  { id: 4, name: '경기' },
  { id: 5, name: '부산' },
  { id: 6, name: '대구' },
  { id: 7, name: '광주' },
  { id: 8, name: '대전' },
  { id: 9, name: '울산' },
  { id: 10, name: '강원' },
  { id: 11, name: '충청' },
  { id: 12, name: '세종' },
  { id: 13, name: '경남' },
  { id: 14, name: '경북' },
  { id: 15, name: '제주' },
];

interface Props {
  onClose: () => void;
}

const SelectCountry = ({ onClose }: Props) => {
  return (
    <Modal isOpen onClose={onClose}>
      <div className="grid grid-cols-3 gap-2">
        {countries.map((item) => (
          <Button
            key={item.id}
            size="medium"
            className="rounded-lg"
            color="white"
          >
            {item.name}
          </Button>
        ))}
      </div>
      <Button size="medium" className="rounded-lg" color="black">
        지역 선택 완료
      </Button>
    </Modal>
  );
};

export default SelectCountry;
