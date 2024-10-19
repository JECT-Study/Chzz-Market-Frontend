import HeartOffIcon from '@/assets/icons/heart_off.svg';
import HeartOnIcon from '@/assets/icons/like_heart.svg';
import Button from '../common/Button';
import Layout from '../layout/Layout';
import { useConvertAuction, useLikeAuctionItem } from './queries';

interface PreAuctionDetailsFooterProps {
  likeCount: number
  preAuctionId: number
  isSeller: boolean
}

const PreAuctionDetailsFooter = ({ likeCount, preAuctionId, isSeller }: PreAuctionDetailsFooterProps) => {
  const { mutate: likeAuctionItem } = useLikeAuctionItem();
  const { mutate: convertToAuction, isPending } = useConvertAuction();
  const HeartIcon = likeCount ? HeartOnIcon : HeartOffIcon;

  return (
    <Layout.Footer type="double">
      <div className="flex items-center h-full gap-3 basis-1/3">
        <img src={HeartIcon} className='size-6' alt='하트 아이콘' />
        <span className="pt-[2px] text-gray1 text-heading3">{`${likeCount} 명`}</span>
      </div>
      {isSeller
        ?
        <Button type='button' disabled={isPending} loading={isPending} onClick={() => convertToAuction(preAuctionId)} className="h-full basis-4/5" color="cheeseYellow">
          경매 전환하기
        </Button>
        :
        <Button
          type="button"
          className="h-full basis-4/5"
          color={likeCount ? 'white' : "cheeseYellow"}
          onClick={() => likeAuctionItem(preAuctionId)}
        >
          {likeCount ? "좋아요 취소" : "좋아요"}
        </Button>}
    </Layout.Footer>
  );
}

export default PreAuctionDetailsFooter;
