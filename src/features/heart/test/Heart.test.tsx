import { heartData, useDeleteHeart, useGetHeartList } from '@/features/heart';
import {
  notificationData,
  useGetNotificationList
} from '@/features/notification';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

import { LayoutWithNav } from '@/app/layout';
import { Heart } from '@/pages/heart/Heart';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';

vi.mock('@/features/heart/model', () => ({
  useGetHeartList: vi.fn(),
  useDeleteHeart: vi.fn()
}));

vi.mock('@/features/notification/model', () => ({
  useGetNotificationList: vi.fn()
}));

vi.mocked(useGetNotificationList).mockReturnValue({
  notificationList: notificationData
});

vi.mocked(useGetHeartList).mockReturnValue({
  heartList: heartData
});

const mutateMock = vi.fn();
vi.mocked(useDeleteHeart).mockReturnValue({
  mutate: mutateMock
});

describe('찜 목록 테스트', () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter initialEntries={['/notification']}>
        <Routes>
          <Route element={<LayoutWithNav />}>
            <Route path="/notification" element={<Heart />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    return {
      ...utils,
      user
    };
  };

  test('뒤로 가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const backBtnElement = screen.getByRole('button', {
      name: /뒤로 가기/
    });
    await user.click(backBtnElement);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  test('내가 찜 한 사전 경매 상품 목록이 화면에 렌더링된다.', async () => {
    setup();

    const heartProducts = await screen.findAllByRole('figure', {
      name: /내가 찜 한 사전 경매 상품/
    });
    expect(heartProducts).toHaveLength(1);
  });

  test('항목을 클릭하면 상세 페이지로 이동한다.', async () => {
    const { user } = setup();

    const heartProducts = await screen.findAllByRole('figure', {
      name: /내가 찜 한 사전 경매 상품/
    });
    await user.click(heartProducts[0]);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/auctions/pre-auction/11');
  });

  test('찜 목록에서 제외 버튼을 클릭하면 항목이 삭제된다.', async () => {
    const { user } = setup();
    const buttons = await screen.findAllByRole('button', {
      name: /찜 목록에서 제외/
    });

    const firstButton = buttons[0];
    await user.click(firstButton);

    expect(mutateMock).toHaveBeenCalledWith(11);
  });
});
