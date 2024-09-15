const ROUTERS = Object.freeze({
  HOME: '/',
  HEART: '/heart',
  SIGNUP: '/signup',
  LOGIN: '/login',
  USER: '/user',
  PROFILE: {
    EDIT: 'user/profile/edit',
  },
  PRODUCT: {
    LIST: '/product/list',
  },
  REGISTERED: {
    LIST: 'user/registered/list',
  },
  ORDER: {
    HISTORY: '/order/history',
  },
  REGISTER: '/auctions/register',
  AUCTION: {
    ITEM: '/auctions/auction/:auctionId',
  },
  PRE_AUCTION: {
    ITEM: '/auctions/pre-auction/:auctionId',
  },

  ADDRESSBOOK: '/addressbook',
  BID: '/auctions/bid/:auctionId',
  NOTIFICATION: '/notification',
  FINAL_BIDDER_LIST: '/auctions/:auctionId/final-bidder-list',
});

export default ROUTERS;
