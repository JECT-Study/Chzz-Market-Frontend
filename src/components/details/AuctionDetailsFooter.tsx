import { useCancelBid, useGetAuctionDetails } from "@/components/details/queries";

import Button from "@/components/common/Button";
import { MAX_BID_COUNT } from "@/constants/bid";
import ROUTES from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import Confirm from "../common/Confirm";
import Modal from "../common/Modal";
import Layout from "../layout/Layout";

interface AuctionDetailsFooterProps {
  auctionId: number
  curStatus: string
}

const AuctionDetailsFooter = ({ auctionId, curStatus }: AuctionDetailsFooterProps) => {
  const navigate = useNavigate();
  const { mutate: cancelBid, isPending } = useCancelBid()
  const { auctionDetails } = useGetAuctionDetails(auctionId);

  const { isOrdered, isWinner, isSeller, bidId, isCancelled, remainingBidCount, isWon } = auctionDetails
  const remainFlag = remainingBidCount === MAX_BID_COUNT
  const disabledFlag = remainingBidCount === 0

  const clickBid = () => navigate(ROUTES.getBidRoute(auctionId))
  const clickCancel = () => cancelBid(bidId || 0)

  // 경매 종료
  if (curStatus === 'ENDED') {
    return (
      <Layout.Footer type="single">
        {isSeller
          ?
          // 판매자
          (isWon
            ?
            // 낙찰
            <Button type='button' onClick={() => navigate(ROUTES.getFinalBidderListRoute(auctionId))} color="cheeseYellow" className='w-full h-full'>
              참여자 내역 보기
            </Button>
            :
            // 유찰
            <Button type='button' disabled color="disabled" className='w-full h-full'>
              참여자 내역 보기
            </Button>)
          :
          // 낙찰 성공
          (isWinner
            ?
            (isOrdered
              ?
              // 결제 완료
              <Button type='button' color="cheeseYellow" className='w-full h-full'>
                결제 내역 보기
              </Button>
              :
              // 결제 이전
              <Button type='button' onClick={() => navigate(ROUTES.getAuctionShippingRoute(auctionId))} color="cheeseYellow" className='w-full h-full'>
                결제하기
              </Button>)
            :
            // 낙찰 실패
            <Button type='button' disabled color="disabled" className='w-full h-full'>
              종료된 경매
            </Button>)
        }
      </Layout.Footer>
    );
  }

  // 경매 진행 중
  if (isCancelled) {
    return (
      <Layout.Footer type="single">
        <Button type='button' disabled color="disabled" className='w-full h-full'>
          참여 취소 한 경매
        </Button>
      </Layout.Footer>
    );
  }

  // 판매자
  if (isSeller) {
    return (
      <Layout.Footer type="single">
        <Button type='button' disabled color="disabled" className='w-full h-full'>
          내가 등록한 경매
        </Button>
      </Layout.Footer>
    );
  }

  // 구매자
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
            <Modal>
              <Modal.Open name="cancelBid">
                <Button
                  type="button"
                  className="flex-1 h-full transition-colors rounded text-button active:bg-black"
                >
                  참여 취소
                </Button>
              </Modal.Open>
              <Modal.Window name="cancelBid">
                <Confirm type="cancelBid" >
                  <Button type='button' disabled={isPending} loading={isPending} color='cheeseYellow' className='w-full' onClick={clickCancel}>
                    참여 취소
                  </Button>
                </Confirm>
              </Modal.Window>
            </Modal>
            <Button
              type="button"
              className="flex-[2] h-full"
              disabled={disabledFlag}
              color='cheeseYellow'
              onClick={clickBid}
            >
              금액 수정 {remainingBidCount > 0 ? `(${remainingBidCount}회 가능)` : '(소진)'}
            </Button>
          </>
        }
      </Layout.Footer>

    </>
  );
}

export default AuctionDetailsFooter;
