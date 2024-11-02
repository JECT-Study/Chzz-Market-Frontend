import { useConvertAuction, useToggleAuctionDetailsHeart } from './queries';

import { Layout } from "@/app/layout/index";
import { Button, Confirm, Modal } from "@/shared";

interface PreAuctionDetailsFooterProps {
  isLiked: boolean
  preAuctionId: number
  isSeller: boolean
}

const PreAuctionDetailsFooter = ({ isLiked, preAuctionId, isSeller }: PreAuctionDetailsFooterProps) => {
  const { mutate: toggleAuctionItemHeart } = useToggleAuctionDetailsHeart();
  const { mutate: convertToAuction, isPending } = useConvertAuction();

  return (
    <Layout.Footer type="single">
      {isSeller
        ?
        <Modal>
          <Modal.Open name='convert'>
            <Button type='button' className="w-full h-full" color="cheeseYellow">
              경매 전환하기
            </Button>
          </Modal.Open>
          <Modal.Window name='convert'>
            <Confirm type='convert'>
              <Button type='button' disabled={isPending} loading={isPending} onClick={() => convertToAuction(preAuctionId)} className="w-full h-full" color="cheeseYellow">
                전환하기
              </Button>
            </Confirm>
          </Modal.Window>
        </Modal>
        :
        <Button
          type="button"
          className="w-full h-full"
          color={isLiked ? 'grayWhite' : "cheeseYellow"}
          onClick={() => toggleAuctionItemHeart(preAuctionId)}
        >
          {isLiked ? "찜 목록에서 제외" : "찜 목록에 추가"}
        </Button>}
    </Layout.Footer>
  );
}

export default PreAuctionDetailsFooter;
