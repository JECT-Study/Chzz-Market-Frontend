import Button from "@/components/common/Button";
import { useCancelBid, useLikeAuctionItem } from "@/components/details/queries";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

interface BuyersFooterProps {
  auctionId: number;
  bidId?: number;
  isSeller: boolean;
  status: string;
  likeCount?: number;
  isParticipated: boolean;
  remainingBidCount?: number;
}

const BuyersFooter = ({
  auctionId,
  bidId = 0,
  isSeller,
  status,
  likeCount = 0,
  isParticipated,
  remainingBidCount,
}: BuyersFooterProps) => {
  const navigate = useNavigate();
  const { mutate: likeAuctionItem } = useLikeAuctionItem();
  const { mutate: cancelBid } = useCancelBid(); // Call the hook here

  const [currentLikeCount, setCurrentLikeCount] = useState<number>(likeCount);
  const [isLiked, setIsLiked] = useState<boolean>(isParticipated);

  const onMoveToBidHandler = () => {
    navigate(`/auctions/bid/${auctionId}`);
  };

  const onToggleNotificationHandler = () => {
    likeAuctionItem(auctionId);
    if (!isLiked) {
      setCurrentLikeCount((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setCurrentLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      setIsLiked(false);
    }
  };

  const onCancelBidHandler = () => {
    cancelBid(bidId);
    navigate("/");
  };

  const HeartIcon = isLiked ? AiFillHeart : AiOutlineHeart;
  const heartColor = isLiked ? "text-red-500" : "text-gray-500";

  if (isSeller) return null;

  if (status === "PENDING") {
    return (
      <>
        <div className="flex items-center h-full gap-2 basis-1/3">
          <HeartIcon className={`${heartColor} size-6`} />
          <span className="pt-1 text-gray1 text-heading3">{`${currentLikeCount}명`}</span>
        </div>
        <Button
          type="button"
          className="h-full basis-4/5"
          color={isLiked ? 'white' : "cheeseYellow"}
          onClick={onToggleNotificationHandler}
        >
          {isLiked ? "좋아요 취소" : "좋아요"}
        </Button>
      </>
    );
  }

  if (status === "PROCEEDING" && !isParticipated) {
    return (
      <div className="flex items-center flex-1 h-full gap-2">
        <Button
          type="button"
          className="flex-[2] h-full"
          color="cheeseYellow"
          onClick={onMoveToBidHandler}
        >
          경매 참여하기
        </Button>
      </div>
    );
  }

  if (
    status === "PROCEEDING" &&
    isParticipated &&
    remainingBidCount &&
    remainingBidCount > 0
  ) {
    return (
      <div className="flex items-center justify-between p-2 rounded-lg">
        <Button
          type="button"
          color="white"
          className="flex-1 h-full transition-colors rounded text-button active:bg-black"
          onClick={onCancelBidHandler}
        >
          참여 취소
        </Button>
        <Button
          type="button"
          className="flex-[2] h-full"
          color="cheeseYellow"
          onClick={onMoveToBidHandler}
        >
          금액 수정({remainingBidCount}회 가능)
        </Button>
      </div>
    );
  }

  if (status === "PROCEEDING" && isParticipated && remainingBidCount === 0) {
    return (
      <div className="flex items-center justify-between p-2 rounded-lg">
        <Button
          type="button"
          color="white"
          className="flex-1 h-full transition-colors rounded text-button active:bg-black"
          onClick={onCancelBidHandler}
        >
          참여 취소
        </Button>
        <Button type="button" className="px-4 py-2 text-gray-600 disabled:">
          금액 수정(소진)
        </Button>
      </div>
    );
  }

  if (status === "ENDED") {
    return (
      <div className="p-2 text-center bg-gray-300 rounded-lg">종료된 경매</div>
    );
  }

  return null;
};

export default BuyersFooter;
