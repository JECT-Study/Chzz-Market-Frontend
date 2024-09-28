import ElectronicsIcon from '@/assets/categories/1_phone.svg';
import HomeAppliancesIcon from '@/assets/categories/2_laundry.svg';
import FashionClothingIcon from '@/assets/categories/3_clothes.svg';
import FurnitureInteriorIcon from '@/assets/categories/4_interior.svg';
import BooksMediaIcon from '@/assets/categories/5_book.svg';
import SportsLeisureIcon from '@/assets/categories/6_sports.svg';
import ToysHobbiesIcon from '@/assets/categories/7_toy.svg';
import OthersIcon from '@/assets/categories/8_etc.svg';

export const categories = Object.freeze({
  Electronics: {
    value: '전자기기',
    code: 'ELECTRONICS',
    icon: ElectronicsIcon,
  },
  HomeAppliances: {
    value: '가전제품',
    code: 'HOME_APPLIANCES',
    icon: HomeAppliancesIcon,
  },
  FashionClothing: {
    value: '패션 및 의류',
    code: 'FASHION_AND_CLOTHING',
    icon: FashionClothingIcon,
  },
  FurnitureInterior: {
    value: '가구 및 인테리어',
    code: 'FURNITURE_AND_INTERIOR',
    icon: FurnitureInteriorIcon,
  },
  BooksMedia: {
    value: '도서 및 미디어',
    code: 'BOOKS_AND_MEDIA',
    icon: BooksMediaIcon,
  },
  SportsLeisure: {
    value: '스포츠 및 레저',
    code: 'SPORTS_AND_LEISURE',
    icon: SportsLeisureIcon,
  },
  ToysHobbies: {
    value: '장난감 및 취미',
    code: 'TOYS_AND_HOBBIES',
    icon: ToysHobbiesIcon,
  },
  Others: {
    value: '기타',
    code: 'OTHER',
    icon: OthersIcon,
  },
});
