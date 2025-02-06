import { Price } from '@/shared';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Price> = {
  title: 'components/Price',
  component: Price,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '가격 제목' },
    price: { control: 'number', description: '가격 값 (숫자)' }
  }
};

export default meta;

type Story = StoryObj<typeof Price>;

export const Default: Story = {
  args: {
    title: '판매가',
    price: 10000
  }
};
