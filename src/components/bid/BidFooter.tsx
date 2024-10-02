import Button from '../common/Button';
import { MAX_BID_COUNT } from '@/constants/bid';

interface BidFooterProps {
  remain: number;
  check: boolean;
  isSubmitting: boolean;
  handlePost: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  handlePatch: () => void;
}

const BidFooter = ({ remain, check, isSubmitting, handlePost, handlePatch }: BidFooterProps) => {
  if (remain === MAX_BID_COUNT) {
    return (
      <Button
        type='button'
        color='cheeseYellow'
        className='w-full h-full transition-colors rounded text-button active:bg-black'
        aria-label='제안하기 버튼'
        onClick={handlePost}
        disabled={!check || isSubmitting}
      >
        제안하기
      </Button>
    );
  }

  return (
    <>
      <Button type='button' color='white' className='flex-1 h-full transition-colors rounded text-button active:bg-black' onClick={handlePatch}>
        참여 취소
      </Button>
      <Button
        type='button'
        color='cheeseYellow'
        className='flex-[2] h-full rounded text-button active:bg-black transition-colors'
        disabled={!check || isSubmitting || remain === 0}
        onClick={handlePost}
      >
        금액 수정
        {remain !== 0 ? `(${remain}회 가능)` : '(소진)'}
      </Button>
    </>
  );
};

export default BidFooter;
