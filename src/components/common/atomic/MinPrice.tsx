import PriceIcon from '@/assets/icons/price.svg';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';

const MinPrice = ({ title, price }: { title: string, price: number }) => {
  const formatted = formatCurrencyWithWon(price);

  return (
    <div
      aria-label={title}
      className="flex items-center text-xs sm:text-body2 text-gray2"
    >
      <img src={PriceIcon} alt={title} />
      <span className='overflow-hidden whitespace-nowrap pt-[2px]'>
        {title} <span className="ml-1 text-xs text-black sm:text-body2Bold">{formatted}</span>
      </span>
    </div>
  );
};

export default MinPrice;
