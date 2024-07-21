import React from 'react';
import Layout from './ui/Layout';
import Button from './components/common/Button';
import products from './mock/data/ProductList';

const ProductList = () => {
  return (
    <Layout
      header={
        <header className="flex items-center justify-between p-4 border-b">
          <button className="text-gray-500" aria-label="뒤로 가기">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">상품 경매 목록</h1>
          <div />
        </header>
      }
      footer={null}
    >
      {/* <div className=''> container div */}
      <div className="flex h-22px space-x-2 p-4">
        <Button
          size="xsmall"
          color="white"
          hoverColor="black"
          type="button"
          className="rounded-l-[10%] rounded-r-[10%]"
        >
          인기
        </Button>
        <Button
          size="xsmall"
          color="white"
          hoverColor="black"
          type="button"
          className="rounded-l-[10%] rounded-r-[10%]"
        >
          가격
        </Button>
        <Button
          size="xsmall"
          color="white"
          hoverColor="black"
          type="button"
          className="rounded-l-[10%] rounded-r-[10%]"
        >
          기간
        </Button>
        <Button
          size="xsmall"
          color="white"
          hoverColor="black"
          type="button"
          className="rounded-l-[10%] rounded-r-[10%]"
        >
          찜
        </Button>
      </div>
      <div className="p-4">
        {products.map((product) => (
          <div key={product.id} className="mb-4">
            <div className="flex h-[96px]">
              <div className="w-[96px] h-full bg-gray-300" />
              <div className="flex flex-col gap-[8px] ml-4">
                <div>
                  <p className="text-xs">{product.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    {product.startPrice} (시작가)
                  </p>
                  <p
                    className={`text-xs font-semibold ${product.isBidding ? 'text-black' : 'text-red-500'}`}
                  >
                    {product.currentBid}
                  </p>
                </div>
                <Button
                  size="medium"
                  color="black"
                  type="button"
                  className={`${product.isBidding ? 'bg-gray-700' : 'bg-black'} rounded-small`}
                >
                  {product.isBidding ? '경매 참여 중' : '경매 참여하기'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default ProductList;
