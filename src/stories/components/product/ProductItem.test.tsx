import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { mockWindowProperties } from '@/shared/api/msw/setupTests';
import { ProductItem } from '@/shared/ui/ProductItem';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

mockWindowProperties();

const mockProduct = {
  id: 1,
  auctionName: '테스트 상품',
  minPrice: 30000,
  timeRemaining: 3600,
  likeCount: 10,
  isLiked: false,
  imageUrl: 'https://via.placeholder.com/150'
};

describe('ProductItem 컴포넌트 테스트', () => {
  const setup = (overrides = {}) => {
    const props = {
      product: { ...mockProduct, ...overrides },
      onClick: vi.fn(),
      children: <p>추가 정보</p>
    };

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <ProductItem {...props} />
      </MemoryRouter>
    );

    return { props, user };
  };

  test('기본 렌더링 확인', () => {
    setup();

    const productImage = screen.getByAltText('테스트 상품');
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute(
      'src',
      'https://via.placeholder.com/150?h=10'
    );

    const auctionName = screen.getByText('테스트 상품');
    expect(auctionName).toBeInTheDocument();

    // 금액 확인 테스트코드 추가해야 함

    // 좋아요 카운터 테스트코드 추가해야 함

    const additionalInfo = screen.getByText('추가 정보');
    expect(additionalInfo).toBeInTheDocument();
  });

  test('onClick 이벤트 확인', async () => {
    const { props, user } = setup();

    const productItem = screen.getByRole('img', { name: '테스트 상품' });
    await user.click(productItem);

    expect(props.onClick).toHaveBeenCalled();
  });

  // 좋아요 버튼 상태 확인 테스트 코드 추가해야함

  test('남은 시간이 표시되는지 확인', () => {
    setup();

    const timeLabel = screen.getByText((content, element) => {
      return content.includes('1시간 남음') && element?.tagName === 'P';
    });
    expect(timeLabel).toBeInTheDocument();
  });

  test('이미지 대체 텍스트가 없는 경우 기본값 표시', () => {
    setup({ auctionName: undefined });

    const productImage = screen.getByAltText('제품 사진');
    expect(productImage).toBeInTheDocument();
  });
});
