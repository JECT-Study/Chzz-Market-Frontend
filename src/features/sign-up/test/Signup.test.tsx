import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { store } from '@/app/store';
import { Signup } from '@/pages/sign-up/ui/Signup';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

describe('Signup', () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <BrowserRouter>
            <Signup />
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    );
  });

  const setup = async (testId: string, value: string) => {
    const inputElement = screen.getByTestId(testId);
    await userEvent.type(inputElement, value);
    return inputElement;
  };

  test('닉네임 테스트', async () => {
    const nicknameInput = await setup('nickname-input', 'testNickname');
    expect(nicknameInput).toHaveValue('testNickname');
  });

  test('자기소개', async () => {
    const introductionInput = await setup(
      'bio-input',
      '안녕하세요, 테스트입니다.'
    );
    expect(introductionInput).toHaveValue('안녕하세요, 테스트입니다.');
  });

  // 필수 입력 사항 확인 및 버튼 활성화
  test('필수 입력 사항 확인 및 버튼 활성화', async () => {
    setup('nickname-input', 'testNickname');
    setup('bio-input', '안녕하세요, 테스트입니다.');

    // 비동기 작업 대기 및 텍스트 찾기
    const signupBtn = await screen.findByRole('button', {
      name: /회원 가입 완료/i
    });
    expect(signupBtn).toHaveClass('bg-cheeseYellow');
  });

  // 버튼 클릭 이전페이지 이동 테스트
  test('회원 가입 완료 버튼 클릭 시 이전 페이지로 이동', async () => {
    const navigate = vi.fn(); // 모의 함수 설정
    vi.mocked(mockedUseNavigate).mockReturnValue(navigate); // useNavigate를 모의로 반환

    const backBtn = screen.getByLabelText('뒤로 가기');
    expect(backBtn).toBeInTheDocument();

    await userEvent.click(backBtn);

    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/');
  });

  test('닉네임 중복 확인 버튼 클릭 테스트', async () => {
    const nicknameCheckButton = screen.getByText('중복확인');
    expect(nicknameCheckButton).toBeInTheDocument();

    await userEvent.click(nicknameCheckButton);
  });

  // 버튼 클릭 회원가입 이동 테스트
  test('회원가입 버튼', async () => {
    const navigate = vi.fn();
    const backBtn = screen.getByText('회원가입').closest('button');

    if (backBtn) {
      await userEvent.click(backBtn);
      expect(navigate).toHaveBeenCalledWith('/');
    }
  });
});
