import PriceIcon from '@/shared/assets/icons/price.svg';
import { formatCurrencyWithWon } from '..';

export const Price = ({ title, price }: { title: string; price: number }) => {
  const formatted = formatCurrencyWithWon(price);

  return (
    <div
      aria-label={title}
      className="flex items-center text-caption web:text-body2"
    >
      <img src={PriceIcon} alt={title} className="pb-[2px]" />
      <div className="flex items-center gap-1">
        <span className=" text-gray2 whitespace-nowrap">{title}</span>
        <span className="font-bold">{formatted}</span>
      </div>
    </div>
  );
};
