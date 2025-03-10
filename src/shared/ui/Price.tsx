import { formatCurrencyWithWon } from '../utils/formatCurrencyWithWon';
import { Icon } from './Icon';

export const Price = ({ title, price }: { title: string; price: number }) => {
  const formatted = formatCurrencyWithWon(price);

  return (
    <div
      aria-label={title}
      className="flex items-center text-caption web:text-body2"
    >
      <Icon name='price' style='pb-[2px] size-5' />
      <div className="flex items-center gap-1">
        <span className=" text-gray2 whitespace-nowrap">{title}</span>
        <span className="font-bold">{formatted}</span>
      </div>
    </div>
  );
};
