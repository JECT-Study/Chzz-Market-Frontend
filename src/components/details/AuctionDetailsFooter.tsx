
import Button from "@/components/common/Button";
import { useCancelBid } from "@/components/details/queries";
import { MAX_BID_COUNT } from "@/constants/bid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../common/ConfirmModal";
import Layout from "../layout/Layout";

interface AuctionDetailsFooterProps {
  bidId: number | null;
  auctionId: number
  isCancelled: boolean
  status: string
  remainingBidCount: number
  isSeller: boolean
}

const AuctionDetailsFooter = ({ isSeller, bidId, auctionId, isCancelled, status, remainingBidCount }: AuctionDetailsFooterProps) => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false)
  const toggleConfirm = () => setConfirm((prev) => !prev)
  const { mutate: cancelBid } = useCancelBid()
  const remainFlag = remainingBidCount === MAX_BID_COUNT
  const clickBid = () => navigate(`/auctions/bid/${auctionId}`)
  const clickCancel = () => cancelBid(bidId || 0)

  if (status !== 'PROCEEDING') {
    return (
      <Layout.Footer type="single">
        <Button type='button' disabled className='w-full h-full'>
          종료된 경매
        </Button>
      </Layout.Footer>
    );
  }

  if (isCancelled) {
    return (
      <Layout.Footer type="single">
        <Button type='button' disabled className='w-full h-full'>
          참여 취소 한 경매
        </Button>
      </Layout.Footer>
    );
  }

  if (isSeller) {
    return (
      <Layout.Footer type="single">
        <Button type='button' disabled className='w-full h-full'>
          내가 등록한 경매
        </Button>
      </Layout.Footer>
    );
  }

  return (
    <>
      <Layout.Footer type={remainFlag ? 'single' : 'double'}>
        {remainFlag
          ?
          <Button
            type="button"
            className="w-full h-full"
            color="cheeseYellow"
            onClick={clickBid}
          >
            경매 참여하기
          </Button>
          :
          <>
            <Button
              type="button"
              color="white"
              className="flex-1 h-full transition-colors rounded text-button active:bg-black"
              onClick={toggleConfirm}
            >
              참여 취소
            </Button>
            <Button
              type="button"
              className="flex-[2] h-full"
              color="cheeseYellow"
              onClick={clickBid}
            >
              금액 수정 {remainingBidCount > 0 ? `${remainingBidCount}회 가능` : '(소진)'}
            </Button>
          </>
        }
      </Layout.Footer>
      {
        confirm &&
        <ConfirmModal title='입찰을 취소하시겠어요?' description='입찰을 취소하면 다시 입찰하지 못합니다.' close={toggleConfirm} >
          <Button type='button' color='cheeseYellow' className='w-full' onClick={clickCancel}>
            참여 취소
          </Button>
        </ConfirmModal>
      }
    </>
  );
}

export default AuctionDetailsFooter;
