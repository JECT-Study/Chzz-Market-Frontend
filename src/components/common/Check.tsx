interface CheckProps {
  check: boolean;
  handleCheck: () => void;
}

const Check = ({ check, handleCheck }: CheckProps) => {
  const state = check ? 'on' : 'off';

  return (
    <button
      onClick={handleCheck}
      aria-label="주의사항 체크"
      className="flex items-center gap-3"
    >
      <img src={`/check_${state}.svg`} alt={`check_${state}`} />
      <span className="text-body2 text-gray1">
        주의사항을 모두 확인하였으며 위 내용에 동의합니다.
      </span>
    </button>
  );
};

export default Check;
