import HighestPriceIcon from '@/assets/icons/highest_price.svg';
import LowestPriceIcon from '@/assets/icons/lowest_price.svg';

export const BIDDER_LIST_PRICE_FILTER: {
  [key in 'HIGH' | 'LOW']: { sort: 'desc' | 'asc'; name: string; icon: string };
} = Object.freeze({
  HIGH: {
    sort: 'desc',
    name: '높은 가격순',
    icon: HighestPriceIcon,
  },
  LOW: {
    sort: 'asc',
    name: '낮은 가격순',
    icon: LowestPriceIcon,
  },
});
