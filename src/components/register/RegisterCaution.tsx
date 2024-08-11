import {
  ENROLLMENT_CAUTION,
  PRE_ENROLLMENT_CAUTION,
} from '@/constants/caution';

import CautionCheck from '../common/CautionCheck';

interface CautionProps {
  kind: string;
  check: boolean;
  handleCheck: () => void;
}

const RegisterCaution = ({ kind, check, handleCheck }: CautionProps) => {
  return (
    <section className="flex flex-col pt-5 gap-[3rem]">
      <h2 className="text-heading2">
        {kind === 'enroll'
          ? ENROLLMENT_CAUTION.HEADING
          : PRE_ENROLLMENT_CAUTION.HEADING}
      </h2>
      <div className="space-y-4">
        {kind === 'enroll' ? (
          <>
            <h5 className="text-body1Bold">{ENROLLMENT_CAUTION.TITLE}</h5>
            {Object.entries(ENROLLMENT_CAUTION.CONTENT).map(([key, value]) => (
              <div key={key} className="space-y-1 text-body2 text-gray1">
                <h6>{value.TITLE}</h6>
                <p>{value.DESCRIPTION}</p>
              </div>
            ))}
          </>
        ) : (
          <div className="space-y-8">
            {Object.entries(PRE_ENROLLMENT_CAUTION.CONTENT).map(
              ([key, value]) => (
                <div className="space-y-4" key={key}>
                  <h6 className="text-body1Bold">{value.TITLE}</h6>
                  <p className="text-body2 text-gray1">{value.DESCRIPTION}</p>
                </div>
              ),
            )}
          </div>
        )}
        <CautionCheck check={check} handleCheck={handleCheck} />
      </div>
    </section>
  );
};

export default RegisterCaution;
