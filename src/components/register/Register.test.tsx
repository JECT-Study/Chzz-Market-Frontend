import { describe, expect, test } from 'vitest';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { mockedUseNavigate } from '@/setupTests';
import Register from '../../pages/Register';

/* jsdom이 지원하지 않는 메서드 hasPointerCapture, setPointerCapture, scrollIntoView를 모킹한다.
  테스트 중에 이러한 메서드가 호출될 때 발생하는 에러를 방지한다.
  각 메서드는 실제로 아무 동작도 하지 않는 빈 함수로 정의된다.

  beforeAll 블록은 파일 내의 모든 테스트가 실행되기 전에 한 번 실행된다. 따라서 beforeAll 블록 내에서 Element.prototype에 필요한 메서드를 모킹하면 해당 파일의 모든 테스트에서 모킹된 메서드를 사용할 수 있다.

  Object.defineProperty를 사용하면 객체의 프로퍼티를 정의하거나 수정할 수 있다. 이를 통해 Element.prototype에 새로운 메서드를 추가하거나 기존 메서드를 오버라이드할 수 있다. */

Object.defineProperty(Element.prototype, 'hasPointerCapture', {
  value: () => false,
  // 프로퍼티가 변경 가능한 지 여부
});
Object.defineProperty(Element.prototype, 'setPointerCapture', {
  value: () => {},
});
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: () => {},
});

const fillFormWithValidData = async (
  user: ReturnType<typeof userEvent.setup>,
) => {
  // 사진 등록
  const imageButton = screen.getByRole('button', {
    name: /사진 추가 박스 버튼/,
  });
  await user.click(imageButton);
  const file1 = new File(['image1'], 'image1.png', { type: 'image/png' });

  const imageInput = screen.getByRole('button', { name: /사진 업로드 인풋/ });
  await user.upload(imageInput, file1);

  // 제목 입력
  const titleInput = screen.getByLabelText(/제목/);
  await user.type(titleInput, '구구구');

  // 카테고리 선택
  const selectTrigger = screen.getByLabelText(/카테고리/);
  await user.click(selectTrigger);

  const selectOption = await screen.findByRole('option', {
    name: /전자기기/,
  });
  await user.click(selectOption);

  // 시작 가격 입력
  const costInput = screen.getByLabelText(/시작 가격/);
  await user.type(costInput, '1200');
};

describe('경매 등록.', () => {
  const setup = () => {
    const utils = render(<Register />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const enrollBtn = screen.getByRole('button', { name: '바로 등록하기' });
    const preButton = screen.getByRole('button', { name: '사전 등록하기' });
    const heading = screen.getByRole('heading', {
      name: /경매 등록하기/,
    });

    return {
      user,
      heading,
      preButton,
      enrollBtn,
      ...utils,
    };
  };

  test('뒤로 가기 버튼을 클릭하면 이전 페이지로 이동한다.', async () => {
    const { user } = setup();

    const backButtonElement = screen.getByRole('button', { name: /뒤로 가기/ });
    await user.click(backButtonElement);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith(-1);
    });
  });

  test('사진을 등록, 삭제할 수 있다.', async () => {
    const { user } = setup();

    // + 버튼 클릭하고 사진을 등록한다.
    const imageButton = screen.getByRole('button', {
      name: /사진 추가 박스 버튼/,
    });
    const file1 = new File(['image1'], 'image1.png', { type: 'image/png' });
    const file2 = new File(['image2'], 'image2.png', { type: 'image/png' });
    const imageInput = screen.getByRole('button', {
      name: /사진 업로드 인풋/,
    });

    await user.click(imageButton);
    await user.upload(imageInput, [file1, file2]);

    // 사진 개수만큼 사진이 나열된다.
    const registeredImages = screen.getAllByRole('img', {
      name: /상품 사진/,
    });
    expect(registeredImages).toHaveLength(2);

    // 사진 추가 박스 버튼에 등록된 사진 개수 표시된다.
    const currentImagesLength = screen.getByRole('paragraph', {
      name: /현재 사진 숫자/,
    });
    expect(currentImagesLength).toHaveTextContent('2');

    // 첫 번째 사진에 대표 마크 표시된다.
    // 이미지가 아니라 이미지 부모 요소에 속하는지 확인해야 한다.
    const mark = screen.getByText(/대표 사진/);
    await waitFor(() => {
      expect(registeredImages[0].parentElement).toContainElement(mark);
    });

    // 사진마다 x 버튼이 있다. 클릭하면 해당 이미지가 삭제된다.
    // 사진마다 버튼이 있기 때문에 버튼에 사진 index를 표시해야 한다.
    const deleteButton = screen.getByRole('button', { name: /사진 삭제 0/ });
    await user.click(deleteButton);

    await waitFor(() => {
      const updatedImages = screen.getAllByRole('img', { name: /상품 사진/ });
      const updatedMark = screen.getByText(/대표 사진/);
      expect(updatedImages[0].parentElement).toContainElement(updatedMark);
    });
  });

  test('사진을 드래그 앤 드랍하여 순서를 변경할 수 있다.', async () => {
    const { user } = setup();

    // + 버튼 클릭하고 2장의 사진을 등록한다.
    const imageButton = screen.getByRole('button', {
      name: /사진 추가 박스 버튼/,
    });
    await user.click(imageButton);

    const file1 = new File(['image1'], 'image1.png', { type: 'image/png' });
    const file2 = new File(['image2'], 'image2.png', { type: 'image/png' });
    const imageInput = screen.getByRole('button', {
      name: /사진 업로드 인풋/,
    });
    await user.upload(imageInput, [file1, file2]);

    // 사진 개수만큼 사진이 나열된다.
    const registeredImages = await screen.findAllByRole('img', {
      name: /상품 사진/,
    });
    expect(registeredImages).toHaveLength(2);

    // 드래그할 사진과 드롭할 사진을 찾는다.
    const draggableItem = registeredImages[1];
    const dropTarget = registeredImages[0];

    // 드롭할 사진에 대표 사진 마크가 있음을 확인한다.
    await waitFor(() => {
      const mark = screen.getByText(/대표 사진/);
      expect(dropTarget.parentElement).toContainElement(mark);
    });

    // 사진 드래그해서 특정 위치로 옮기면 그 사진과 위치가 교환된다.
    // 드래그 이벤트 시작
    fireEvent.dragStart(draggableItem);

    // 드롭 대상 인식
    fireEvent.dragEnter(dropTarget);

    // 드롭 대상 위에 있음
    fireEvent.dragOver(dropTarget);

    // 드롭
    fireEvent.drop(dropTarget);

    // 드래그 종료
    fireEvent.dragEnd(draggableItem);

    // 첫번째 사진과 교환하면 그 사진이 대표사진이 된다.
    await waitFor(() => {
      const updatedImages = screen.getAllByRole('img', { name: /상품 사진/ });
      const updatedMark = screen.getByText(/대표 사진/);
      expect(updatedImages[0].parentElement).toContainElement(updatedMark);
    });
  });

  test('카테고리가 총 8개 있고, 그 중에 하나를 선택할 수 있다.', async () => {
    const { user } = setup();

    const selectTrigger = screen.getByRole('combobox', {
      name: /카테고리/,
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

  test('필수 값을 모두 입력하고 사전 등록 버튼을 클릭하면 사전 등록 주의사항을 볼 수 있다.', async () => {
    const { user, preButton, heading } = setup();

    await fillFormWithValidData(user);

    await user.click(preButton);

    const titleElement = screen.getByRole('heading', {
      name: /사전 등록을 완료하시겠습니까/,
    });

    expect(heading).toHaveTextContent('주의사항');
    expect(titleElement).toBeInTheDocument();
  });

  test('필수 값을 모두 입력하고 바로 등록 버튼을 클릭하면 바로 등록 주의사항을 볼 수 있다.', async () => {
    const { user, enrollBtn, heading } = setup();

    await fillFormWithValidData(user);

    await user.click(enrollBtn);

    const titleElement = screen.getByRole('heading', {
      name: /경매 등록을 완료하시겠습니까/,
    });

    expect(heading).toHaveTextContent('주의사항');
    expect(titleElement).toBeInTheDocument();
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
      ...utils,
    };
  };

  describe('사진 유효성 검사.', () => {
    test('사진은 최소 1장 이상 등록해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      // 사진이 없을 때
      await user.click(enrollBtn);
      const errorMessage =
        screen.getByText(/사진은 최소 1장 이상 등록해 주세요/);
      expect(errorMessage).toBeInTheDocument();
    });

    test('사진은 최대 5장 이하로 등록해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const imageButton = screen.getByRole('button', {
        name: /사진 추가 박스 버튼/,
      });
      await user.click(imageButton);

      const files = Array.from(
        { length: 6 },
        (_, idx) =>
          new File([`image[${idx}]`], `image${idx}.png`, { type: 'image/png' }),
      );
      const imageInput = screen.getByRole('button', {
        name: /사진 업로드 인풋/,
      });
      await user.upload(imageInput, files);

      // 사진 개수만큼 사진이 나열된다.
      const registeredImages = await screen.findAllByRole('img', {
        name: /상품 사진/,
      });
      expect(registeredImages).toHaveLength(6);

      await user.click(enrollBtn);

      await waitFor(() => {
        const errorMessage = screen.getByText(
          /사진은 최대 5장 이하로 등록해 주세요/,
        );
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('제목 유효성 검사', () => {
    // 공백 제외 최소 2글자, 최대 30글자
    test('제목은 최소 2자 이상 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const titleInput = screen.getByLabelText(/제목/);
      await user.type(titleInput, '구');

      await user.click(enrollBtn);

      const errorMessage = screen.getByText(/제목은 최소 2자 이상 입력/);
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

      const errorMessage = screen.getByText(/최소 1000원 이상 입력해 주세요/);
      await waitFor(() => {
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe('상품 설명 유효성 검사', () => {
    test('상품 설명은 최소 5자 이상 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const descriptionInput = screen.getByLabelText(/상품 설명/);
      await user.type(descriptionInput, '설명');

      await user.click(enrollBtn);

      const errorMessage = screen.getByText(
        /상품 설명은 최소 5자 이상 입력해 주세요/,
      );
      expect(errorMessage).toBeInTheDocument();
    });

    test('상품 설명은 최대 1,000자 이하로 입력해야 한다.', async () => {
      const { user, enrollBtn } = setup();

      const descriptionInput = screen.getByLabelText(/상품 설명/);
      await user.type(descriptionInput, '구구'.repeat(502));

      await user.click(enrollBtn);

      await waitFor(() => {
        const errorMessage = screen.getByText(
          /상품 설명은 최대 1000자 이하로 입력해 주세요/,
        );
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});

describe('주의사항.', () => {
  const setup = () => {
    const utils = render(<Register />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const preButton = screen.getByRole('button', { name: /사전 등록하기/ });
    const enrollBtn = screen.getByRole('button', { name: /바로 등록하기/ });
    const heading = screen.getByRole('heading', {
      name: /경매 등록하기/,
    });

    return {
      user,
      heading,
      preButton,
      enrollBtn,
      ...utils,
    };
  };

  test('뒤로 가기 버튼을 클릭하면 경매 등록 컴포넌트로 이동한다.', async () => {
    const { user, preButton, heading } = setup();

    await fillFormWithValidData(user);

    // 주의사항 이동 트리거.
    await user.click(preButton);

    // 뒤로 가기 버튼 클릭
    const backButtonElement = screen.getByRole('button', {
      name: /뒤로 가기/,
    });
    await user.click(backButtonElement);

    // 경매 등록 페이지 확인
    await waitFor(() => {
      expect(heading).toHaveTextContent(/경매 등록하기/);
    });
  });

  test('사전 등록 버튼 클릭 후, 주의사항 체크하면 사전 등록이 가능하다.', async () => {
    const { user, preButton } = setup();

    await fillFormWithValidData(user);

    // 주의사항 트리거
    await user.click(preButton);

    const checkboxSpan = screen.getByRole('checkbox', {
      name: '주의사항 체크박스',
    });
    expect(checkboxSpan).not.toBeChecked();

    await user.click(checkboxSpan);

    const button = screen.getByRole('button', {
      name: '사전 등록하기',
    });
    expect(checkboxSpan).toBeChecked();
    expect(button).toBeEnabled();
  });

  test('바로 등록 버튼 클릭 후, 주의사항 체크하면 바로 등록이 가능하다.', async () => {
    const { user, enrollBtn } = setup();

    await fillFormWithValidData(user);

    // 주의사항 트리거
    await user.click(enrollBtn);

    const checkboxSpan = screen.getByRole('checkbox', {
      name: '주의사항 체크박스',
    });
    expect(checkboxSpan).not.toBeChecked();

    await user.click(checkboxSpan);

    const button = screen.getByRole('button', {
      name: '바로 등록하기',
    });
    expect(checkboxSpan).toBeChecked();
    expect(button).toBeEnabled();
  });
});
