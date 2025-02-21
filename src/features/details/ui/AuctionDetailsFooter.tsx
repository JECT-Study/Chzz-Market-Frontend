import { MAX_BID_COUNT } from "@/shared/constants/bid";
import { ROUTES } from "@/shared/constants/routes";
import { Button } from "@/shared/ui/Button";
import { Confirm } from "@/shared/ui/Confirm";
import { Modal } from "@/shared/ui/Modal";
import { useCancelBid, useGetAuctionDetails } from "../model";

import { Layout } from "@/app/layout";
import type { IAuctionDetails } from "@/entities/auction/types/details";
import { useNavigate } from "react-router";

export const AuctionDetailsFooter = ({ auctionId }: { auctionId: number }) => {
  const navigate = useNavigate();
  const { mutate: cancelBid, isPending } = useCancelBid()
  const { details } = useGetAuctionDetails<IAuctionDetails>(auctionId);

  const { isOrdered, isWinner, status, isSeller, bidId, isCancelled, remainingBidCount, isWon } = details
  const remainFlag = remainingBidCount === MAX_BID_COUNT
  const disabledFlag = remainingBidCount === 0

  const clickBid = () => navigate(ROUTES.getBidRoute(auctionId))
  const clickCancel = () => cancelBid(bidId || 0)

  // 경매 종료
  if (status === 'ENDED') {
    return (
      <Layout.Footer type="single">
        {isSeller
          ?
          // 판매자
          <Button ariaLabel="참여자 내역 보기" type='button' disabled={!isWon} color={!isWon ? 'disabled' : 'cheeseYellow'} onClick={isWon ? () => navigate(ROUTES.getBidderListRoute(auctionId)) : undefined} className='w-full h-full'>
            참여자 내역 보기
          </Button>
          :
          // 낙찰 성공
          (isWinner
            ?
            // 결제 완료
            <Button type='button' ariaLabel={isOrdered ? '결제 내역 보기' : '결제하기'} color="cheeseYellow" onClick={!isOrdered ? () => navigate(ROUTES.PAYMENT.getRoute(auctionId)) : undefined} className='w-full h-full'>
              {isOrdered ? '결제 내역 보기' : '결제하기'}
            </Button>
            :
            // 낙찰 실패
            <Button ariaLabel="종료된 경매" type='button' disabled color="disabled" className='w-full h-full'>
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
        <Button type='button' disabled color="disabled" className='w-full h-full' ariaLabel="참여 취소한 경매">
          참여 취소한 경매
        </Button>
      </Layout.Footer>
    );
  }

  // 판매자
  if (isSeller) {
    return (
      <Layout.Footer type="single">
        <Button type='button' disabled color="disabled" className='w-full h-full' ariaLabel="내가 등록한 경매">
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
            ariaLabel="경매 참여"
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
                  ariaLabel="참여 취소 확인"
                >
                  참여 취소
                </Button>
              </Modal.Open>
              <Modal.Window name="cancelBid">
                <Confirm type="cancelBid" >
                  <Button type='button' disabled={isPending} loading={isPending} color='cheeseYellow' className='w-full' onClick={clickCancel} ariaLabel="참여 취소">
                    참여 취소
                  </Button>
                </Confirm>
              </Modal.Window>
            </Modal>
            <Button
              type="button"
              className="flex-[2] h-full text-button"
              disabled={disabledFlag}
              color='cheeseYellow'
              size="medium"
              onClick={clickBid}
              ariaLabel="금액 수정"
            >
              금액 수정 {remainingBidCount > 0 ? `(${remainingBidCount}회 가능)` : '(소진)'}
            </Button>
          </>
        }
      </Layout.Footer>

    </>
  );
}