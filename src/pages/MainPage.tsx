import React from 'react';
import Popup from '@/components/common/Popup';

const MainPage = () => {
  return (
    <div>
      <Popup title="경매로 전환하시겠습니까?" isParticipate />
    </div>
  );
};

export default MainPage;
