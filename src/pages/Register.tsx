import { useRef, useState } from 'react';

import { AiFillCloseCircle } from 'react-icons/ai';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import Button from '../components/common/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Input } from '../components/ui/input';
import Layout from '../components/Layout';
import RegisterCaution from '../components/RegisterCaution';
import { Textarea } from '../components/ui/textarea';
import { categories } from '../constants/categories';

const Register = () => {
  const [caution, setCaution] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const clickCheck = () => setCheck(true);

  const RegisterHeader = (
    <Header path="/">{caution === '' ? '경매 등록하기' : '주의사항'}</Header>
  );

  const RegisterFooter = (
    <Footer>
      <div className="flex items-center justify-center h-full gap-3">
        <Button
          type="button"
          color="white"
          className="font-semibold text-[1rem] py-3 border-2 rounded-lg grow border-gray2"
          size="medium"
          onClick={() => setCaution('pre-enroll')}
        >
          사전 등록
        </Button>
        <Button
          type="button"
          color="bg-cheeseYellow"
          className="grow-[2] rounded-lg text-[1rem] py-3 font-semibold bg-cheeseYellow text-white"
          size="medium"
          onClick={() => setCaution('enroll')}
        >
          바로 등록하기
        </Button>
      </div>
    </Footer>
  );

  const [images, setImages] = useState<string[]>([
    '/air-jordan-row.jpeg',
    'jordan-blue.png',
    'jordan-black.jpeg',
  ]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDragLeave = () => {
    setHoveredIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null) {
      const newImages = [...images];
      [newImages[index], newImages[draggedIndex]] = [
        newImages[draggedIndex],
        newImages[index],
      ];
      setImages(newImages);
    }
    setDraggedIndex(null);
    setHoveredIndex(null);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const deleteImage = (target: string) => {
    setImages((cur) => cur.filter((img: string) => img !== target));
  };
  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length > 4) {
      return;
    }
    const file = e.target?.files?.[0];
    if (!file) return;

    // 이미지 화면에 띄우기
    const reader = new FileReader();
    // 파일을 불러오는 메서드, 종료되는 시점에 readyState는 Done(2)이 되고 onLoad 시작
    reader.readAsDataURL(file);
    reader.onload = (onloadEvent: ProgressEvent<FileReader>) => {
      if (reader.readyState === 2) {
        // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
        const result = onloadEvent.target?.result;
        if (typeof result === 'string' && !images.includes(result)) {
          setImages((state) => [...state, result]);
        }
      }
    };
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout header={RegisterHeader} footer={RegisterFooter}>
      {caution === '' ? (
        <form className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <label htmlFor="picture" className="cursor-pointer text-heading3">
              사진 &#42;
            </label>
            <div className="flex items-center gap-3 overflow-scroll min-h-36">
              <button
                className="flex items-center justify-center h-32 border-2 rounded cursor-pointer min-w-32"
                onClick={handleBoxClick}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="text-gray2 font-bold text-[20px]">+</div>
                  <div className="text-[12px]">
                    <span className="text-cheeseYellow">{images.length}</span>/5
                  </div>
                </div>
              </button>
              {images.map((image: string, index: number) => (
                <div
                  className={`relative h-32 transition-transform duration-400 min-w-32 w-32 ${
                    index === hoveredIndex ? 'transform scale-105' : ''
                  }`}
                  draggable
                  key={image}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    handleDragOver(index);
                  }}
                  onDragLeave={handleDragLeave}
                  onDrop={() => handleDrop(index)}
                >
                  <img
                    src={image}
                    alt={`상품 사진 ${index}`}
                    className="object-cover w-full h-full border-2 rounded"
                  />
                  {index === 0 && (
                    <p className="absolute text-xs rounded py-1 px-2 text-white bg-[#454545]/90  top-[10%] left-[2.125rem]">
                      대표 사진
                    </p>
                  )}
                  <AiFillCloseCircle
                    className="absolute top-[-5%] right-[-5%] cursor-pointer text-black"
                    size={25}
                    onClick={() => deleteImage(image)}
                  />
                </div>
              ))}
            </div>
            <Input
              ref={fileInputRef}
              type="file"
              id="picture"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImage}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="title" className="cursor-pointer text-heading3">
              제목 &#42;
            </label>
            <Input
              id="title"
              type="text"
              placeholder="제목을 입력해주세요."
              className="focus-visible:ring-cheeseYellow"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="categories"
              className="cursor-pointer text-heading3"
            >
              카테고리 &#42;
            </label>
            <Select>
              <SelectTrigger
                id="categories"
                className="w-full focus:ring-cheeseYellow"
              >
                <SelectValue placeholder="카테고리를 선택하세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="focus-visible:ring-cheeseYellow">
                  {Object.values(categories).map((el) => (
                    <SelectItem key={el} value={el}>
                      {el}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="cost" className="cursor-pointer text-heading3">
              시작 가격 &#42;
            </label>
            <Input
              id="cost"
              type="text"
              placeholder="기본 1,000원"
              defaultValue="1,000 원"
              className="focus-visible:ring-cheeseYellow"
            />
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm text-center transition-colors border cursor-pointer hover:bg-cheeseYellow hover:text-white hover:border-cheeseYellow rounded-xl border-gray1">
                + 1,000원
              </span>
              <span className="px-3 py-1 text-sm text-center transition-colors border cursor-pointer hover:bg-cheeseYellow hover:text-white hover:border-cheeseYellow rounded-xl border-gray1">
                + 5,000원
              </span>
              <span className="px-3 py-1 text-sm text-center transition-colors border cursor-pointer hover:bg-cheeseYellow hover:text-white hover:border-cheeseYellow rounded-xl border-gray1">
                + 10,000원
              </span>
              <span className="px-3 py-1 text-sm text-center transition-colors border cursor-pointer hover:bg-cheeseYellow hover:text-white hover:border-cheeseYellow rounded-xl border-gray1">
                + 50,000원
              </span>
              <span className="px-3 py-1 text-sm text-center transition-colors border cursor-pointer hover:bg-cheeseYellow hover:text-white hover:border-cheeseYellow rounded-xl border-gray1">
                + 100,000원
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="description"
              className="cursor-pointer text-heading3"
            >
              상품 설명
            </label>
            <Textarea
              id="description"
              placeholder="경매에 올릴 상품에 대해 자세히 설명해주세요.(최대 1,000자)"
              className="focus-visible:ring-cheeseYellow"
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="cursor-pointer text-heading3">경매 마감 시간</div>
            <Input
              type="text"
              defaultValue="24 시간"
              disabled
              className="text-gray2 border-gray2 bg-[#f1f1f1]"
            />
          </div>
        </form>
      ) : (
        <RegisterCaution check={check} clickCheck={clickCheck} name={caution} />
      )}
    </Layout>
  );
};

export default Register;
