import { useConvertAuction, useLikeAuctionItem } from './queries';

import Button from '../common/Button';
import Layout from '../layout/Layout';

interface PreAuctionDetailsFooterProps {
  isLiked: boolean
  preAuctionId: number
  isSeller: boolean
}

const PreAuctionDetailsFooter = ({ isLiked, preAuctionId, isSeller }: PreAuctionDetailsFooterProps) => {
  const { mutate: likeAuctionItem } = useLikeAuctionItem();
  const { mutate: convertToAuction, isPending } = useConvertAuction();

  return (
    <Layout.Footer type="single">
      {isSeller
        ?
        <Button type='button' disabled={isPending} loading={isPending} onClick={() => convertToAuction(preAuctionId)} className="w-full h-full" color="cheeseYellow">
          경매 전환하기
        </Button>
        :
        <Button
          type="button"
          className="w-full h-full"
          color={isLiked ? 'grayWhite' : "cheeseYellow"}
          onClick={() => likeAuctionItem(preAuctionId)}
        >
          {isLiked ? "좋아요 취소" : "좋아요"}
        </Button>}
    </Layout.Footer>
  );
}

export default PreAuctionDetailsFooter;
