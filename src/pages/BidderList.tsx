import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';

import AuctionItem from '@/components/common/AuctionItem';
import Button from '@/components/common/Button';
import Layout from '@/components/layout/Layout';
import { bidderListData } from '@/mocks/data/bidderListData';
import { formatCurrencyWithWon } from '@/utils/formatCurrencyWithWon';
import { useGetBidProductDetails } from '@/components/bid/queries';

const BidderList = () => {
  const navigate = useNavigate();
  const auctionId = useLoaderData() as number;

  const { isLoading, productDetails } = useGetBidProductDetails(auctionId);
  if (isLoading) return <p>Loading...</p>;
  if (!productDetails) return <p>Product not found</p>;
  const { img, name, startPrice, activeUserCount } = productDetails;

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate(-1)}>
        경매 참여자 목록
      </Layout.Header>
      <Layout.Main>
        <div className="flex flex-col gap-8 pt-4">
          <AuctionItem axis="row" label="입찰자 목록 상품">
            <AuctionItem.Image src={img} />
            <AuctionItem.Main
              kind="register"
              name={name}
              count={activeUserCount}
              startPrice={startPrice}
            />
          </AuctionItem>
          <div className="flex items-center justify-between">
            <h2 className="text-heading2">참여 가격</h2>
            <div className="text-body2 text-gray1">높은 가격순</div>
          </div>
          <hr className="border my-[-16px] border-gray3" />
          <ul className="flex flex-col gap-2">
            {bidderListData.map((el) => (
              <li
                key={el.id}
                className={`flex p-3 items-center justify-between text-gray1 ${el.id === 0 && 'border border-cheeseYellow rounded-lg'}`}
              >
                <span className="text-body1">{el.nickname}</span>
                <span className="text-body1Bold">
                  {formatCurrencyWithWon(el.bidAmount)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="button"
          color="cheeseYellow"
          className="w-full h-full"
          aria-label="최종 판매 버튼"
        >
          최종 판매하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default BidderList;

export const loader: LoaderFunction<number> = async ({ params }) => {
  const { auctionId } = params;

  return auctionId;
};
