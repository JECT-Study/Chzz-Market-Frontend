export const ROUTES = Object.freeze({
  HOME: '/',
  HEART: '/heart',
  NOTIFICATION: '/notification',
  USER: {
    HOME: '/user',
    PROFILE_EDIT: '/user/profile/edit',
    REGISTERED_LIST: '/user/list/registered',
    PRE_REGISTERED_LIST: '/user/list/pre-registered',
    PARTICIPATED_LIST: '/user/list/participated',
  },

  SIGNUP: '/signup',
  LOGIN: '/login',
  PRODUCT_LIST: '/product/list',
  REGISTER: '/auctions/register',
  AUCTION_SEARCH: '/auctions/search',

  AUCTION: {
    ITEM: '/auctions/auction/:auctionId',
    getItemRoute: (auctionId: number) => `/auctions/auction/${auctionId}`,
  },

  PRE_AUCTION: {
    ITEM: '/auctions/pre-auction/:auctionId',
    getItemRoute: (auctionId: number) => `/auctions/pre-auction/${auctionId}`,

    EDIT: '/auctions/pre-auction/edit/:auctionId',
    getEditRoute: (auctionId: number) => `/auctions/pre-auction/edit/${auctionId}`,
  },

  BID: '/auctions/bid/:auctionId',
  getBidRoute: (auctionId: number) => `/auctions/bid/${auctionId}`,

  SETTLEMENT: '/auctions/:auctionId/settlement',
  getSettlementRoute: (auctionId: number) => `/auctions/${auctionId}/settlement`,

  PAYMENT: {
    HOME: '/auctions/:auctionId/payment',
    getRoute: (auctionId: string | number) => `/auctions/${auctionId}/payment`,

    ADDRESS: {
      LIST: '/auctions/:auctionId/payment/address-list',
      getListRoute: (auctionId: string) => `/auctions/${auctionId}/payment/address-list`,

      ADD: '/auctions/:auctionId/payment/address-add',
      getAddRoute: (auctionId: string) => `/auctions/${auctionId}/payment/address-add`,

      EDIT: '/auctions/:auctionId/payment/address-edit',
      getEditRoute: (auctionId: string) => `/auctions/${auctionId}/payment/address-edit`,

      EDIT_LIST: '/auctions/:auctionId/payment/address-edit-list',
      getEditListRoute: (auctionId: string) => `/auctions/${auctionId}/payment/address-edit-list`,
    },

    SUCCESS: '/payment/success',
  },
});
