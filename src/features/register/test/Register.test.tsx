import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { usePatchPreAuction } from '@/features/edit-auction';
import { Register } from '@/pages/register/Register';
import { mockedUseNavigate } from '@/shared/api/msw/setupTests';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { usePostAuction } from '..';

vi.mock('@/features/register/model');
vi.mock('@/features/edit-auction/model');
vi.mocked(usePostAuction).mockReturnValue({
  mutate: vi.fn(),
  isPending: false
});
vi.mocked(usePatchPreAuction).mockReturnValue({
  mutate: vi.fn(),
  isPending: false
});

describe('경매 등록.', () => {
  const setup = () => {
    const utils = render(<Register />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const enrollBtn = screen.getByRole('button', { name: '바로 등록하기' });
    const preButton = screen.getByRole('button', { name: '사전 등록하기' });
    const heading = screen.getByRole('heading', {
      name: /경매 등록하기/
    });

    return {
      user,
      heading,
      preButton,
      enrollBtn,
      ...utils
    };
  };

  test('뒤로 가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const backButtonElement = screen.getByRole('button', { name: /뒤로 가기/ });
    await user.click(backButtonElement);

    expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
  });

  test('카테고리가 총 8개 있고, 그 중에 하나를 선택할 수 있다.', async () => {
    const { user } = setup();

    const selectTrigger = screen.getByRole('combobox', {
      name: /카테고리/
    });

    // 카테고리 선택
    await user.click(selectTrigger);

    // 총 8개
    const selectOption = await screen.findAllByRole('option');
    expect(selectOption).toHaveLength(8);

    const firstOption = selectOption[0];
    await user.click(firstOption);

    await waitFor(() => {
      expect(selectTrigger).toHaveTextContent('전자기기');
    });
  });

  test('시작 가격을 입력하고 난 후, focus를 벗어날 시 가격을 천 단위로 나눈다.', async () => {
    const { user } = setup();

    const costInput = screen.getByLabelText(/시작 가격/);
    await user.type(costInput, '200000');

    // focus 벗어남
    act(() => costInput.blur());
    await waitFor(() => {
      expect(costInput).toHaveDisplayValue('200,000 원');
    });

    // 다시 focus
    act(() => costInput.focus());

    await waitFor(() => {
      expect(costInput).toHaveDisplayValue('200000');
    });
  });

  test('필수 값을 입력하지 않은 경우, 등록 버튼 클릭 시 에러 문구가 화면에 나타난다.', async () => {
    const { user, enrollBtn } = setup();

    const titleInput = screen.getByLabelText(/제목/);
    await user.type(titleInput, '구구구');

    const costInput = screen.getByLabelText(/시작 가격/);
    await user.type(costInput, '1200');

    await user.click(enrollBtn);

    const categoryErrorMessage = screen.getByText(/카테고리를 선택해 주세요/);
    const imageErrorMessage =
      screen.getByText(/사진은 최소 1장 이상 등록해 주세요/);

    expect(categoryErrorMessage).toBeInTheDocument();
    expect(imageErrorMessage).toBeInTheDocument();
  });
});

describe('유효성 검사.', () => {
  const setup = () => {
    const utils = render(<Register />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const enrollBtn = screen.getByRole('button', { name: '바로 등록하기' });

    return {
      user,
      enrollBtn,
      ...utils
    };
  };

  describe('제목 유효성 검사', () => {
    test('제목은 2자 이상 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const titleInput = screen.getByLabelText(/제목/);
      await user.type(titleInput, '구');

      await user.click(enrollBtn);

      const errorMessage = screen.getByText(
        /제목은 공백을 제외하고 2자 이상 입력/
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test('제목은 최대 30자 이하로 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const titleInput = screen.getByLabelText(/제목/);
      await user.type(titleInput, '구'.repeat(31));

      await user.click(enrollBtn);
      const errorMessage = screen.getByText(/제목은 최대 30자 이하로 입력/);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('시작 가격 유효성 검사', () => {
    test('시작 가격은 최소 1000원 이상 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const costInput = screen.getByLabelText(/시작 가격/);
      await user.type(costInput, '500');

      await user.click(enrollBtn);

      const errorMessage = screen.getByText(/최소 1000원 이상/);
      await waitFor(() => {
        expect(errorMessage).toBeInTheDocument();
      });
    });
    test('시작 가격은 최대 2,000,000 원 이하로 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const costInput = screen.getByLabelText(/시작 가격/);
      await user.type(costInput, '3000000');

      await user.click(enrollBtn);

      const errorMessage = screen.getByText(/2,000,000원 이하로 입력/);
      await waitFor(() => {
        expect(errorMessage).toBeInTheDocument();
      });
    });
    test('시작 가격은 1000원 단위로 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const costInput = screen.getByLabelText(/시작 가격/);
      await user.type(costInput, '1200');

      await user.click(enrollBtn);

      const errorMessage = screen.getByText(/1000원 단위로 입력/);
      await waitFor(() => {
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('상품 설명 유효성 검사', () => {
    test('상품 설명은 최대 1,000자 이하로 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const descriptionInput = screen.getByLabelText(/상품 설명/);
      await user.type(descriptionInput, '구구'.repeat(502));

      await user.click(enrollBtn);

      await waitFor(() => {
        const errorMessage = screen.getByText(
          /상품 설명은 최대 1000자 이하로 입력/
        );
        expect(errorMessage).toBeInTheDocument();
      });
    });
    test('상품 설명은 줄바꿈을 10개 이하로 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const descriptionInput = screen.getByLabelText(/상품 설명/);
      await user.type(descriptionInput, '\n'.repeat(11));

      await user.click(enrollBtn);

      await waitFor(() => {
        const errorMessage = screen.getByText(
          /상품 설명은 줄바꿈을 10개 이하로 입력/
        );
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
