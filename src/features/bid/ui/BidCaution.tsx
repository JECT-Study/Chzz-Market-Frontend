import { Checkbox } from '@/shared/ui/Checkbox';
import { BID_CAUTION } from '../config/caution';

interface BidCautionProps {
  check: boolean;
  toggle: () => void;
}

export const BidCaution = ({ check, toggle }: BidCautionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-heading3">{BID_CAUTION.HEADING}</h3>
      <div className="space-y-4">
        {BID_CAUTION.CONTENT.map(({ ID, TITLE, DESCRIPTION }) => (
          <div key={ID} className="flex flex-col gap-1 text-body2 text-gray2">
            <h4>{TITLE}</h4>
            <p className="pl-3">{DESCRIPTION}</p>
          </div>
        ))}
      </div>
      <Checkbox
        title="주의사항을 모두 확인하였으며 위 내용에 동의합니다."
        check={check}
        toggle={toggle}
      />
    </section>
  );
};
