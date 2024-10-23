const ROUTES = Object.freeze({
  HOME: '/',
  HEART: '/heart',
  NOTIFICATION: '/notification',
  USER: '/user',
  REGISTERED_LIST: '/user/list/registered',
  PARTICIPATED_LIST: '/user/list/participated',

  SIGNUP: '/signup',
  LOGIN: '/login',
  PROFILE_EDIT: '/user/profile/edit',
  PRODUCT_LIST: '/product/list',
  REGISTER: '/auctions/register',

  AUCTION_ITEM: '/auctions/auction',
  getAuctionItemRoute: (auctionId: number) => `/auctions/auction/${auctionId}`,

  PRE_AUCTION_ITEM: '/auctions/pre-auction',
  getPreAuctionItemRoute: (preAuctionId: number) => `/auctions/pre-auction/${preAuctionId}`,

  PRE_AUCTION_EDIT: '/auctions/pre-auction/edit',
  getPreAuctionEditRoute: (preAuctionId: number) => `/auctions/pre-auction/edit/${preAuctionId}`,

  AUCTION_PAYMENT: '/auctions/:auctionId/payment',
  getAuctionPaymentRoute: (auctionId: number) => `/auctions/${auctionId}/payment`,
  // delivery_address_list 라우터 재설정 필요
  DELIVERY_ADDRESS_LIST: '/auctions/:auctionId/address-list',
  DELIVERY_ADDRESS_ADD: '/auctions/address-add',

  BID: '/auctions/bid/:auctionId',
  getBidRoute: (auctionId: number) => `/auctions/bid/${auctionId}`,

  FINAL_BIDDER_LIST: '/auctions/:auctionId/final-bidder-list',
  getFinalBidderListRoute: (auctionId: number) => `/auctions/${auctionId}/final-bidder-list`,

  PAYMENT_SUCCESS: '/payment/success',
});

export default ROUTES;
