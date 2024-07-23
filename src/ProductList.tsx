import React, { useState } from 'react';
import classNames from 'classnames';
import { LuUsers } from 'react-icons/lu';
import { FaHeart } from 'react-icons/fa';
// import Layout from './ui/Layout';
import Button from './components/common/Button';
import ongoingProducts from './mock/data/ongoingData';
import upcomingProducts from './mock/data/upcomingData';

const ProductList = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [activeFilter, setActiveFilter] = useState('');

  return (
    // <Layout
    //   header={
    //     <header className="flex items-center justify-between p-4 border-b">
    //       <button className="text-gray-500" aria-label="뒤로 가기">
    //         <svg
    //           className="w-6 h-6"
    //           fill="none"
    //           stroke="currentColor"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M15 19l-7-7 7-7"
    //           />
    //         </svg>
    //       </button>
    //       <h1 className="text-lg font-semibold">상품 경매 목록</h1>
    //       <div />
    //     </header>
    //   }
    //   footer={null}
    // >
    <>
      <div className="flex justify-center w-full mt-3">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={classNames(
            'flex justify-center items-center w-full py-2 ml-4 cursor-pointer text-sm',
            activeTab === 'ongoing'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-gray-300',
          )}
          onClick={() => setActiveTab('ongoing')}
        >
          진행 중인 경매
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={classNames(
            'flex justify-center w-full items-center py-2 mr-4 cursor-pointer text-sm',
            activeTab === 'upcoming'
              ? 'border-b-2 border-black'
              : 'border-b-2 border-gray-300',
          )}
          onClick={() => setActiveTab('upcoming')}
        >
          사전 등록 경매
        </div>
      </div>
      <div className="flex h-22px space-x-3 p-4">
        <Button
          size="xsmall"
          color={classNames(activeFilter === 'popular' ? 'black' : 'white')}
          hoverColor="black"
          type="button"
          className="rounded-full"
          onClick={() => setActiveFilter('popular')}
        >
          인기
        </Button>
        <Button
          size="xsmall"
          color={classNames(activeFilter === 'highPrice' ? 'black' : 'white')}
          hoverColor="black"
          type="button"
          className="rounded-full"
          onClick={() => setActiveFilter('highPrice')}
        >
          높은 가격순
        </Button>
        <Button
          size="xsmall"
          color={classNames(activeFilter === 'lowPrice' ? 'black' : 'white')}
          hoverColor="black"
          type="button"
          className="rounded-full"
          onClick={() => setActiveFilter('lowPrice')}
        >
          낮은 가격순
        </Button>
        <Button
          size="xsmall"
          color={classNames(activeFilter === 'latest' ? 'black' : 'white')}
          hoverColor="black"
          type="button"
          className="rounded-full"
          onClick={() => setActiveFilter('latest')}
        >
          최신순
        </Button>
      </div>
      <div className="p-4 h-[calc(100vh-100px)] overflow-y-auto">
        {activeTab === 'ongoing'
          ? ongoingProducts.map((product) => (
              <div key={product.id} className="mb-4">
                <div className="flex h-[96px]">
                  <div className="w-[96px] h-full bg-gray-300" />
                  <div className="flex flex-col gap-[8px] ml-4">
                    <div>
                      <p className="text-xs">{product.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">
                        {`시작가 ${product.startPrice}`}
                      </p>
                      <div className="flex gap-1">
                        <LuUsers />
                        <p className="text-xs text-gray-500">
                          {`${product.activeUserCount}명 참여 중`}
                        </p>
                      </div>
                    </div>
                    <Button
                      color="black"
                      type="button"
                      className={`${product.isBidding ? 'bg-gray-700' : 'bg-black'} w-[100px] h-[33px] rounded-md`}
                    >
                      {product.isBidding ? '경매 참여 중' : '경매 참여하기'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          : upcomingProducts.map((product) => (
              <div key={product.id} className="mb-4">
                <div className="flex h-[96px]">
                  <div className="w-[96px] h-full bg-gray-300" />
                  <div className="flex flex-col gap-[8px] ml-4">
                    <div>
                      <p className="text-xs">{product.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500">
                        {`시작가 ${product.startPrice}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaHeart />
                      <p className="text-xs text-gray-500">{product.likes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
    // </Layout>
  );
};

export default ProductList;
