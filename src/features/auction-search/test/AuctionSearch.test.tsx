import { AuctionSearch } from "@/pages/search";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";
import { getAuctionSearch, getPreAuctionSearch } from "../api";

vi.mock('@/features/auction-search/api', () => ({
  getAuctionSearch: vi.fn(),
  getPreAuctionSearch: vi.fn(),
}));

describe('AuctionSearch', () => {
  // 모킹된 함수 호출 기록 초기화, 상호 간섭 방지
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AuctionSearch />
      </BrowserRouter>
    )
    vi.clearAllMocks();
  });

  test('입력창 및 탭이 렌더링 확인', () => {
    // 검색 입력창 렌더링 확인
    expect(screen.getByPlaceholderText('검색어를 입력하세요')).toBeInTheDocument();
  });

  test('데이터 패치 시 로딩 스피너 확인', async () => {
    (getAuctionSearch as Mock).mockResolvedValueOnce({ items: [] });
    (getPreAuctionSearch as Mock).mockResolvedValueOnce({ items: [] });
      
    // 검색 입력 시 getAuctionSearch API 호출 확인
    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    fireEvent.change(input, { target: { value: 'test'} });

    await waitFor(() => expect(getAuctionSearch).toHaveBeenCalledTimes(1));
    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();

    // 사전 경매 탭 클릭
    await waitFor(() => screen.getByText(/사전 경매/i));  // 탭이 렌더링될 때까지 기다림
    const preAuctionTab = screen.getByText(/사전 경매/i);
    fireEvent.click(preAuctionTab);

    // await waitFor(() => expect(getPreAuctionSearch).toHaveBeenCalledTimes(1));  // 호출이 완료될 때까지 기다림
    // await waitFor(() => expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument());
  });

  test('검색 결과가 없을 때 "검색 결과가 없습니다"'), async () => {
    (getAuctionSearch as Mock).mockResolvedValueOnce({ items: [] });

    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    fireEvent.change(input, { target: { value: 'nonexistent' }});

    await waitFor(() => {
      expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });
  };
});