import type {
  IAuctionDetails,
  IPreAuctionDetails
} from '@/entities/auction/types/details';

import adidasImage from '@/shared/assets/test/adidas_superstar.jpeg';
import jordanBlackImage from '@/shared/assets/test/jordan_black.jpeg';
import jordanBlueImage from '@/shared/assets/test/jordan_blue.jpeg';
import jordanRedImage from '@/shared/assets/test/jordan_red.jpeg';
import newBalanceImage from '@/shared/assets/test/newbalance_993.jpeg';

export const auctionDetailsData: (IAuctionDetails | IPreAuctionDetails)[] = [
  // 일반 예시
  {
    auctionId: 0,
    auctionName: '[나이키] 에어 조던 로우',
    images: [
      {
        imageId: 0,
        imageUrl: jordanRedImage
      },
      {
        imageId: 1,
        imageUrl: newBalanceImage
      },
      {
        imageId: 2,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 100_000,
    timeRemaining: 50_400,
    participantCount: 2,
    isParticipated: false,
    bidId: null,
    bidAmount: 0,
    remainingBidCount: 3,
    description: '에어 조던 로우입니다.',
    isCancelled: false,
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'PROCEEDING',
    category: 'FASHION_AND_CLOTHING',
    isWinner: false,
    isWon: false,
    isOrdered: false
  },
  // 판매자 및 경매 종료 예시
  {
    auctionId: 1,
    auctionName: '[나이키] 조던 블랙',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 120_000,
    timeRemaining: 1,
    participantCount: 8,
    isParticipated: false,
    bidId: null,
    bidAmount: 0,
    remainingBidCount: 2,
    description: '에어 조던 블랙입니다.',
    isCancelled: false,
    isSeller: true,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'PROCEEDING',
    category: 'ELECTRONICS',
    isWinner: false,
    isWon: true,
    isOrdered: false
  },
  // 경매 취소 예시
  {
    auctionId: 2,
    auctionName: '[나이키] 조던 블루',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlueImage
      },
      {
        imageId: 1,
        imageUrl: newBalanceImage
      }
    ],
    minPrice: 180_000,
    timeRemaining: 82_800,
    participantCount: 29,
    isParticipated: false,
    bidId: 3,
    bidAmount: 0,
    remainingBidCount: 1,
    description: '에어 조던 블루입니다.',
    isCancelled: true,
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: newBalanceImage,
    status: 'PROCEEDING',
    category: 'BOOKS_AND_MEDIA',
    isWinner: false,
    isWon: false,
    isOrdered: false
  },
  // 경매 참여자, 소진 예시
  {
    auctionId: 3,
    auctionName: '[뉴발란스] 993',
    images: [
      {
        imageId: 0,
        imageUrl: newBalanceImage
      }
    ],
    minPrice: 230_000,
    timeRemaining: 3600,
    participantCount: 32,
    isParticipated: true,
    bidId: 1,
    bidAmount: 350_000,
    remainingBidCount: 1,
    description: '뉴발란스 993입니다.',
    isCancelled: false,
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'PROCEEDING',
    category: 'ELECTRONICS',
    isWinner: false,
    isWon: false,
    isOrdered: false
  },
  // 경매 참여자, 종료 예시
  {
    auctionId: 4,
    auctionName: '[아디다스] 슈퍼스타',
    images: [
      {
        imageId: 0,
        imageUrl: adidasImage
      },
      {
        imageId: 1,
        imageUrl: newBalanceImage
      }
    ],
    minPrice: 70_000,
    timeRemaining: 0,
    participantCount: 6,
    isParticipated: true,
    bidId: 1,
    bidAmount: 80_000,
    remainingBidCount: 1,
    description: '아디다스 슈퍼스타입니다.',
    isCancelled: false,
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'PROCEEDING',
    category: 'ELECTRONICS',
    isWinner: false,
    isWon: false,
    isOrdered: false
  },
  // 판매자, 종료된 경매, 참여자 없음 예시
  {
    auctionId: 5,
    auctionName: '[나이키] 조던 블랙',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 120_000,
    timeRemaining: 0,
    participantCount: 8,
    isParticipated: false,
    bidId: null,
    bidAmount: 0,
    remainingBidCount: 2,
    description: '에어 조던 블랙입니다.',
    isCancelled: false,
    isSeller: true,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'ENDED',
    category: 'ELECTRONICS',
    isWinner: false,
    isWon: false,
    isOrdered: false
  },
  // 판매자, 종료된 경매, 참여자 있음 예시
  {
    auctionId: 6,
    auctionName: '[나이키] 조던 블랙',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 120_000,
    timeRemaining: 0,
    participantCount: 8,
    isParticipated: false,
    bidId: null,
    bidAmount: 0,
    remainingBidCount: 2,
    description: '에어 조던 블랙입니다.',
    isCancelled: false,
    isSeller: true,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'ENDED',
    category: 'ELECTRONICS',
    isWinner: false,
    isWon: true,
    isOrdered: false
  },
  // 구매자, 종료된 경매, 참여하지 않은 예시
  {
    auctionId: 7,
    auctionName: '[나이키] 조던 블랙',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 120_000,
    timeRemaining: 0,
    participantCount: 8,
    isParticipated: false,
    bidId: null,
    bidAmount: 0,
    remainingBidCount: 2,
    description: '에어 조던 블랙입니다.',
    isCancelled: false,
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'ENDED',
    category: 'ELECTRONICS',
    isWinner: false,
    isWon: false,
    isOrdered: false
  },
  // 구매자, 종료된 경매, 낙찰받은 예시
  {
    auctionId: 8,
    auctionName: '[나이키] 조던 블랙',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 120_000,
    timeRemaining: 0,
    participantCount: 8,
    isParticipated: false,
    bidId: 1,
    bidAmount: 130_000,
    remainingBidCount: 2,
    description: '에어 조던 블랙입니다.',
    isCancelled: false,
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'ENDED',
    category: 'ELECTRONICS',
    isWinner: true,
    isWon: false,
    isOrdered: false
  },
  // 구매자, 종료된 경매, 결제한 예시
  {
    auctionId: 9,
    auctionName: '[나이키] 조던 블랙',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 120_000,
    timeRemaining: 0,
    participantCount: 8,
    isParticipated: false,
    bidId: 1,
    bidAmount: 130_000,
    remainingBidCount: 2,
    description: '에어 조던 블랙입니다.',
    isCancelled: false,
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'ENDED',
    category: 'ELECTRONICS',
    isWinner: true,
    isWon: false,
    isOrdered: true
  },

  // 사전 경매
  // 판매자
  {
    auctionId: 10,
    updatedAt: '2025-01-17T14:51:30',
    likeCount: 45,
    isLiked: false,
    auctionName: '[뉴발란스] 993',
    images: [
      {
        imageId: 0,
        imageUrl: newBalanceImage
      },
      {
        imageId: 1,
        imageUrl: adidasImage
      },
      {
        imageId: 2,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 230_000,
    description: '뉴발란스 993입니다.',
    isSeller: true,
    sellerNickname: 'seller',
    sellerProfileImageUrl: jordanBlueImage,
    status: 'PROCEEDING',
    category: 'FASHION_AND_CLOTHING'
  },

  // 구매자, 좋아요
  {
    auctionId: 11,
    updatedAt: '2025-01-23T17:51:30',
    likeCount: 18,
    isLiked: true,
    auctionName: '[나이키] 조던 블루',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlueImage
      }
    ],
    minPrice: 180_000,
    description: '에어 조던 블루입니다.',
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: newBalanceImage,
    status: 'PROCEEDING',
    category: 'FASHION_AND_CLOTHING'
  },
  // 구매자, 좋아요 안 함
  {
    auctionId: 12,
    updatedAt: '2025-01-31T21:51:30',
    likeCount: 20,
    isLiked: false,
    auctionName: '[나이키] 조던 블랙',
    images: [
      {
        imageId: 0,
        imageUrl: jordanBlackImage
      }
    ],
    minPrice: 210_000,
    description: '에어 조던 블랙입니다.',
    isSeller: false,
    sellerNickname: 'seller',
    sellerProfileImageUrl: newBalanceImage,
    status: 'PROCEEDING',
    category: 'FASHION_AND_CLOTHING'
  }
];
