const ROUTERS = Object.freeze({
  HOME: '/',
  HEART: '/heart',
  NOTIFICATION: '/notification',
  USER: '/user',
  REGISTERED_LIST: '/user/list/registered',
  PRE_REGISTERED_LIST: '/user/list/pre-registered',
  PARTICIPATED_LIST: '/user/list/participated',

  SIGNUP: '/signup',
  LOGIN: '/login',
  PROFILE_EDIT: '/user/profile/edit',
  PRODUCT_LIST: '/product/list',
  REGISTER: '/auctions/register',
  AUCTION: {
    ITEM: '/auctions/auction',
  },
  PRE_AUCTION: {
    ITEM: '/auctions/pre-auction',
    EDIT: '/auctions/pre-auction/edit',
  },
  AUCTION_SHIPPING: '/auctions/:auctionId/shipping',
  // delivery_address_list 라우터 재설정 필요
  DELIVERY_ADDRESS_LIST: '/auctions/:auctionId/address-list',
  DELIVERY_ADDRESS_ADD: '/auctions/:auctionId/address-add',
  DELIVERY_ADDRESS_EDIT: '/auctions/:auctionId/address-edit',

  BID: '/auctions/bid/:auctionId',
  FINAL_BIDDER_LIST: '/auctions/:auctionId/final-bidder-list',
  PAYMENT_SUCCESS: '/payment/success',
});

export default ROUTERS;
