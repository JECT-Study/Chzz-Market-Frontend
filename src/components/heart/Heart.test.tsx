import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Heart from '@/pages/Heart';
import { mockedUseNavigate } from '@/setupTests';
import { notificationData } from '@/mocks/data/notificationData';
import { preRegisterHeartData } from '@/mocks/data/preRegisterHeartData';
import userEvent from '@testing-library/user-event';
import { useGetNotifications } from '../notification/queries';
import { useDeletePreRegisterHeart, useGetPreRegisterHeart } from './queries';

vi.mock('@/components/heart/queries', () => ({
  useGetPreRegisterHeart: vi.fn(),
  useDeletePreRegisterHeart: vi.fn(),
}));

vi.mock('@/components/notification/queries', () => ({
  useGetNotifications: vi.fn(),
}));

vi.mocked(useGetNotifications).mockReturnValue({
  isLoading: false,
  notifications: notificationData,
});

vi.mocked(useGetPreRegisterHeart).mockReturnValue({
  isLoading: false,
  preRegisterHeartList: preRegisterHeartData,
});

const mutateMock = vi.fn();
vi.mocked(useDeletePreRegisterHeart).mockReturnValue({
  mutate: mutateMock,
});

describe('좋아요 페이지 테스트', () => {
  const setup = () => {
    const utils = render(<Heart />, { wrapper: BrowserRouter });
    const user = userEvent.setup();

    return {
      ...utils,
      user,
    };
  };

  test('뒤로 가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();
    const backBtnElement = screen.getByRole('button', {
      name: /뒤로 가기/,
    });
    await user.click(backBtnElement);
    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    });
  });

  test('좋아요 한 사전 경매 상품 목록이 화면에 렌더링된다.', async () => {
    const { user } = setup();
    const heartProducts = await screen.findAllByRole('figure', {
      name: /좋아요 한 사전 경매 상품/,
    });
    expect(heartProducts).toHaveLength(3);
  });

  test('항목을 클릭하면 상세 페이지로 이동한다.', async () => {
    const { user } = setup();
    const heartProducts = await screen.findAllByRole('figure', {
      name: /좋아요 한 사전 경매 상품/,
    });
    expect(heartProducts).toHaveLength(3);

    const firstProduct = heartProducts[0];
    await user.click(firstProduct);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/product/0');
  });

  test('좋아요 버튼을 클릭하면 항목이 삭제된다.', async () => {
    const { user } = setup();
    const buttons = await screen.findAllByRole('button', { name: /좋아요/ });

    const firstButton = buttons[0];
    await user.click(firstButton);

    expect(mutateMock).toHaveBeenCalledWith(0);
  });
});
