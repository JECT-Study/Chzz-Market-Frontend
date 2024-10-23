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
          color={likeCount ? 'disabled' : "cheeseYellow"}
          onClick={() => likeAuctionItem(preAuctionId)}
        >
          {likeCount ? "좋아요 취소" : "좋아요"}
        </Button>}
    </Layout.Footer>
  );
}

export default PreAuctionDetailsFooter;
