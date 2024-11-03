export const PRE_REGISTER_CAUTION = Object.freeze({
  HEADING: '사전 등록을 완료하시겠습니까?',
  CONTENT: {
    INFO: {
      TITLE: '사전 등록 경매란?',
      DESCRIPTION:
        '판매자는 상품을 실제 경매에 내놓기 전, 사전 등록 경매를 통해 가상으로 등록할 수 있습니다. 미리 상품의 시장 반응을 분석할 수 있어 경매의 성공 가능성을 예측하는 데 유용합니다.',
    },
    PROGRESS: {
      TITLE: '사전 등록 경매 진행',
      DESCRIPTION:
        '판매자는 상품을 사전 등록 경매로 올리고, 구매자들은 이 상품에 대해 관심을 표현하거나 좋아요를 누를 수 있습니다. 이를 통해 판매자는 해당 상품의 수요와 잠재적인 구매자들의 관심도를 미리 확인할 수 있습니다.',
    },
  },
});

export const REGISTER_CAUTION = Object.freeze({
  HEADING: '경매 등록을 완료하시겠습니까?',
  TITLE: '경매 등록 주의사항',
  CONTENT: {
    PRODUCT_INFO: {
      TITLE: '1. 상품 정보 정확히 기재하기',
      DESCRIPTION: '판매자는 상품의 상태, 기능, 크기 등을 포함한 모든 정보를 정확하고 상세하게 기재해야 합니다.',
    },
    DEFECTS_DISCLOSURE: {
      TITLE: '2. 제품 결함 및 상태 명시',
      DESCRIPTION:
        '상품에 결함이나 문제가 있을 경우, 이를 숨기지 않고 반드시 명시해야 합니다. 결함이 있는 부분이나 사용 흔적은 구체적으로 설명하여 구매자가 예상치 못한 불만을 가지지 않도록 해야 합니다.',
    },
    AUCTION_CLOSING: {
      TITLE: '3. 경매 마감 시간',
      DESCRIPTION:
        '경매의 마감 시간은 자동으로 24시간으로 설정됩니다. 이 시간 동안 입찰자들은 자유롭게 입찰할 수 있으며, 경매 종료 시점에 최고 입찰가가 낙찰자로 결정됩니다.',
    },
    BIDDING_RESTRICTIONS: {
      TITLE: '4. 경매 제한 시간 및 최고 입찰가 공개',
      DESCRIPTION: '최고 입찰가는 낙찰이 확정된 후 공개되므로, 판매자는 이 점을 유의하여 경매를 진행해야 합니다.',
    },
  },
});
