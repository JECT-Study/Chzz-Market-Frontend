export const CONFIRM_MESSAGE: { [key: string]: { title: string; description: string } } = Object.freeze({
  deletePreAuction: {
    title: '사전 경매를 삭제하시겠어요?',
    description: '사전 경매 참여자들에게 경매 취소 알림이 발송됩니다.',
  },
  cancelBid: {
    title: '경매 참여를 취소하시겠어요?',
    description: '경매 참여를 취소하면 다시 참여하지 못합니다.',
  },
  convert: {
    title: '정식 경매로 전환하시겠어요?',
    description: '사전 경매 참여자들에게 경매 전환 알림이 발송됩니다.',
  },
});
