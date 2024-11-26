import { Meta, StoryObj } from '@storybook/react';
import ProductItem from './ProductItem';
import { Price, LikeCount } from '@/shared/ui';

const meta: Meta<typeof ProductItem> = {
  title: 'Components/ProductItem',
  component: ProductItem,
  argTypes: {
    onClick: { action: 'clicked' },
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