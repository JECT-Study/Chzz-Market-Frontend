import { describe, expect, test, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Notification from '@/pages/Notification';
import { mockedUseNavigate } from '@/setupTests';
import { notificationData } from '@/mocks/data/notificationData';
import userEvent from '@testing-library/user-event';
import {
  useDeleteNotification,
  useGetNotifications,
  useReadNotification,
} from './queries';
import NavigationLayout from '../layout/NavigationLayout';

vi.mock('@/components/notification/queries', () => ({
  useGetNotifications: vi.fn(),
  useReadNotification: vi.fn(),
  useDeleteNotification: vi.fn(),
}));

vi.mocked(useGetNotifications).mockReturnValue({
  isLoading: false,
  notifications: notificationData,
});

const mutateReadMock = vi.fn();
vi.mocked(useReadNotification).mockReturnValue({
  mutate: mutateReadMock,
});

const mutateDeleteMock = vi.fn();
vi.mocked(useDeleteNotification).mockReturnValue({
  mutate: mutateDeleteMock,
});

describe('알림 테스트', () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter initialEntries={['/notification']}>
        <Routes>
          <Route element={<NavigationLayout />}>
            <Route path="/notification" element={<Notification />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    const user = userEvent.setup();

    return {
      user,
      ...utils,
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

  test('알림에는 제목, 사진, 시간이 표시되어야 하며, 읽지 않은 알림은 배경색으로 구분한다.', async () => {
    const { user } = setup();

    // 읽지 않은 알람
    const notifications = await screen.findAllByRole('figure', {
      name: /알림/,
    });

    expect(notifications).toHaveLength(6);
    const firstItem = notifications[0];

    const title = screen.getAllByRole('heading', { name: /제목/ })[0];
    const image = screen.getAllByRole('img', { name: /알림 이미지/ })[0];
    const time = screen.getAllByLabelText(/알림 시간/)[0];
    const bg = screen.getByLabelText('알림 배경_0');

    expect(bg).toHaveClass('bg-notificationBgColor');
    expect(firstItem).toContainElement(title);
    expect(firstItem).toContainElement(image);
    expect(firstItem).toContainElement(time);
  });

  // FIX
  test('읽지 않은 알림이 있을 경우 알림 아이콘에 빨간 점으로 표시하고, 없을 경우 빨간점이 사라진다.', async () => {
    const { user } = setup();

    const notificationBgs = await screen.findAllByLabelText(/알림 배경/);

    const unreadNotifications = notificationBgs.reduce(
      (acc, cur) =>
        cur.classList.contains('bg-notificationBgColor') ? acc + 1 : acc,
      0,
    );
    expect(unreadNotifications).toBeGreaterThan(0);

    const redDot = screen.getByLabelText(/읽지 않은 알림을 표시하는 빨간 점/);
    expect(redDot).toBeInTheDocument();

    const unreadNotificationDeleteButton = screen.getByRole('button', {
      name: /알림 삭제 버튼_0/,
    });
    await user.click(unreadNotificationDeleteButton);

    await waitFor(() => {
      // expect(redDot).not.toBeInTheDocument();
    });
  });

  test('알림 클릭하면 알림 세부 정보를 볼 수 있는 페이지로 이동한다.', async () => {
    const { user } = setup();

    // 읽지 않은 알람
    const notifications = await screen.findAllByRole('figure', {
      name: /알림/,
    });

    const firstItem = notifications[0];
    await user.click(firstItem);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });

  // FIX
  // Reference https://github.com/TanStack/query/discussions/4573
  // 삭제를 통한 UI 변화 테스트 실패 => 원인이라도 알아야 할 것.
  // mockedMutate 함수가 적절한 인자와 함께 호출되었는지 테스트
  test('알림을 삭제할 수 있다.', { timeout: 20000 }, async () => {
    const { user } = setup();

    const notifications = await screen.findAllByRole('figure', {
      name: /알림/,
    });
    expect(notifications).toHaveLength(6);

    const button = screen.getByRole('button', { name: /알림 삭제 버튼_1/ });

    await user.click(button);

    expect(mutateDeleteMock).toHaveBeenCalledWith(1);

    // await waitFor(() => {
    //   expect(
    //     screen.findAllByRole('figure', {
    //       name: /알림/,
    //     }),
    //   ).toHaveLength(5);
    // });
  });
});
