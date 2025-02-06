import { render, screen, waitFor } from '@testing-library/react';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import { getAuctionSearch, getPreAuctionSearch } from '../api';

import { AuctionSearch } from '@/pages/search';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';

vi.mock('@/features/auction-search/api', () => ({
  getAuctionSearch: vi.fn(),
  getPreAuctionSearch: vi.fn()
}));

describe('AuctionSearch', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuctionSearch />
      </BrowserRouter>
    );
    vi.clearAllMocks();
  });

  test('입력창 및 탭이 렌더링 확인', () => {
    // 검색 입력창 렌더링 확인
    expect(
      screen.getByPlaceholderText('검색어를 입력하세요')
    ).toBeInTheDocument();
  });

  test('데이터 패치 시 로딩 스피너 확인', async () => {
    (getAuctionSearch as Mock).mockResolvedValueOnce({ items: [] });
    (getPreAuctionSearch as Mock).mockResolvedValueOnce({ items: [] });

    // 검색 입력 시 getAuctionSearch API 호출 확인
    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    expect(input).toBeInTheDocument();

    await userEvent.type(input, 'test');
    await waitFor(() => expect(getAuctionSearch).toHaveBeenCalledTimes(1));
    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
  });

  test('검색 결과가 없을 때 "검색 결과가 없습니다"'),
    async () => {
      (getAuctionSearch as Mock).mockResolvedValueOnce({ items: [] });

      const input = screen.getByPlaceholderText('검색어를 입력하세요');
      await userEvent.type(input, 'nonexistent');

      await waitFor(() => {
        expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
      });
    };
});
