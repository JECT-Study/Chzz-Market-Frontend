import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

import { LayoutWithNav } from '@/app/layout/ui/LayoutWithNav';
import { Notification } from '@/pages/notification/Notification';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { NOTIFICATION_CONTENTS } from '../config/constants';
import { useDeleteNotification } from '../model/useDeleteNotification';
import { useGetNotificationList, useGetNotificationListWithSuspense } from '../model/useGetNotificationList';
import { useReadNotification } from '../model/useReadNotification';
import { notificationData } from './data';
;

vi.mock('@/features/notification/model/useGetNotificationListWithSuspense');
vi.mock('@/features/notification/model/useGetNotificationList');
vi.mock('@/features/notification/model/useReadNotification');
vi.mock('@/features/notification/model/useDeleteNotification');

vi.mocked(useGetNotificationList).mockReturnValue({
  notificationList: notificationData
});
vi.mocked(useGetNotificationListWithSuspense).mockReturnValue({
  notificationList: notificationData
});

const mutateReadMock = vi.fn();
vi.mocked(useReadNotification).mockReturnValue({
  mutate: mutateReadMock
});

const mutateDeleteMock = vi.fn();
vi.mocked(useDeleteNotification).mockReturnValue({
  mutate: mutateDeleteMock
});

describe('알림 테스트', () => {
  const setup = () => {
    const utils = render(
      <MemoryRouter initialEntries={['/notification']}>
        <Routes>
          <Route element={<LayoutWithNav />}>
            <Route path="/notification" element={<Notification />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const user = userEvent.setup();

    return {
      user,
      ...utils
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

  test('알림에는 제목, 사진, 시간이 표시되어야 하며, 읽지 않은 알림은 배경색으로 구분한다.', async () => {
    setup();

    const notifications = await screen.findAllByRole('listitem', {
      name: /알림/
    });

    expect(notifications).toHaveLength(6);
    const firstItem = notifications[0];

    const title = screen.getAllByRole('heading', { name: /제목/ })[0];
    const image = screen.getAllByRole('img', { name: /이미지/ })[0];
    const time = screen.getAllByLabelText(/시간/)[0];

    expect(firstItem).not.toHaveClass('bg-notificationBgColor');
    expect(firstItem).toContainElement(title);
    expect(firstItem).toContainElement(image);
    expect(firstItem).toContainElement(time);
  });

  test('읽지 않은 알림을 클릭하면 읽음 표시한다.', async () => {
    const { user } = setup();

    const notifications = await screen.findAllByRole('listitem', {
      name: /알림/
    });

    const unreadNotifications = notifications.reduce(
      (acc, cur) =>
        cur.classList.contains('bg-notificationBgColor') ? acc + 1 : acc,
      0
    );
    expect(unreadNotifications).toBe(1);

    await user.click(notifications[2]);
    expect(mutateReadMock).toHaveBeenCalledWith(2)
  });

  test('알림 클릭하면 알림 세부 정보를 볼 수 있는 페이지로 이동한다.', async () => {
    const { user } = setup();

    const notifications = await screen.findAllByRole('listitem', {
      name: /알림/
    });
    await user.click(notifications[0]);

    expect(mockedUseNavigate).toHaveBeenCalledWith(
      `${NOTIFICATION_CONTENTS[notificationData[0].type].link!(notificationData[0].auctionId!)}`
    );
  });

  test('알림을 삭제할 수 있다.', async () => {
    const { user } = setup();

    const button = screen.getByRole('button', { name: /버튼_0/ });
    await user.click(button);

    expect(mutateDeleteMock).toHaveBeenCalledWith(0);
  });
});
