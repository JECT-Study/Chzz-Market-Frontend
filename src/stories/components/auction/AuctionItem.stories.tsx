import { AuctionItem, Button } from '@/shared';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AuctionItem> = {
  title: 'Components/AuctionItem',
  component: AuctionItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'ARIA label for accessibility' },
    axis: {
      control: { type: 'radio' },
      options: ['row', 'column'],
      description: 'Layout direction (row or column)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuctionItem>;

export const Default: Story = {
  args: {
    label: 'Auction Item Default',
    axis: 'row',
    children: (
      <>
        <AuctionItem.Image
          src="https://via.placeholder.com/150"
          time={3600}
        />
        <AuctionItem.Main
          kind="register"
          name="Awesome Item"
          price={15000}
          count={10}
        />
        <AuctionItem.Button>
          <Button type='button' className="bg-blue-500 text-white px-2 py-1 rounded">
            참여하기
          </Button>
        </AuctionItem.Button>
      </>
    ),
  },
};

export const ColumnLayout: Story = {
  args: {
    label: 'Auction Item Column',
    axis: 'column',
    children: (
      <>
        <AuctionItem.Image
          src="https://via.placeholder.com/150"
          time={7200}
        />
        <AuctionItem.Main
          kind="like"
          name="Another Item"
          price={25000}
          count={30}
        />
        <AuctionItem.Button>
          <Button type='button' className="bg-green-500 text-white px-2 py-1 rounded">
            좋아요
          </Button>
        </AuctionItem.Button>
      </>
    ),
  },
};

export const NoTimeImage: Story = {
  args: {
    label: 'Auction Item without Time',
    axis: 'row',
    children: (
      <>
        <AuctionItem.Image src="https://via.placeholder.com/150" />
        <AuctionItem.Main
          kind="register"
          name="No Time Item"
          price={12000}
          count={5}
        />
        <AuctionItem.Button>
          <Button type='button' className="bg-gray-300 text-black px-2 py-1 rounded">
            자세히 보기
          </Button>
        </AuctionItem.Button>
      </>
    ),
  },
};