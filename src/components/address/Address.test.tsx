import AuctionShipping from "@/pages/AuctionShipping";
import DeliveryAddressList from "@/pages/DeliveryAddressList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";

// scrollIntoView 메서드가 jsdom에 지원되지 않아서 오류 발생
Object.defineProperty(Element.prototype, 'hasPointerCapture', {
  value: () => false,
});

Object.defineProperty(Element.prototype, 'setPointerCapture', {
  value: () => {},
});

Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: () => {},
})

// mock으로 사용할 훅, API 호출 정의
vi.mock('@/hooks/usePayment', () => ({
  usePostOrderId: () => ({
    createId: vi.fn(),
    orderId: '123',
    isPending: false,
  }),
  usePostPayment: () => ({
    auctionData: { productName: '테스트 상품', imageUrl: 'test.jpg', winningAmount: 30000 },
    DefaultAddressData: {
      items: [
        {
          id: '1',
          recipientName: '홍길동',
          phoneNumber: '010-1234-5678',
          zipcode: '12345',
          roadAddress: '서울특별시 종로구',
          jibun: '종로 1가',
          detailAddress: '101호',
          isDefault: true,
        },
      ],
    },
    postPayment: vi.fn(),
  }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

describe('AuctionShipping Component', () => {
  const setup = () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter initialEntries={['/auctions/1']}>
        <Routes>
          <Route path="/auctions/:auctionId" element={<AuctionShipping />} />
        </Routes>
      </MemoryRouter>
    );
    
    return { user, mockNavigate };
  };
  test('페이지가 로드되면 기본 상품 정보가 렌더링된다.', async () => {
    setup();

    const productName = screen.getByText(/테스트 상품/);
    const productPrice = screen.getByText(/30,000\s*원/)
    const recipientName = screen.getByText(/홍길동/);

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
    expect(recipientName).toBeInTheDocument();
  });

  test('기존 주소가 있으면 기존 주소 정보를 렌더링한다.', async () => {
    setup();

    const addressInfo = screen.getByText(/서울특별시 종로구/);
    const phoneInfo = screen.getByText(/010-1234-5678/);
    const detailInfo = screen.getByText(/101호/);

    expect(addressInfo).toBeInTheDocument();
    expect(phoneInfo).toBeInTheDocument();
    expect(detailInfo).toBeInTheDocument();
  });

  test('배송지 목록 버튼 클릭 시 주소 목록 페이지로 이동한다.', async () => {
    const { user, mockNavigate } = setup();

    const addressListButton = screen.getByRole('button', { name: /배송지 목록/ });
    await user.click(addressListButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/auctions/1/address-list');
    });
  });

  test('memoInput에 입력이 있으면 memoSelect가 비활성화된다.', async () => {
    const { user } = setup();

    const memoInput = screen.getByPlaceholderText(/배송 메모를 입력해주세요/);
    const memoSelect = screen.getByRole('combobox', { name: /배송메모/ });

    await user.type(memoInput, '테스트 메모');

    expect(memoSelect).toBeDisabled();
  });

  test('memoInput이 비어 있으면 memoSelect가 활성화된다.', async () => {
    const { user } = setup();

    const memoInput = screen.getByPlaceholderText(/배송 메모를 입력해주세요/);
    const memoSelect = screen.getByRole('combobox', { name: /배송메모/ });

    await user.clear(memoInput);

    expect(memoSelect).not.toBeDisabled();
  });

  test('isPending 값이 false이고 address 값이 유효하면 결제 버튼이 활성화된다.', async () => {
    setup();

    const submitButton = screen.getByRole('button', { name: /결제하기/ });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    })
    screen.debug();
  });

  test('isPending 값이 true 이거나 address 값이 없으면 결제 버튼이 비활성화된다.', async () => {
    setup();

    const submitButton = screen.getByRole('button', { name: /결제하기/ });

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });
  });

  test('필수 입력이 모두 완료되면 결제 버튼이 활성화된다.', async () => {
    const { user } = setup();

    const submitButton = screen.getByRole('button', { name: /결제하기/ });
    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    await user.click(submitButton);
  })
});

describe('DeliveryAddressList Page', () => {
  const setup = () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/auctions/1/address-list']}>
          <Routes>
            <Route path="/auctions/:auctionId/address-list" element={<DeliveryAddressList />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    
    return { user, mockNavigate };
  };

  test('왼쪽 < 버튼 클릭 시 navigate(-1) 호출', async () => {
    const { user } = setup();
    screen.debug();
    const backButton = screen.getByAltText('뒤로가기 아이콘');
    expect(backButton).toBeInTheDocument();

    await user.click(backButton);
  });

  test('오른쪽 "편집" 버튼 클릭 시 편집 페이지로 이동', async () => {
    const { user, mockNavigate } = setup();
    const editButton = screen.getByText('편집');

    await user.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/edit'));
  });

  test('배송지 추가 input 클릭 시 Daum 주소 검색 창 열리고 배송지 추가 페이지로 이동', async () => {
    const { user, mockNavigate } = setup();
    const searchInput = screen.getByPlaceholderText(/지번, 도로명, 건물명으로 검색/);

    const mockOpen = vi.fn();
    window.daum = {
      Postcode: vi.fn().mockImplementation(() => ({
        open: mockOpen,
      })),
    };

    await user.click(searchInput);

    expect(window.daum.Postcode).toHaveBeenCalled();
    expect(mockOpen).toHaveBeenCalled();

    window.daum.Postcode.mock.calls[0][0].onComplete({ address: '서울특별시 종로구', zonecode: '03001' });

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringMatching(/\/auctions\/1\/address-add/),
      {
        state: {
          roadAddress: '서울특별시 종로구',
          zonecode: '03001',
          jibunAddress: undefined, // 또는 예상되는 값을 설정
        },
      }
    );
  });

  test('주소가 있을 때 리스트에 렌더링', async () => {
    setup();
    
  });

  test('배송지 선택 완료 버튼 클릭 시 navigate 호출', async () => {
    const { user, mockNavigate } = setup();
    const selectButton = screen.getByRole('button', { name: /배송지 선택 완료/ });

    await user.click(selectButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/auctions/1'), {
        state: expect.objectContaining({
          address: expect.any(Object),
        }),
        replace: true,
      });
    });
  });
});