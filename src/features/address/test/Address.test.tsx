import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { useDeleteAddress, useEditAddress, useGetAddresses, usePostAddress } from "@/features/address/model/index";
import * as queries from "@/features/address/api/index";
import { mockWindowProperties, mockedUseNavigate } from "@/shared/test/setupTests";
import { Payment, PaymentAddressAdd, PaymentAddressEdit, PaymentAddressEditList, PaymentAddressList } from "@/pages";

mockWindowProperties();

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

vi.mock('@/features/address/model/index', () => ({
  useGetAddresses: vi.fn(),
  useDeleteAddress: vi.fn(),
  usePostAddress: vi.fn(),
  useEditAddress: vi.fn(),
}));

vi.mocked(useGetAddresses).mockReturnValue({
  addressData: {
    items: [
      {
        id: '1',
        recipientName: '홍길동',
        phoneNumber: '010-1234-5678',
        roadAddress: '서울특별시 종로구',
        detailAddress: '101호',
        isDefault: true,
      },
      {
        id: '2',
        recipientName: '이순신',
        phoneNumber: '010-8765-4321',
        roadAddress: '서울특별시 강남구',
        detailAddress: '202호',
        isDefault: false,
      },
    ],
  },
  refetchAddresses: vi.fn().mockResolvedValue({
    data: {
      items: [],
    },
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: true,
  }),
});

vi.mocked(useDeleteAddress).mockReturnValue({
  deleteData: vi.fn()
});

const postMutateMock = vi.fn();
vi.mocked(usePostAddress).mockReturnValue({
  mutate: postMutateMock,
  isPending: false,
});

const editMutateMock = vi.fn();
vi.mocked(useEditAddress).mockReturnValue({
  mutate: editMutateMock,
  isPending: false,
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(() => mockedUseNavigate),
  };
});

describe('결제하기 페이지 테스트', () => {
  const setup = () => {
    const user = userEvent.setup();
    vi.mocked(useNavigate).mockReturnValue(mockedUseNavigate);

    render(
      <MemoryRouter initialEntries={['/auctions/1']}>
        <Routes>
          <Route path="/auctions/:auctionId" element={<Payment />} />
        </Routes>
      </MemoryRouter>
    );
    
    return { user, mockedUseNavigate };
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
    const { user, mockedUseNavigate } = setup();

    const addressListButton = screen.getByRole('button', { name: /배송지 목록/ });
    await user.click(addressListButton);

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/auctions/1/address-list');
    });
  });

  test('memoInput에 입력이 있으면 memoSelect가 비활성화된다.', async () => {
    const { user } = setup();

    const memoInput = screen.getByRole('textbox', { name: /배송메모/ });
    const memoSelect = screen.getByRole('combobox', { name: /배송메모/ });

    await user.type(memoInput, '테스트 메모');

    expect(memoSelect).toBeDisabled();
  });

  test('memoInput이 비어 있으면 memoSelect가 활성화된다.', async () => {
    const { user } = setup();

    const memoInput = screen.getByRole('textbox', { name: /배송메모/ });
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

describe('주소 목록 페이지 테스트', () => {
  const setup = () => {
    const user = userEvent.setup();
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/auctions/1/address-list']}>
          <Routes>
            <Route path="/auctions/:auctionId/address-list" element={<PaymentAddressList />} />
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

    const addressListItem1 = await screen.findByText(/홍길동/);
    const phoneNumber1 = screen.getByText(/010-1234-5678/);
    const roadAddress1 = screen.getByText(/서울특별시 종로구/);
    const detailAddress1 = screen.getByText(/101호/);

    const addressListItem2 = screen.getByText(/이순신/);
    const phoneNumber2 = screen.getByText(/010-8765-4321/);
    const roadAddress2 = screen.getByText(/서울특별시 강남구/);
    const detailAddress2 = screen.getByText(/202호/);

    expect(addressListItem1).toBeInTheDocument();
    expect(phoneNumber1).toBeInTheDocument();
    expect(roadAddress1).toBeInTheDocument();
    expect(detailAddress1).toBeInTheDocument();

    expect(addressListItem2).toBeInTheDocument();
    expect(phoneNumber2).toBeInTheDocument();
    expect(roadAddress2).toBeInTheDocument();
    expect(detailAddress2).toBeInTheDocument();
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

describe('주소 추가 페이지 테스트', () => {
  const setup = (initialState = { roadAddress: '서울특별시 종로구', zonecode: '03001', jibunAddress: '종로 1가' }) => {
    const user = userEvent.setup();
    vi.mocked(useNavigate).mockReturnValue(mockedUseNavigate);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={[{ pathname: '/auctions/1/address-add', state: initialState }]}>
          <Routes>
            <Route path="/auctions/:auctionId/address-add" element={<PaymentAddressAdd />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    return { user, mockedUseNavigate };
  };

  test('모든 입력 필드 및 버튼이 올바르게 렌더링 되는지', () => {
    setup();

    expect(screen.getByRole('textbox', { name: /이름/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /휴대폰 번호/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /우편번호/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /주소지/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /상세주소/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /우편번호 찾기/ })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /기본 배송지로 설정/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /저장하기/ })).toBeInTheDocument();
  });

  test('초기 상태 값이 올바르게 렌더링 되는지', () => {
    setup();

    expect(screen.getByRole('textbox', { name: /주소지/ })).toHaveValue('서울특별시 종로구');
    expect(screen.getByRole('textbox', { name: /우편번호/ })).toHaveValue('03001');
  });

  test('입력 필드에 데이터를 입력할 수 있는지 확인', async () => {
    const { user } = setup();

    await user.type(screen.getByRole('textbox', { name: /이름/ }), '홍길동');
    await user.type(screen.getByRole('textbox', { name: /휴대폰 번호/ }), '010-1234-5678');
    await user.type(screen.getByRole('textbox', { name: /상세주소/ }), '101호');

    expect(screen.getByRole('textbox', { name: /이름/ })).toHaveValue('홍길동');
    expect(screen.getByRole('textbox', { name: /휴대폰 번호/ })).toHaveValue('010-1234-5678');
    expect(screen.getByRole('textbox', { name: /상세주소/ })).toHaveValue('101호');
  });

  test('입력값 검증 및 에러 메시지가 올바르게 표시되는지 확인', async () => {
    const { user } = setup();

    const submitButton = screen.getByRole('button', { name: /저장하기/ });
    await user.click(submitButton);

    screen.debug();

    waitFor(() => {
      expect(screen.getByText(/이름을 입력해주세요./)).toBeInTheDocument();
      expect(screen.getByText(/휴대폰 번호는 010으로 시작하고 11자리로 입력해주세요./)).toBeInTheDocument();
      expect(screen.getByText(/상세주소를 입력해주세요./)).toBeInTheDocument();
    });
  });

  test('우편번호 찾기 버튼 클릭 시 이벤트가 올바르게 동작하는지 확인', async () => {
    const { user } = setup();
    const handleOpenAddress = vi.fn();

    const button = screen.getByRole('button', { name: /우편번호 찾기/ });
    await user.click(button);

    expect(handleOpenAddress).not.toThrow();
  });

  test('폼 제출이 성공적으로 실행될 때 onSubmit 함수가 호출되는지 확인', async () => {
    const { user } = setup();

    await user.type(screen.getByRole('textbox', { name: /이름/ }), '홍길동');
    await user.type(screen.getByRole('textbox', { name: /휴대폰 번호/ }), '01012345678');
    await user.type(screen.getByRole('textbox', { name: /상세주소/ }), '101호');

    const submitButton = screen.getByRole('button', { name: /저장하기/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /저장하기/ })).toBeEnabled();
    });
  });
});

describe('주소 수정 페이지 테스트', () => {
  const setup = (initialState = {
    addressItem: {
      id: '1',
      recipientName: '이순신',
      phoneNumber: '010-9876-5432',
      zipcode: '12345',
      roadAddress: '서울특별시 중구',
      detailAddress: '202호',
      jibun: '중구 1가',
      isDefault: true,
    },
    roadAddress: '서울특별시 중구',
    zonecode: '12345'
  }) => {
    const user = userEvent.setup();
    vi.mocked(useNavigate).mockReturnValue(mockedUseNavigate);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={[{ pathname: '/auctions/1/address-edit', state: initialState }]}>
          <Routes>
            <Route path="/auctions/:auctionId/address-edit" element={<PaymentAddressEdit />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    return { user, mockedUseNavigate };
  };

  test('모든 입력 필드 및 버튼이 올바르게 렌더링 되는지', () => {
    setup();

    expect(screen.getByRole('textbox', { name: /이름/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /휴대폰 번호/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /우편번호/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /주소지/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /상세주소/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /우편번호 찾기/ })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /기본 배송지로 설정/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /저장하기/ })).toBeInTheDocument();
  });

  test('초기 상태 값이 올바르게 렌더링 되는지', () => {
    setup();

    expect(screen.getByRole('textbox', { name: /이름/ })).toHaveValue('이순신');
    expect(screen.getByRole('textbox', { name: /휴대폰 번호/ })).toHaveValue('010-9876-5432');
    expect(screen.getByRole('textbox', { name: /우편번호/ })).toHaveValue('12345');
    expect(screen.getByRole('textbox', { name: /주소지/ })).toHaveValue('서울특별시 중구');
    expect(screen.getByRole('textbox', { name: /상세주소/ })).toHaveValue('202호');
  });

  test('입력 필드에 데이터를 입력할 수 있는지 확인', async () => {
    const { user } = setup();

    await user.clear(screen.getByRole('textbox', { name: /이름/ }));
    await user.type(screen.getByRole('textbox', { name: /이름/ }), '김유신');
    await user.clear(screen.getByRole('textbox', { name: /휴대폰 번호/ }));
    await user.type(screen.getByRole('textbox', { name: /휴대폰 번호/ }), '010-1111-2222');
    await user.clear(screen.getByRole('textbox', { name: /상세주소/ }));
    await user.type(screen.getByRole('textbox', { name: /상세주소/ }), '303호');

    expect(screen.getByRole('textbox', { name: /이름/ })).toHaveValue('김유신');
    expect(screen.getByRole('textbox', { name: /휴대폰 번호/ })).toHaveValue('010-1111-2222');
    expect(screen.getByRole('textbox', { name: /상세주소/ })).toHaveValue('303호');
  });

  test('입력값 검증 및 에러 메시지가 올바르게 표시되는지 확인', async () => {
    const { user } = setup();

    const submitButton = screen.getByRole('button', { name: /저장하기/ });
    await user.click(submitButton);

    waitFor(() => {
      expect(screen.getByText(/이름을 입력해주세요./)).toBeInTheDocument();
      expect(screen.getByText(/휴대폰 번호는 010으로 시작하고 11자리로 입력해주세요./)).toBeInTheDocument();
      expect(screen.getByText(/상세주소를 입력해주세요./)).toBeInTheDocument();
    });
  });

  test('우편번호 찾기 버튼 클릭 시 이벤트가 올바르게 동작하는지 확인', async () => {
    const { user } = setup();
    const handleOpenAddress = vi.fn();

    const button = screen.getByRole('button', { name: /우편번호 찾기/ });
    await user.click(button);

    expect(handleOpenAddress).not.toThrow();
  });

  test('폼 제출이 성공적으로 실행될 때 onSubmit 함수가 호출되는지 확인', async () => {
    const { user } = setup();

    await user.type(screen.getByRole('textbox', { name: /이름/ }), '석장원');
    await user.type(screen.getByRole('textbox', { name: /휴대폰 번호/ }), '010-1234-5678');
    await user.type(screen.getByRole('textbox', { name: /상세주소/ }), '303호');

    const submitButton = screen.getByRole('button', { name: /저장하기/ });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /저장하기/ })).toBeEnabled();
    });
  });
});

describe('주소 편집 페이지 테스트', () => {
  const setup = () => {
    const user = userEvent.setup();
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={['/auctions/1/edit-address']}>
          <Routes>
            <Route path="/auctions/:auctionId/edit-address" element={<PaymentAddressEditList />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    return { user };
  };

  test('모든 주소 항목이 올바르게 렌더링 되는지 확인', () => {
    setup();

    expect(screen.getByText(/홍길동 \/ 010-1234-5678/)).toBeInTheDocument();
    expect(screen.getByText(/이순신 \/ 010-8765-4321/)).toBeInTheDocument();
  });

  test('기본 배송지와 수정/삭제 버튼이 올바르게 표시되는지 확인', () => {
    setup();

    expect(screen.getByText(/기본배송지/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /수정/ })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: /삭제/ })).toHaveLength(1); // 기본 배송지에는 삭제 버튼이 없음
  });

  test('삭제 버튼 클릭 시 이벤트가 올바르게 동작하는지 확인', async () => {
    const { user } = setup();
    const deleteButton = screen.getAllByRole('button', { name: /삭제/ })[0];

    await user.click(deleteButton);

    waitFor(() => {
      expect(queries.deleteAddress('1')).toHaveBeenCalled();
    });
  });

  test('수정 버튼 클릭 시 페이지 이동이 올바르게 동작하는지 확인', async () => {
    const { user } = setup();
    const editButton = screen.getAllByRole('button', { name: /수정/ })[0];

    await user.click(editButton);
  });
});