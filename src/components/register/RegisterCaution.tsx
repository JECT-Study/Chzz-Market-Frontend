import {
  ENROLLMENT_CAUTION,
  PRE_ENROLLMENT_CAUTION,
} from '@/constants/caution';

import Check from '../common/Check';

interface CautionProps {
  kind: string;
  check: boolean;
  handleCheck: () => void;
}

const RegisterCaution = ({ kind, check, handleCheck }: CautionProps) => {
  return (
    <section className="flex flex-col pt-5 gap-[3rem]">
      <h3 className="text-heading2">
        {kind === 'enroll'
          ? ENROLLMENT_CAUTION.HEADING
          : PRE_ENROLLMENT_CAUTION.HEADING}
      </h3>
      <div className="space-y-4">
        {kind === 'enroll' ? (
          <>
            <h4 className="text-body1Bold">{ENROLLMENT_CAUTION.TITLE}</h4>
            {Object.entries(ENROLLMENT_CAUTION.CONTENT).map(([key, value]) => (
              <div key={key} className="space-y-1 text-body2 text-gray1">
                <h4>{value.TITLE}</h4>
                <p>{value.DESCRIPTION}</p>
              </div>
            ))}
          </>
        ) : (
          <div className="space-y-8">
            {Object.entries(PRE_ENROLLMENT_CAUTION.CONTENT).map(
              ([key, value]) => (
                <div className="space-y-4" key={key}>
                  <h4 className="text-body1Bold">{value.TITLE}</h4>
                  <p className="text-body2 text-gray1">{value.DESCRIPTION}</p>
                </div>
              ),
            )}
          </div>
        )}
        <Check check={check} handleCheck={handleCheck} />
      </div>
    </section>
  );
};

export default RegisterCaution;
