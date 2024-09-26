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
    icon: ElectronicsIcon,
  },
  HomeAppliances: {
    value: '가전제품',
    icon: HomeAppliancesIcon,
  },
  FashionClothing: {
    value: '패션 및 의류',
    icon: FashionClothingIcon,
  },
  FurnitureInterior: {
    value: '가구 및 인테리어',
    icon: FurnitureInteriorIcon,
  },
  BooksMedia: {
    value: '도서 및 미디어',
    icon: BooksMediaIcon,
  },
  SportsLeisure: {
    value: '스포츠 및 레저',
    icon: SportsLeisureIcon,
  },
  ToysHobbies: {
    value: '장난감 및 취미',
    icon: ToysHobbiesIcon,
  },
  Others: {
    value: '기타',
    icon: OthersIcon,
  },
});
