import { Meta, StoryObj } from '@storybook/react';
import { Price, LikeCount, ProductItem } from '@/shared/ui';

const meta: Meta<typeof ProductItem> = {
  title: 'Components/ProductItem',
  component: ProductItem,
  tags: ["autodocs"], // 자동으로 Docs 파일 생성 Docs파일 커스터마이징 원할 시 아래의 argTypes에 각 Prop에 대한 설명 추가 및 Default Value를 테이블 속성에 정의 가능
  argTypes: {
    onClick: { action: 'clicked' },
    product: {
      description: '상품 정보를 포함하는 객체입니다.',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  parameters: { // parameters.docs.description.component
    docs: {
      description: {
        component: 'ProductItem은 상품 정보를 렌더링하는 컴포넌트입니다.' // 전체 컴포넌트에 대한 설명 추가
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: {
    product: {
      id: 1,
      productName: '테스트 상품',
      minPrice: 50000,
      timeRemaining: 3600,
      participantCount: 10,
      likeCount: 5,
      isLiked: false,
      status: 'active',
      createdAt: '2024-01-01T00:00:00',
      imageUrl: 'https://via.placeholder.com/150',
    },
    children: (
      <>
        <Price title="시작가" price={50000} />
        <LikeCount count={5} />
      </>
    ),
  },
};

export const Liked: Story = {
  args: {
    product: {
      id: 2,
      productName: '좋아요 상품',
      minPrice: 100000,
      timeRemaining: 3600,
      participantCount: 15,
      likeCount: 10,
      isLiked: true,
      status: 'active',
      createdAt: '2024-01-01T00:00:00',
      imageUrl: 'https://via.placeholder.com/150',
    },
    children: (
      <>
        <Price title="시작가" price={100000} />
        <LikeCount count={10} />
      </>
    ),
  },
};