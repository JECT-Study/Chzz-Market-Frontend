interface CautionProps {
  name: string;
  check: boolean;
  clickCheck: () => void;
}

const RegisterCaution = ({ name, check, clickCheck }: CautionProps) => {
  return (
    <button onClick={clickCheck}>
      {name}
      {check}
    </button>
  );
};

export default RegisterCaution;
