import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { store } from '@/app/store';
import type { IPreAuctionDetails } from '@/entities/auction/types/details';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import { CATEGORIES } from '@/shared/constants/categories';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { useConvertAuction } from '../model/useConvertAuction';
import { useDeletePreAuction } from '../model/useDeletePreAuction';
import { useGetAuctionDetails } from '../model/useGetAuctionDetails';
import { useToggleAuctionDetailsHeart } from '../model/useToggleAuctionDetailsHeart';
import { PreAuctionDetailsMain } from '../ui/PreAuctionDetailsMain';
import { auctionDetailsData } from './data';

vi.mock('@/features/details/model/useConvertAuction');
vi.mock('@/features/details/model/useDeletePreAuction');
vi.mock('@/features/details/model/useGetAuctionDetails');
vi.mock('@/features/details/model/useToggleAuctionDetailsHeart');

const mockedConvertAuction = vi.fn();
vi.mocked(useConvertAuction).mockReturnValue({
  mutate: mockedConvertAuction,
  isPending: false
});

const mockedDeletePreAuction = vi.fn();
vi.mocked(useDeletePreAuction).mockReturnValue({
  mutate: mockedDeletePreAuction,
  isPending: false
});

const mockedToggleAuctionDetailsHeart = vi.fn();
vi.mocked(useToggleAuctionDetailsHeart).mockReturnValue({
  mutate: mockedToggleAuctionDetailsHeart
});

const mockUseGetPreAuctionDetails = vi.mocked(useGetAuctionDetails);

describe('사전 경매 상세 조회 테스트', () => {
  const queryClient = new QueryClient();
  const setup = (auctionId: number) => {
    const preAuctionData = auctionDetailsData.find(
      (data) => data.auctionId === auctionId
    ) as IPreAuctionDetails;
    mockUseGetPreAuctionDetails.mockReturnValue({
      details: preAuctionData as IPreAuctionDetails
    });

    const utils = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PreAuctionDetailsMain auctionId={auctionId} />
        </Provider>
      </QueryClientProvider>, {
      wrapper: BrowserRouter
    });
    const user = userEvent.setup();

    return {
      ...utils,
      user
    };
  };

  test('뒤로 가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup(0);

    const backBtn = screen.getByRole('button', {
      name: /뒤로 가기/
    });
    await user.click(backBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  describe.each(auctionDetailsData.slice(9) as IPreAuctionDetails[])(
    '사전 경매 상세 조회 공통 데이터 테스트',
    ({ auctionId, category }) => {
      test('이미지 최소 1장, 판매자 이름 및 프로필 사진, 상품 이름, 카테고리, 시작가, 수정 시간, 찜한 사람 데이터가 있다.', () => {
        setup(auctionId);

        const auctionImages = screen.getAllByRole('img', { name: /상품 사진/ });
        const sellerName = screen.getByRole('paragraph', {
          name: /판매자 이름/
        });
        const sellerPicture = screen.getByRole('img', {
          name: /판매자 프로필 사진/
        });
        const productName = screen.getByRole('heading', { name: /상품 이름/ });
        const categoryBtn = screen.getByRole('button', { name: '카테고리' });
        const price = screen.getByLabelText(/시작가/);

        expect(auctionImages.length).toBeGreaterThanOrEqual(1);
        expect(sellerName).toBeInTheDocument();
        expect(sellerPicture).toBeInTheDocument();
        expect(productName).toBeInTheDocument();
        expect(categoryBtn).toBeInTheDocument();
        expect(price).toBeInTheDocument();
      });

      test('카테고리 클릭하면 해당 카테고리 별 목록 페이지로 이동한다.', async () => {
        const { user } = setup(auctionId);

        const categoryBtn = screen.getByRole('button', { name: '카테고리' });
        await user.click(categoryBtn);

        expect(mockedUseNavigate).toHaveBeenCalledWith(
          `/product/list?category=${CATEGORIES[category].lowerCode}`,
          { state: { category: CATEGORIES[category].value } }
        );
      });
    }
  );
  test('이미지 2장 이상인 경우 버튼으로 이동할 수 있다.', async () => {
    const { user } = setup(0);

    const backBtn = screen.getByRole('button', {
      name: /뒤로 가기/
    });
    await user.click(backBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  describe('등록자 테스트', () => {
    test('등록자는 옵션 버튼이 있다.', () => {
      setup(10);

      const optionBtn = screen.getByRole('button', { name: '옵션' });
      expect(optionBtn).toBeInTheDocument();
    });
    test('옵션 버튼 클릭하면 수정하기와 삭제하기 모달이 나온다.', async () => {
      const { user } = setup(10);

      const optionBtn = screen.getByRole('button', { name: '옵션' });
      await user.click(optionBtn);
      const modal = screen.getByLabelText('모달');
      expect(modal).toBeInTheDocument();
    });

    test('옵션 모달에서 수정하기 클릭하면 수정 페이지로 이동한다.', async () => {
      const { user } = setup(10);

      const optionBtn = screen.getByRole('button', { name: '옵션' });
      await user.click(optionBtn);
      const modal = screen.getByLabelText('모달');
      expect(modal).toBeInTheDocument();

      const editBtn = screen.getByRole('button', { name: '수정하기' });
      await user.click(editBtn);
      expect(mockedUseNavigate).toHaveBeenCalledWith(
        `/auctions/pre-auction/edit/${10}`
      );
    });

    test('옵션 모달에서 삭제하기 클릭하면 확인 모달이 나오고, 삭제하기 클릭하면 삭제할 수 있다.', async () => {
      const { user } = setup(10);

      const optionBtn = screen.getByRole('button', { name: '옵션' });
      await user.click(optionBtn);
      const modal = screen.getByLabelText('모달');
      expect(modal).toBeInTheDocument();

      const deleteConfirmBtn = screen.getByRole('button', {
        name: '삭제하기 확인'
      });
      await user.click(deleteConfirmBtn);

      const deleteBtn = screen.getByRole('button', { name: '삭제하기' });
      await user.click(deleteBtn);
      expect(mockedDeletePreAuction).toHaveBeenCalledWith(10);
    });

    test('등록자는 경매 전환하기 버튼이 있고, 클릭하면 확인 모달이 나오고, 전환하기 버튼 클릭하면 전환할 수 있다.', async () => {
      const { user } = setup(10);

      const confirmBtn = screen.getByRole('button', { name: '경매 전환 확인' });
      await user.click(confirmBtn);

      const convertBtn = screen.getByRole('button', { name: '경매 전환' });
      await user.click(convertBtn);
      expect(mockedConvertAuction).toHaveBeenCalled();
    });
  });

  describe('비등록자 테스트', () => {
    test('비등록자는 옵션이 없다.', async () => {
      setup(11);

      const optionBtn = screen.queryByRole('button', { name: '옵션' });
      expect(optionBtn).not.toBeInTheDocument();
    });

    test('찜한 사람은 찜 목록에서 제외 버튼이 있고, 클릭하면 찜 목록에서 제외할 수 있다.', async () => {
      const { user } = setup(11);

      const btn = screen.getByRole('button', { name: '찜 목록에서 제외' });
      await user.click(btn);
    });

    test('찜하지 않은 사람은 찜 목록에 추가 버튼이 있고, 클릭하면 찜할 수 있다.', async () => {
      const { user } = setup(12);

      const btn = screen.getByRole('button', { name: '찜 목록에 추가' });
      await user.click(btn);
    });
  });
});
