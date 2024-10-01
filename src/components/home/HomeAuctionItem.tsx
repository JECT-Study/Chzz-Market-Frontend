import type { PreRegisterAuction, RegisterAuction } from 'Auction';

import LikeCount from '../common/atomic/LikeCount';
import MinPrice from '../common/atomic/MinPrice';
import ParticipantCount from '../common/atomic/ParticipantCount';
import TimeLabel from '../common/atomic/TimeLabel';
import { truncateText } from '@/utils/truncateText';
import { useNavigate } from 'react-router-dom';

type HomeAuctionItemProps<T> = T extends 'pre-register'
  ? { kind: 'pre-register'; auction: PreRegisterAuction }
  : { kind: 'register'; auction: RegisterAuction };

const HomeAuctionItem = <T extends 'pre-register' | 'register'>({ kind, auction }: HomeAuctionItemProps<T>) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(kind === 'register' ? `/auctions/auction/${auction.id}` : `/auctions/pre-auction/${auction.id}`);
  const name = truncateText(auction.name);

  return (
    <figure className='flex flex-col min-w-[11rem] gap-2 border rounded text-body2 cursor-pointer' aria-label={kind} onClick={handleClick}>
      <div className='relative'>
        <img src={auction.cdnPath} alt={`${kind}_이미지`} className='object-cover w-full h-[10rem] rounded-t' />
        {kind === 'register' && <TimeLabel time={auction.timeRemaining} />}
      </div>
      <figcaption className='flex flex-col gap-2 p-2'>
        <div aria-label={`${kind}_이름`} className='text-gray1'>
          {name}
        </div>
        <div>
          <MinPrice price={auction.minPrice} />
          {kind === 'register' ? <ParticipantCount count={auction.participantCount} /> : <LikeCount count={auction.likeCount} />}
        </div>
      </figcaption>
    </figure>
  );
};

export default HomeAuctionItem;
