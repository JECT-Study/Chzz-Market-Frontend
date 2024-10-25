const ROUTES = Object.freeze({
  HOME: '/',
  HEART: '/heart',
  NOTIFICATION: '/notification',
  USER: '/user',
  REGISTERED_LIST: '/user/list/registered',
  PARTICIPATED_LIST: '/user/list/participated',
  PRE_REGISTERED_LIST: '/user/list/pre-registered',

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

  AUCTION_SHIPPING: '/auctions/:auctionId/shipping',
  getAuctionShippingRoute: (auctionId: number) => `/auctions/${auctionId}/shipping`,
  DELIVERY_ADDRESS_LIST: '/auctions/:auctionId/address-list',
  getDeliveryAddressListRoute: (auctionId: string) => `/auctions/${auctionId}/address-list`,

  DELIVERY_ADDRESS_ADD: '/auctions/:auctionId/address-add',
  getDeliveryAddressAddRoute: (auctionId: number) => `/auctions/${auctionId}/address-add`,

  DELIVERY_ADDRESS_EDIT: '/auctions/:auctionId/address-edit',
  getDeliveryAddressEditRoute: (auctionId: number) => `/auctions/${auctionId}/address-edit`,

  EDIT_ADDRESS: '/auctions/:auctionId/edit-address',
  getEditAddressRoute: (auctionId: number) => `/auctions/${auctionId}/edit-address`,

  BID: '/auctions/bid/:auctionId',
  getBidRoute: (auctionId: number) => `/auctions/bid/${auctionId}`,

  FINAL_BIDDER_LIST: '/auctions/:auctionId/final-bidder-list',
  getFinalBidderListRoute: (auctionId: number) => `/auctions/${auctionId}/final-bidder-list`,

  PAYMENT_SUCCESS: '/payment/success',
});

export default ROUTES;
