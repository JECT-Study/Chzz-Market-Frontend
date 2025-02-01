import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { store } from '@/app/store';
import { UserProfileEdit } from '@/pages/user';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@/features/profile/hooks/useProfileNicknameValidate', () => ({
  useProfileNicknameValidate: () => ({
    checkNicknameAvailability: vi.fn()
  })
}));

vi.mock('@/features/profile/api', () => ({
  getProfileImageURL: vi.fn(() => ({ objectKey: 'Key', uploadUrl: 'Url' }))
}));

vi.mock('@/features/profile/model', () => ({
  uploadProfileImageToS3: vi.fn()
}));

describe('UserProfileEdit', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <UserProfileEdit />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    );
  });

  const setup = async (testId: string, value: string) => {
    const inputElement = screen.getByPlaceholderText(testId);
    await userEvent.type(inputElement, value);
    return inputElement;
  };

  test('닉네임 입력 테스트', async () => {
    const nicknameInput = await setup(
      '닉네임을 입력해주세요 (공백 제외 15글자 이내)',
      'testNickname'
    );
    expect(nicknameInput).toHaveValue('testNickname');
  });

  test('자기소개 입력 테스트', async () => {
    const bioInput = await setup(
      '자기소개를 입력해주세요',
      '안녕하세요! 자기소개 테스트입니다.'
    );
    expect(bioInput).toHaveValue('안녕하세요! 자기소개 테스트입니다.');
  });

  test('프로필 수정 완료 버튼 활성화 테스트', async () => {
    setup('닉네임을 입력해주세요 (공백 제외 15글자 이내)', 'testNickname');
    setup('자기소개를 입력해주세요', '안녕하세요! 자기소개 테스트입니다.');

    const submitBtn = await screen.findByRole('button', {
      name: /프로필 수정 완료/i
    });
    expect(submitBtn).toHaveClass('bg-cheeseYellow');
  });

  test('닉네임 중복 확인 버튼 클릭 테스트', async () => {
    const nicknameCheckButton = screen.getByText('중복확인');
    expect(nicknameCheckButton).toBeInTheDocument();

    await userEvent.click(nicknameCheckButton);
  });

  test('프로필 수정 완료 버튼 클릭 테스트', async () => {
    const submitBtn = await screen.findByRole('button', {
      name: /프로필 수정 완료/i
    });
    expect(submitBtn).toBeInTheDocument();

    await userEvent.click(submitBtn);
  });
});
