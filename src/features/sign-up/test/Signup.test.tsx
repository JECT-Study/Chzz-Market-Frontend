import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { Signup } from '@/pages/sign-up/ui/Signup';
import { BrowserRouter } from 'react-router-dom';

describe.skip('Signup', () => {
  const setup = (placeholder: string, value: string) => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
    const inputElement = screen.getByPlaceholderText(placeholder);
    fireEvent.change(inputElement, { target: { value } });
    return inputElement;
  };

  test('닉네임 테스트', () => {
    const nicknameInput = setup(
      '닉네임을 입력해주세요 (공백 제외 15글자 이내)',
      'testNickname',
    );
    expect(nicknameInput).toHaveValue('testNickname');
  });

  test('자기소개', () => {
    const introductionInput = setup(
      '간단한 자기 소개를 입력해주세요.',
      '안녕하세요, 테스트입니다.',
    );
    expect(introductionInput).toHaveValue('안녕하세요, 테스트입니다.');
  });

  // 필수 입력 사항 확인 및 버튼 활성화
  test.skip('필수 입력 사항 확인 및 버튼 활성화', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

    await setup(
      '닉네임을 입력해주세요 (공백 제외 15글자 이내)',
      'testNickname',
    );
    await setup('지역을 입력해주세요.', '서울');
    await setup(
      '간단한 자기 소개를 입력해주세요.',
      '안녕하세요, 테스트입니다.',
    );

    const signupBtn = screen.getByText('회원 가입 완료');
    expect(signupBtn).toHaveClass('bg-cheeseYellow');
  });

  // 버튼 클릭 이전페이지 이동 테스트
  test.skip('회원 가입 완료 버튼 클릭 시 이전 페이지로 이동', () => {
    const navigate = vi.fn();

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

    const backBtn = screen.getByLabelText('뒤로 가기');
    fireEvent.click(backBtn);

    expect(navigate).toHaveBeenCalledWith('/');
  });

  // 버튼 클릭 회원가입 이동 테스트
  test.skip('회원가입 버튼', () => {
    const navigate = vi.fn();
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );

    // const backBtn = screen.getByText('회원가입').closest('button');
    // fireEvent.click(backBtn);

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
