import { Button } from '@/shared';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: '버튼 내부 텍스트나 요소' },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large'],
      description: '버튼 크기'
    },
    color: {
      control: 'select',
      options: [
        'black',
        'white',
        'gray',
        'gray2',
        'gray3',
        'cheeseYellow',
        'grayWhite',
        'disabled'
      ],
      description: '버튼 색상'
    },
    hoverColor: {
      control: 'select',
      options: ['black', 'white'],
      description: '호버 시 버튼 색상'
    },
    disabled: { control: 'boolean', description: '버튼 비활성화 여부' },
    loading: { control: 'boolean', description: '로딩 상태 표시 여부' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼 타입'
    },
    ariaLabel: { control: 'text', description: '접근성 라벨' },
    onClick: { action: 'clicked', description: '버튼 클릭 이벤트' }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼',
    size: 'medium',
    color: 'black',
    hoverColor: 'black',
    disabled: false,
    loading: false,
    type: 'button',
    ariaLabel: '기본 버튼'
  }
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
    children: '로딩 중...'
  }
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    children: '비활성화됨'
  }
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'large',
    children: 'Large 버튼'
  }
};

export const CheeseYellow: Story = {
  args: {
    ...Default.args,
    color: 'cheeseYellow',
    children: 'Cheese Yellow 버튼'
  }
};
