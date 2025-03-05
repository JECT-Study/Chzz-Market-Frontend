import { Layout } from "@/app/layout/ui/Layout";
import { isLoggedIn } from "@/features/auth/model/authSlice";
import { Button } from "@/shared/ui/Button";
import { Confirm } from "@/shared/ui/Confirm";
import { Modal } from "@/shared/ui/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useConvertAuction } from "../model/useConvertAuction";
import { useToggleAuctionDetailsHeart } from "../model/useToggleAuctionDetailsHeart";

interface PreAuctionDetailsFooterProps {
  isLiked: boolean;
  auctionId: number;
  isSeller: boolean;
}

export const PreAuctionDetailsFooter = ({
  isLiked,
  auctionId,
  isSeller
}: PreAuctionDetailsFooterProps) => {
  const { mutate: toggleAuctionItemHeart } = useToggleAuctionDetailsHeart();
  const { mutate: convertToAuction, isPending } = useConvertAuction(auctionId);
  const isLogin = useSelector(isLoggedIn);
  const navigate = useNavigate();

  const clickHeart = () => {
    if (!isLogin) {
      toast.error('로그인 후 이용해주세요.');
      navigate('/login');
    }

    toggleAuctionItemHeart(auctionId)
  }

  return (
    <Layout.Footer type="single">
      {isSeller ? (
        <Modal>
          <Modal.Open name="convert">
            <Button
              ariaLabel="경매 전환 확인"
              type="button"
              className="w-full h-full"
              color="cheeseYellow"
            >
              경매 전환하기
            </Button>
          </Modal.Open>
          <Modal.Window name="convert">
            <Confirm type="convert">
              <Button
                ariaLabel="경매 전환"
                type="button"
                disabled={isPending}
                loading={isPending}
                onClick={() => convertToAuction()}
                className="w-full h-full"
                color="cheeseYellow"
              >
                전환하기
              </Button>
            </Confirm>
          </Modal.Window>
        </Modal>
      ) : (
        <Button
          ariaLabel={isLiked ? '찜 목록에서 제외' : '찜 목록에 추가'}
          type="button"
          className="w-full h-full"
          color={isLiked ? 'grayWhite' : 'cheeseYellow'}
          onClick={clickHeart}
        >
          {isLiked ? '찜 목록에서 제외' : '찜 목록에 추가'}
        </Button>
      )}
    </Layout.Footer>
  );
};
