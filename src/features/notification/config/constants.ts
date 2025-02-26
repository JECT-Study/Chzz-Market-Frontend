import { ROUTES } from '@/shared/constants/routes';

interface NotificationContent {
  buttonName: string;
  title: string;
  link?: (auctionId: number) => string;
}

export const NOTIFICATION_CONTENTS: Record<string, NotificationContent> =
  Object.freeze({
    AUCTION_SUCCESS: {
      title: '최종 낙찰 알림',
      buttonName: '경매 참여자 목록 보러가기',
      link: (auctionId: number) => ROUTES.getBidderListRoute(auctionId)
    },
    AUCTION_FAILURE: {
      title: '최종 유찰 알림',
      buttonName: '확인'
    },
    AUCTION_WINNER: {
      title: '입찰 성공 알림',
      buttonName: '구매 확정하러 가기',
      link: (auctionId: number) => ROUTES.PAYMENT.getRoute(auctionId)
    },
    AUCTION_NON_WINNER: {
      title: '입찰 실패 알림',
      buttonName: '확인'
    },
    AUCTION_START: {
      title: '사전 경매 시작 알림',
      buttonName: '경매 상품 보러가기',
      link: (auctionId: number) => ROUTES.AUCTION.getItemRoute(auctionId)
    },
    PRE_AUCTION_CANCELED: {
      title: '사전 경매 취소 알림',
      buttonName: '확인'
    }
  });
