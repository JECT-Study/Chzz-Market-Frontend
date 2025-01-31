import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // 자동으로 Docs 탭에 정보 추가
  argTypes: {
    size: {
      description: '버튼의 크기를 설정합니다.',
      table: {
        type: { summary: `'xsmall' | 'small' | 'medium' | 'large'` },
        defaultValue: { summary: 'medium' }
      },
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large']
    },
    color: {
      description: '버튼의 배경 색상을 설정합니다.',
      table: {
        type: {
          summary: `'white' | 'black' | 'gray' | 'cheeseYellow' | 'disabled'`
        },
        defaultValue: { summary: 'white' }
      },
      control: 'select',
      options: ['white', 'black', 'gray', 'cheeseYellow', 'disabled']
    },
    hoverColor: {
      description: '호버 상태에서의 색상을 설정합니다.',
      table: {
        type: { summary: `'black' | 'white'` },
        defaultValue: { summary: '' }
      },
      control: 'select',
      options: ['black', 'white', '']
    },
    loading: {
      description: '로딩 스피너를 표시할지 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      },
      control: 'boolean'
    },
    disabled: {
      description: '버튼 활성화 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      },
      control: 'boolean'
    },
    onClick: { action: 'clicked' } // 클릭 이벤트
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button은 다양한 크기, 색상, 상태를 지원하는 UI 컴포넌트입니다.' // 컴포넌트 설명
      }
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼',
    size: 'medium',
    color: 'black',
    hoverColor: '',
    disabled: false,
    loading: false,
    type: 'button'
  }
};

export const Disabled: Story = {
  args: {
    children: '비활성화 버튼',
    size: 'medium',
    color: 'disabled',
    hoverColor: '',
    disabled: true,
    loading: false,
    type: 'button'
  }
};

export const Loading: Story = {
  args: {
    children: '로딩 중...',
    size: 'medium',
    color: 'cheeseYellow',
    hoverColor: '',
    disabled: false,
    loading: true,
    type: 'button'
  }
};

export const LargeButton: Story = {
  args: {
    children: '큰 버튼',
    size: 'large',
    color: 'gray',
    hoverColor: 'black',
    disabled: false,
    loading: false,
    type: 'button'
  }
};
