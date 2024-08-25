export const auctionData = {
  content: [
    {
      id: 11,
      name: 'NewProduct12',
      cdnPath: 'path/to/newimage11.jpg',
      timeRemaining: 239921,
      minPrice: 10000,
      participantCount: 7,
      status: 'PROCEEDING',
      createdAt: '2024-08-05T10:00:00',
    },
    {
      id: 1,
      name: 'Product1',
      cdnPath: 'path/to/image1.jpg',
      timeRemaining: 0,
      minPrice: 1000,
      participantCount: 3,
      status: 'ENDED',
      createdAt: '2024-08-04T19:12:19',
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 5,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 2,
  first: true,
  size: 5,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 2,
  empty: false,
};

export default auctionData;
