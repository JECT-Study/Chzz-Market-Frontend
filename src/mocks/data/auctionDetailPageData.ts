export interface AuctionItem {
  productId: number;
  sellerId: number;
  sellerName: string;
  title: string;
  description: string;
  minPrice: number;
  endDateTime: string;
  status: string;
  isSeller: boolean;
  participantCount: number;
  isParticipating: boolean;
  bidAmount: number;
  remainingBidCount: number;
  imageList: string[];
}

const generateRandomEndDateTime = (): string => {
  const currentTimeInSeconds = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 변환
  const minTime = 0; // 최소 0초
  const maxTime = 25 * 60 * 60; // 최대 25시간 (초 단위)
  const randomTimeOffset =
    Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
  return String(currentTimeInSeconds + randomTimeOffset); // 현재 시간 + 랜덤 오프셋
};

const auctionDetailPageData: AuctionItem[] = [
  {
    productId: 2,
    sellerId: 2,
    sellerName: 'User2',
    title: 'Apple iPhone 13',
    description: 'Latest Apple iPhone 13 with A15 Bionic chip.',
    minPrice: 120000,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: false,
    participantCount: 10,
    isParticipating: true,
    bidAmount: 1300,
    remainingBidCount: 2,
    imageList: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-mini-finish-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1629928407000',
      'https://cdn.mos.cms.futurecdn.net/2cYrKLpEFsbXfR67VvXhMi.jpg',
    ],
  },
  {
    productId: 3,
    sellerId: 3,
    sellerName: 'User3',
    title: 'Sony PlayStation 5',
    description: 'Next-generation PlayStation console for immersive gaming.',
    minPrice: 500000,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: true,
    participantCount: 20,
    isParticipating: false,
    bidAmount: 0,
    remainingBidCount: 3,
    imageList: [
      'https://cdn.mos.cms.futurecdn.net/FPCZfAygn7CB7NZBszr2tW.jpg',
      'https://cdn.vox-cdn.com/thumbor/EiW5q8kx_Z7sk3DJ9CmBdKP5Dws=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22211366/vpavic_4278_20201023_0044.jpg',
    ],
  },
  {
    productId: 4,
    sellerId: 4,
    sellerName: 'User4',
    title: 'Samsung Galaxy S22',
    description: 'Flagship smartphone from Samsung with powerful features.',
    minPrice: 900,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: false,
    participantCount: 15,
    isParticipating: true,
    bidAmount: 950,
    remainingBidCount: 1,
    imageList: [
      'https://images.samsung.com/is/image/samsung/p6pim/in/2202/gallery/in-galaxy-s22-s901-sm-s901elvdinu-530086852?$1300_1038_PNG$',
      'https://www.gizmochina.com/wp-content/uploads/2022/03/Samsung-Galaxy-S22-Featured-768x768.jpg',
    ],
  },
  {
    productId: 5,
    sellerId: 5,
    sellerName: 'User5',
    title: 'Apple MacBook Air M2',
    description:
      'Thin and light laptop with Apple M2 chip for amazing performance.',
    minPrice: 1500,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: true,
    participantCount: 8,
    isParticipating: true,
    bidAmount: 1600,
    remainingBidCount: 2,
    imageList: [
      'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mb-air-m2-silver-select-202206_GEO_EMEA_LANG_EN?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653497304015',
      'https://cdn.mos.cms.futurecdn.net/PKqNqNRT6gV5AeosFGuh7V.jpg',
    ],
  },
  {
    productId: 6,
    sellerId: 6,
    sellerName: 'User6',
    title: 'Bose QuietComfort 45 Headphones',
    description: 'Noise-cancelling headphones for immersive audio experience.',
    minPrice: 350,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: false,
    participantCount: 5,
    isParticipating: true,
    bidAmount: 370,
    remainingBidCount: 1,
    imageList: [
      'https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/quietcomfort_45/product_silo_images/qc45_b_lg_01.png/_jcr_content/renditions/cq5dam.web.320.320.png',
      'https://cdn.mos.cms.futurecdn.net/B9PC6XMwqxxFmSh2KL2qJm.jpg',
    ],
  },
  {
    productId: 7,
    sellerId: 7,
    sellerName: 'User7',
    title: 'Nintendo Switch OLED',
    description:
      'Enhanced Nintendo Switch with OLED display for vivid visuals.',
    minPrice: 400,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: true,
    participantCount: 12,
    isParticipating: true,
    bidAmount: 420,
    remainingBidCount: 2,
    imageList: [
      'https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_auto/c_scale,w_300/ncom/en_US/switch/console/oled-model-gallery/screenshot01',
      'https://cdn.vox-cdn.com/thumbor/wz7g4TBOO24MylZK7ozKf1foOS8=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22344038/akrales_210708_4640_0085.jpg',
    ],
  },
  {
    productId: 8,
    sellerId: 8,
    sellerName: 'User8',
    title: 'Dyson V15 Detect Vacuum Cleaner',
    description: 'Powerful cordless vacuum cleaner with laser dust detection.',
    minPrice: 600,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: false,
    participantCount: 6,
    isParticipating: true,
    bidAmount: 620,
    remainingBidCount: 2,
    imageList: [
      'https://dyson-h.assetsadobe.com/is/image/content/dam/dyson/images/products/primary/368346-01.png?$responsive$&cropPathE=desktop&fit=stretch,1&wid=1920',
      'https://cdn.mos.cms.futurecdn.net/U23zytA3foXAFJAs2ntSPf.jpg',
    ],
  },
  {
    productId: 9,
    sellerId: 9,
    sellerName: 'User9',
    title: 'Sony WH-1000XM4 Headphones',
    description:
      'Industry-leading noise cancellation with superior sound quality.',
    minPrice: 350,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: false,
    participantCount: 5,
    isParticipating: true,
    bidAmount: 370,
    remainingBidCount: 2,
    imageList: [
      'https://cdn.sony-asia.com/image/ed4aa1535f9eb0e49a482d2ad24a823f?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
      'https://cdn.mos.cms.futurecdn.net/YgzWQoTcTbmw2Q7V3SMiPA.jpg',
    ],
  },
  {
    productId: 10,
    sellerId: 10,
    sellerName: 'User10',
    title: 'Apple Watch Series 7',
    description:
      'Smartwatch with a larger, always-on display and advanced features.',
    minPrice: 450000,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: true,
    participantCount: 8,
    isParticipating: false,
    bidAmount: 0,
    remainingBidCount: 3,
    imageList: [
      'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111909_series7-480.png',
      'https://cdn.mos.cms.futurecdn.net/gpBKRvs9nTpFrVsnG8mxkP.jpg',
    ],
  },
  {
    productId: 11,
    sellerId: 11,
    sellerName: 'User11',
    title: 'GoPro HERO10 Black',
    description: 'Action camera with incredible video quality and performance.',
    minPrice: 400000,
    endDateTime: generateRandomEndDateTime(),
    status: 'PROCEEDING',
    isSeller: true,
    participantCount: 7,
    isParticipating: true,
    bidAmount: 530,
    remainingBidCount: 2,
    imageList: [
      'https://gopro.com/content/dam/gopro/corporate/website-hotspot/global/hero10/features/hero10-feature-1-superphoto.jpg',
      'https://cdn.mos.cms.futurecdn.net/pARvMxPaaNixzABa2DgEXg.jpg',
    ],
  },
  {
    productId: 12,
    sellerId: 12,
    sellerName: 'User12',
    title: 'Samsung Galaxy Z Fold 5',
    description:
      'Next-gen foldable smartphone with a large display and enhanced productivity features.',
    minPrice: 1800000, // 현실적인 스마트폰 가격 (약 180만원)
    endDateTime: generateRandomEndDateTime(),
    status: 'PENDING',
    isSeller: false,
    participantCount: 0,
    isParticipating: false,
    bidAmount: 0,
    remainingBidCount: 5,
    imageList: [
      'https://images.samsung.com/is/image/samsung/p6pim/levant/galaxy-z-fold5/f946/sm-f946bzbgeux/gallery/levant-galaxy-z-fold5-f946-470140-sm-f946bzbgeux-621237687?$2052_1641_PNG$',
      'https://cdn.mos.cms.futurecdn.net/kek8nDAzj5P9Kv2TuVpDWg.jpg',
    ],
  },
  {
    productId: 13,
    sellerId: 13,
    sellerName: 'User13',
    title: 'Sony A7 IV Mirrorless Camera',
    description:
      'High-performance mirrorless camera with advanced image processing and 33MP full-frame sensor.',
    minPrice: 3000000, // 현실적인 카메라 가격 (약 300만원)
    endDateTime: generateRandomEndDateTime(),
    status: 'PENDING',
    isSeller: true,
    participantCount: 0,
    isParticipating: false,
    bidAmount: 0,
    remainingBidCount: 3,
    imageList: [
      'https://www.sony.com/image/4f4c92321d8b3bbdcb6ad7b272b6ebd0?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
      'https://cdn.mos.cms.futurecdn.net/dxt1Xp5tTp9ZG9NcdGLkB7.jpg',
    ],
  },
];

export default auctionDetailPageData;
