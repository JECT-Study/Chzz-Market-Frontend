import type { IParticipantCountItems } from '@/entities/user/user';
import { ROUTES } from '@/shared/constants/routes';
import { Icon } from '@/shared/ui/Icon';
import { useNavigate } from 'react-router';

interface Props {
  participantCount?: IParticipantCountItems;
  preRegisterCount?: number;
  registeredAuctionCount?: number;
}

export const UserOrder = ({
  participantCount,
  preRegisterCount,
  registeredAuctionCount
}: Props) => {
  const navigate = useNavigate();
  const $participantCount = participantCount || {
    failedAuctionCount: 0,
    ongoingAuctionCount: 0,
    successfulAuctionCount: 0
  };
  const $preRegisterCount = preRegisterCount || 0;
  const $registeredAuctionCount = registeredAuctionCount || 0;

  return (
    <div className="pb-10">
      {/* 참여한 정식 경매 내역 */}
      <div>
        <h2 className="mb-4 text-heading3 web:text-heading1">
          참여한 정식 경매 내역
        </h2>
        <div className="flex justify-between gap-3">
          {/* 참여중인 경매 */}
          <div
            className="flex flex-col justify-center items-center w-[6.69rem] h-[7rem] web:w-1/3 web:h-[9.4rem] p-1 web:p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTES.USER.PARTICIPATED_LIST, {
                state: { sortType: 'AuctionHistory' }
              })
            }
          >
            <Icon name="ongoing_auction" ariaLabel="참여중인 경매" style='w-8 h-8 web:mb-2' />
            <span className="block text-center text-body2 web:hidden">
              참여중인 <br /> 경매
            </span>
            <span className="hidden text-heading3 web:block">
              참여중인 경매
            </span>
            <span className="mt-1 text-orange-500 text-body2 web:text-lg">
              {$participantCount.ongoingAuctionCount} 건
            </span>
          </div>

          {/* 성공한 경매 */}
          <div
            className="flex flex-col justify-center items-center w-[6.7rem] h-[7rem] web:w-1/3 web:h-[9.4rem] p-1 web:p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTES.USER.PARTICIPATED_LIST, {
                state: { sortType: 'AuctionsWon' }
              })
            }
          >
            <Icon name="successful_auction" ariaLabel="성공한 경매" style='w-8 h-8 web:mb-2' />
            <span className="block text-center text-body2 web:hidden">
              성공한 <br /> 경매
            </span>
            <span className="hidden text-heading3 web:block">성공한 경매</span>
            <span className="mt-1 text-orange-500 text-body2 web:text-lg">
              {$participantCount.successfulAuctionCount} 건
            </span>
          </div>

          {/* 실패한 경매 */}
          <div
            className="flex flex-col justify-center items-center w-[6.69rem] h-[7rem] web:w-1/3 web:h-[9.4rem] p-1 web:p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTES.USER.PARTICIPATED_LIST, {
                state: { sortType: 'AuctionsLost' }
              })
            }
          >
            <Icon name="failed_auction" ariaLabel="실패한 경매" style='w-8 h-8 web:mb-2' />
            <span className="block text-center text-body2 web:hidden">
              실패한 <br /> 경매
            </span>
            <span className="hidden text-heading3 web:block">실패한 경매</span>
            <span className="mt-1 text-orange-500 text-body2 web:text-lg">
              {$participantCount.failedAuctionCount} 건
            </span>
          </div>
        </div>
      </div>

      {/* 내가 등록한 경매 내역 */}
      <div className="mt-8">
        <h2 className="mb-4 text-heading3 web:text-heading1">
          내가 등록한 경매 내역
        </h2>
        <div className="flex justify-between gap-3">
          {/* 정식 경매 */}
          <div
            className="flex flex-col justify-center items-center w-[10.25rem] h-[7rem] web:w-1/2 web:h-[9.4rem] p-2 web:p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTES.USER.REGISTERED_LIST, {
                state: { sortType: 'ongoing' }
              })
            }
          >
            <Icon name='auction' ariaLabel='정식 경매' style='w-8 h-8 mb-2' />
            <span className="text-body2 web:text-heading3">정식 경매</span>
            <span className="mt-1 text-orange-500 text-body2 web:text-lg">
              {$registeredAuctionCount} 건
            </span>
          </div>

          {/* 사전 경매 */}
          <div
            className="flex flex-col justify-center items-center w-[10.25rem] h-[7rem] web:w-1/2 web:h-[9.4rem] p-2 web:p-4 border rounded-lg cursor-pointer border-gray2"
            onClick={() =>
              navigate(ROUTES.USER.PRE_REGISTERED_LIST, {
                state: { sortType: 'preAuction' }
              })
            }
          >
            <Icon name='pre_auction' ariaLabel='사전 경매' style='w-8 h-[1.87rem] mb-2' />
            <span className="text-body2 web:text-heading3">사전 경매</span>
            <span className="mt-1 text-orange-500 text-body2 web:text-lg">
              {$preRegisterCount} 건
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
