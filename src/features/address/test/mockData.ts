export const mockDefaultAddressData = {
  items: [
    {
      id: '0',
      recipientName: '홍길동',
      phoneNumber: '010-1234-5678',
      zipcode: '12345',
      roadAddress: '서울특별시 종로구',
      jibun: '종로 1가',
      detailAddress: '101호',
      isDefault: true
    }
  ]
};

export const mockAddresses = {
  addressData: {
    items: [
      {
        id: '1',
        recipientName: '홍길동',
        phoneNumber: '010-1234-5678',
        roadAddress: '서울특별시 종로구',
        detailAddress: '101호',
        isDefault: true
      },
      {
        id: '2',
        recipientName: '이순신',
        phoneNumber: '010-8765-4321',
        roadAddress: '서울특별시 강남구',
        detailAddress: '202호',
        isDefault: false
      }
    ]
  }
};
