import Popup from '@/components/common/Popup';
import PopupBody from '@/components/common/PopupBody';
import PopupTitle from '@/components/common/PopupTitle';

const Test = () => {
  return (
    <Popup width="500px" height="400px">
      <PopupTitle>경매로 전환하시겠습니까?</PopupTitle>
      <PopupBody isParticipate />
    </Popup>
  );
};

export default Test;
