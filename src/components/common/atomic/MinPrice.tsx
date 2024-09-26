import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import PriceIcon from '@/assets/icons/price.svg';

const MinPrice = ({ price }: { price: number }) => {
  const formatted = formatCurrencyWithWon(price);
  return (
    <div
      aria-label="시작가"
      className="flex items-center text-body2 text-gray2"
    >
      <img src={PriceIcon} alt="시작가" />
      <span>
        시작가 <span className="text-black text-body2Bold">{formatted}</span>
      </span>
    </div>
  );
};

export default MinPrice;
