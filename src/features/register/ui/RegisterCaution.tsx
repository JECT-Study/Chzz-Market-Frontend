import { Checkbox } from "@/shared";
import { PRE_REGISTER_CAUTION, REGISTER_CAUTION } from '../config/index';

interface CautionProps {
  kind: string;
  check: boolean;
  handleCheck: () => void;
}

export const RegisterCaution = ({ kind, check, handleCheck }: CautionProps) => {
  return (
    <section className='flex flex-col pt-5 gap-[3rem]'>
      <h3 className='text-heading2'>{kind === 'REGISTER' ? REGISTER_CAUTION.HEADING : PRE_REGISTER_CAUTION.HEADING}</h3>
      <div className='space-y-5'>
        {kind === 'REGISTER' ? (
          <>
            <h4 className='text-body1Bold'>{REGISTER_CAUTION.TITLE}</h4>
            {Object.entries(REGISTER_CAUTION.CONTENT).map(([key, value]) => (
              <div key={key} className='space-y-1 text-body2 text-gray2'>
                <h5>{value.TITLE}</h5>
                <p className='pl-3'>{value.DESCRIPTION}</p>
              </div>
            ))}
          </>
        ) : (
          <div className='space-y-5'>
            {Object.entries(PRE_REGISTER_CAUTION.CONTENT).map(([key, value]) => (
              <div className='space-y-4' key={key}>
                <h4 className='text-body1Bold'>{value.TITLE}</h4>
                <p className='text-body2 text-gray2'>{value.DESCRIPTION}</p>
              </div>
            ))}
          </div>
        )}
        <Checkbox check={check} handleCheck={handleCheck} />
      </div>
    </section>
  );
};