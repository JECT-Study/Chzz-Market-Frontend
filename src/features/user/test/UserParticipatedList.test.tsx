import { beforeEach, describe, test, vi } from "vitest";
import { useHistory } from "../model";
import { MemoryRouter, useLocation } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserParticipatedList } from "@/pages";
import userEvent from "@testing-library/user-event";

vi.mock('@/features/user/model', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useHistory: vi.fn(),
    OrderListTab: ({ setActiveTab }: any) => (
      <div>
        <button onClick={() => setActiveTab('AuctionHistory')}>참여중인 경매</button>
        <button onClick={() => setActiveTab('AuctionsWon')}>성공한 경매</button>
        <button onClick={() => setActiveTab('AuctionsLost')}>실패한 경매</button>
      </div>
    ),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe('참여한 경매 내역 페이지', () => {
  const mockUseHistory = useHistory as ReturnType<typeof vi.fn>;
  const mockUseLocation = useLocation as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseHistory.mockReturnValue({
      historyData: {
        pages: [
          {
            items: [
              {
                auctionId: 0,
                auctionName: '진행중 경매',
                imageUrl: 'ongoing.png',
                minPrice: 10000,
                isSeller: true,
                timeRemaining: 3600,
                status: 'PROCEEDING',
                participantCount: 5,
                createdAt: '2025-01-21T12:16:36.893Z',
              },
            ],
          },
        ],
      },
      wonData: {
        pages: [
          {
            items: [
              {
                auctionId: 1,
                auctionName: '성공한 경매',
                imageUrl: 'success.png',
                minPrice: 20000,
                isSeller: true,
                participantCount: 10,
                endDateTime: '2025-01-21T12:17:30.029Z',
                isOrdered: true,
                orderId: 1234,
              },
            ],
          },
        ],
      },
      lostData: {
        pages: [
          {
            items: [
              {
                auctionId: 2,
                auctionName: '실패한 경매',
                imageUrl: 'failed.png',
                minPrice: 15000,
                isSeller: true,
                participantCount: 8,
                endDateTime: '2025-01-21T12:18:03.714Z',
                bidAmount: 14000,
              },
            ],
          },
        ],
      },
      fetchNextHistoryPage: vi.fn(),
      fetchNextWonPage: vi.fn(),
      fetchNextLostPage: vi.fn(),
      hasNextHistoryPage: true,
      hasNextWonPage: true,
      hasNextLostPage: true,
      historyLoading: false,
      wonLoading: false,
      lostLoading: false,
    });

    mockUseLocation.mockReturnValue({
      state: { sortType: 'AuctionHistory' },
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <UserParticipatedList />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test('탭 렌더링 확인', () => {
    expect(screen.getByText(/참여중인 경매/)).toBeInTheDocument();
    expect(screen.getByText(/성공한 경매/)).toBeInTheDocument();
    expect(screen.getByText(/실패한 경매/)).toBeInTheDocument();
  });

  // 경매인원 수만 파악하여 데이터 렌더링 되는지 확인
  test('참여중인 경매 데이터 렌더링 확인', async () => {
    const ongoingTab = screen.getByText(/참여중인 경매/);
    await userEvent.click(ongoingTab);

    await waitFor(() => {
      const participantElement = screen.getByRole('img', { name: /참여자/ });
      expect(participantElement).toBeInTheDocument();
      expect(screen.getByText(/5 명/)).toBeInTheDocument();
    });
  });

  test('성공한 경매 데이터 렌더링 확인', async () => {
    const wonTab = screen.getByText(/성공한 경매/);
    await userEvent.click(wonTab);

    await waitFor(() => {
      const participantElement = screen.getByRole('img', { name: /참여자/ });
      expect(participantElement).toBeInTheDocument();
      expect(screen.getByText(/10 명/)).toBeInTheDocument();
    });
  });

  test('실패한 경매 데이터 렌더링 확인', async () => {
    const lostTab = screen.getByText(/실패한 경매/);
    await userEvent.click(lostTab);

    await waitFor(() => {
      const participantElement = screen.getByRole('img', { name: /참여자/ });
      expect(participantElement).toBeInTheDocument();
      expect(screen.getByText(/8 명/)).toBeInTheDocument();
    });
  });

})