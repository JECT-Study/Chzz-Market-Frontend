import { BID_CAUTION } from '@/constants/caution';
import CautionCheck from '../common/CautionCheck';

interface BidCautionProps {
  check: boolean;
  handleCheck: () => void;
}

const BidCaution = ({ check, handleCheck }: BidCautionProps) => {
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
      <CautionCheck check={check} handleCheck={handleCheck} />
    </section>
  );
};

export default BidCaution;
