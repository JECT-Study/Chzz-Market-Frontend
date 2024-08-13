import { ProductListData } from '@/models/productList';

const useFilterButtons = () => {
  const sortByPopularity = (products: ProductListData) => {
    return products.items.sort(
      (a, b) => b.participantCount - a.participantCount,
    );
  };

  const sortByLatest = (products: ProductListData) => {
    return products.items.sort((a, b) => b.timeRemaining - a.timeRemaining);
  };

  const sortByHighPrice = (products: ProductListData) => {
    return products.items.sort((a, b) => b.minPrice - a.minPrice);
  };

  const sortByLowPrice = (products: ProductListData) => {
    return products.items.sort((a, b) => a.minPrice - b.minPrice);
  };

  return {
    sortByPopularity,
    sortByLatest,
    sortByHighPrice,
    sortByLowPrice,
  };
};

export default useFilterButtons;
