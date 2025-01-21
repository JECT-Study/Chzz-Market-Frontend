import { beforeEach, describe, test, vi } from "vitest";
import { useProductList } from "@/features/product-list";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { ProductList } from "@/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock('@/features/product-list', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  const setActiveTabMock = vi.fn();
  return {
    ...actual,
    useProductList: vi.fn(),
    ProductListTabs: ({ setActiveTab }: any) => (
      <div>
        <button onClick={() => setActiveTab('ongoing')}>정식 경매</button>
        <button onClick={() => setActiveTab('pre-auction')}>사전 경매</button>
      </div>
    ),
    setActiveTabMock,
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('ProductList', () => {
  const mockUseProductList = useProductList as ReturnType<typeof vi.fn>;
  const mockUseLocation = useLocation as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseProductList.mockReturnValue({
      ongoingData: {
        pages: [
          {
            items: [
              {
                auctionId: 0,
                auctionName: 'Auction 1',
                imageUrl: 'image.png1',
                minPrice: 3000,
                isSeller: true,
                timeRemaining: 36000,
                participantCount: 5,
                isParticipated: true,
              },
            ],
          },
        ],
      },
      enrollData: {
        pages: [
          {
            items: [
              {
                auctionId: 1,
                auctionName: 'Pre-Auction 1',
                imageUrl: 'image.png2',
                minPrice: 20000,
                isSeller: false,
                timeRemaining: 36000,
                participantCount: 10,
                isParticipated: false,
              },
            ],
          },
        ],
      },
      fetchNextOngoingPage: vi.fn(),
      fetchNextEnrollPage: vi.fn(),
      hasNextOngoingPage: true,
      hasNextEnrollPage: true,
    });

    mockUseLocation.mockReturnValue({
      state: { category: 'ELECTRONICS' },
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test('뒤로가기 버튼 테스트', () => {
    expect(screen.getByText(/ELECTRONICS 경매 목록/)).toBeInTheDocument();
    const backButton = screen.getByLabelText('뒤로 가기');
    expect(backButton).toBeInTheDocument();
  });

  test('렌더링 시 정식 경매 디폴트값 확인', () => {
    expect(mockUseProductList).toHaveBeenCalledWith(
      'ongoing',
      'newest',
      'product-newest',
      'all'
    );
  });

  test('정렬 버튼 확인', () => {
    expect(screen.getByText('최신순')).toBeInTheDocument();
    expect(screen.getByText('인기')).toBeInTheDocument();
    expect(screen.getByText('높은 가격순')).toBeInTheDocument();
    expect(screen.getByText('낮은 가격순')).toBeInTheDocument();
  });

  test('정식 경매 탭 클릭 시 호출 확인', () => {
    const ongoingTab = screen.getByText(/정식 경매/);
    expect(ongoingTab).toBeInTheDocument();

    fireEvent.click(ongoingTab);
    expect(mockUseProductList).toHaveBeenCalled();
  });

  test('사전 경매 탭 클릭 시 호출 확인', () => {
    const preAuctionTab = screen.getByText(/사전 경매/);
    expect(preAuctionTab).toBeInTheDocument();

    fireEvent.click(preAuctionTab);
    expect(mockUseProductList).toHaveBeenCalled();
  });
});