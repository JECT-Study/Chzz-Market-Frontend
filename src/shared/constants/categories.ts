export const CATEGORIES: {
  [key: string]: {
    value: string;
    code: string;
    lowerCode: string;
    icon: string;
  };
} = Object.freeze({
  ELECTRONICS: {
    value: '전자기기',
    code: 'ELECTRONICS',
    lowerCode: 'electronics',
    icon: '1_phone'
  },
  HOME_APPLIANCES: {
    value: '가전제품',
    code: 'HOME_APPLIANCES',
    lowerCode: 'home-appliances',
    icon: '2_laundry'
  },
  FASHION_AND_CLOTHING: {
    value: '패션 및 의류',
    code: 'FASHION_AND_CLOTHING',
    lowerCode: 'fashion-and-clothing',
    icon: '3_clothes'
  },
  FURNITURE_AND_INTERIOR: {
    value: '가구 및 인테리어',
    code: 'FURNITURE_AND_INTERIOR',
    lowerCode: 'furniture-and-interior',
    icon: '4_interior'
  },
  BOOKS_AND_MEDIA: {
    value: '도서 및 미디어',
    code: 'BOOKS_AND_MEDIA',
    lowerCode: 'books-and-media',
    icon: '5_book'
  },
  SPORTS_AND_LEISURE: {
    value: '스포츠 및 레저',
    code: 'SPORTS_AND_LEISURE',
    lowerCode: 'sports-and-leisure',
    icon: '6_sports'
  },
  TOYS_AND_HOBBIES: {
    value: '장난감 및 취미',
    code: 'TOYS_AND_HOBBIES',
    lowerCode: 'toys-and-hobbies',
    icon: '7_toy'
  },
  OTHER: {
    value: '기타',
    code: 'OTHER',
    lowerCode: 'other',
    icon: '8_etc'
  }
});
