import ElectronicsIcon from '../assets/categories/1_phone.svg';
import HomeAppliancesIcon from '../assets/categories/2_laundry.svg';
import FashionClothingIcon from '../assets/categories/3_clothes.svg';
import FurnitureInteriorIcon from '../assets/categories/4_interior.svg';
import BooksMediaIcon from '../assets/categories/5_book.svg';
import SportsLeisureIcon from '../assets/categories/6_sports.svg';
import ToysHobbiesIcon from '../assets/categories/7_toy.svg';
import OtherIcon from '../assets/categories/8_etc.svg';

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
    icon: ElectronicsIcon
  },
  HOME_APPLIANCES: {
    value: '가전제품',
    code: 'HOME_APPLIANCES',
    lowerCode: 'home-appliances',
    icon: HomeAppliancesIcon
  },
  FASHION_AND_CLOTHING: {
    value: '패션 및 의류',
    code: 'FASHION_AND_CLOTHING',
    lowerCode: 'fashion-and-clothing',
    icon: FashionClothingIcon
  },
  FURNITURE_AND_INTERIOR: {
    value: '가구 및 인테리어',
    code: 'FURNITURE_AND_INTERIOR',
    lowerCode: 'furniture-and-interior',
    icon: FurnitureInteriorIcon
  },
  BOOKS_AND_MEDIA: {
    value: '도서 및 미디어',
    code: 'BOOKS_AND_MEDIA',
    lowerCode: 'books-and-media',
    icon: BooksMediaIcon
  },
  SPORTS_AND_LEISURE: {
    value: '스포츠 및 레저',
    code: 'SPORTS_AND_LEISURE',
    lowerCode: 'sports-and-leisure',
    icon: SportsLeisureIcon
  },
  TOYS_AND_HOBBIES: {
    value: '장난감 및 취미',
    code: 'TOYS_AND_HOBBIES',
    lowerCode: 'toys-and-hobbies',
    icon: ToysHobbiesIcon
  },
  OTHER: {
    value: '기타',
    code: 'OTHER',
    lowerCode: 'other',
    icon: OtherIcon
  }
});
