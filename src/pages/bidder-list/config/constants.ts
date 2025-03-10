export const BIDDER_LIST_PRICE_FILTER: {
  [key in 'HIGH' | 'LOW']: { sort: 'desc' | 'asc'; name: string; icon: string };
} = Object.freeze({
  HIGH: {
    sort: 'desc',
    name: '높은 가격순',
    icon: 'highest_price'
  },
  LOW: {
    sort: 'asc',
    name: '낮은 가격순',
    icon: 'lowest_price'
  }
});
