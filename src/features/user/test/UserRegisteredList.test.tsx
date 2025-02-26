import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { UserRegisteredList } from '@/pages/user/ui/UserRegisteredList';
import userEvent from '@testing-library/user-event';
import { useMyAuctionList } from '../model';

vi.mock('@/features/user/model', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>;
  return {
    ...actual,
    useMyAuctionList: vi.fn(),
    UserOrderTab: ({ setActiveTab }: any) => (
      <div>
        <button onClick={() => setActiveTab('ongoing')}>진행중인 경매</button>
        <button onClick={() => setActiveTab('end')}>종료된 경매</button>
      </div>
    )
  };
});

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useLocation: vi.fn()
  };
});

describe('내가 등록한 경매 내역 페이지', () => {
  const mockUseMyAuctionList = useMyAuctionList as ReturnType<typeof vi.fn>;
  const mockUseLocation = useLocation as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseMyAuctionList.mockReturnValue({
      ongoingData: {
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
                participantCount: 5,
                createdAt: '2025-01-21T12:16:36.893Z'
              }
            ]
          }
        ]
      },
      endData: {
        pages: [
          {
            items: [
              {
                auctionId: 1,
                auctionName: '종료된 경매',
                imageUrl: 'end.png',
                minPrice: 20000,
                isSeller: true,
                participantCount: 10,
                endDateTime: '2025-01-21T12:17:30.029Z'
              }
            ]
          }
        ]
      },
      fetchNextOngoingPage: vi.fn(),
      fetchNextEndPage: vi.fn(),
      hasNextOngoingPage: true,
      hasNextEndPage: true
    });

    mockUseLocation.mockReturnValue({
      state: { sortType: 'ongoing' }
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <UserRegisteredList />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test('탭 렌더링 확인', () => {
    expect(screen.getByText(/진행중인 경매/)).toBeInTheDocument();
    expect(screen.getByText(/종료된 경매/)).toBeInTheDocument();
  });

  test('진행중 경매 데이터 렌더링 확인', async () => {
    const ongoingTab = screen.getByText(/진행중인 경매/);
    await userEvent.click(ongoingTab);

    await waitFor(() => {
      const participantElement = screen.getByRole('img', { name: /참여자/ });
      expect(participantElement).toBeInTheDocument();
      expect(screen.getByText(/5 명/)).toBeInTheDocument();
    });
  });
});
