import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Button from '@/components/common/Button';
import ImageUploader from '@/components/register/ImageUploader';
import { Input } from '@/components/ui/input';
import Layout from '@/components/Layout';
import RegisterCaution from '@/components/register/RegisterCaution';
import RegisterLabel from '@/components/register/RegisterLabel';
import { Textarea } from '@/components/ui/textarea';
import { categories } from '@/constants/categories';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {
  const [caution, setCaution] = useState<string>('');
  const [check, setCheck] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  const title = caution === '' ? '경매 등록하기' : `${caution} 주의사항`;
  const cautionButton =
    caution === 'enroll' ? '경매 등록하기' : '사전 등록하기';

  const clickCheck = () => setCheck((state) => !state);
  const clickBack = () => (caution === '' ? navigate('/') : setCaution(''));

  return (
    <Layout>
      <Layout.Header handleBack={clickBack}>{title}</Layout.Header>
      <Layout.Main>
        {caution === '' ? (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col pt-5 gap-7"
          >
            <ImageUploader images={images} setImages={setImages} />
            <RegisterLabel title="제목">
              <Input
                id="제목"
                type="text"
                placeholder="제목을 입력해주세요."
                className="focus-visible:ring-cheeseYellow"
              />
            </RegisterLabel>
            <RegisterLabel title="카테고리">
              <Select>
                <SelectTrigger
                  id="카테고리"
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
            </RegisterLabel>
            <RegisterLabel title="시작 가격">
              <Input
                id="시작 가격"
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
            </RegisterLabel>
            <RegisterLabel title="상품 설명">
              <Textarea
                id="상품 설명"
                placeholder="경매에 올릴 상품에 대해 자세히 설명해주세요.(최대 1,000자)"
                className="focus-visible:ring-cheeseYellow"
              />
            </RegisterLabel>
            <RegisterLabel title="경매 마감 시간">
              <Input
                id="경매 마감 시간"
                type="text"
                defaultValue="24 시간"
                disabled
                className="text-gray2 border-gray2 bg-[#f1f1f1]"
              />
            </RegisterLabel>
          </form>
        ) : (
          <RegisterCaution
            check={check}
            handleCheck={clickCheck}
            kind={caution}
          />
        )}
      </Layout.Main>
      <Layout.Footer>
        <div className="flex items-center h-full gap-3">
          {caution === '' ? (
            <>
              <Button
                type="button"
                color="white"
                className="w-full py-3 rounded-lg active:bg-black active:text-white text-button border-gray"
                size="medium"
                onClick={() => setCaution('pre-enroll')}
              >
                사전 등록하기
              </Button>
              <Button
                type="button"
                color="bg-cheeseYellow"
                className="w-full py-3 text-white rounded-lg active:bg-black text-button bg-cheeseYellow"
                size="medium"
                onClick={() => setCaution('enroll')}
              >
                바로 등록하기
              </Button>
            </>
          ) : (
            <Button
              type="button"
              color="bg-cheeseYellow"
              className="grow-[2] w-full active:bg-black rounded-lg text-button py-3 bg-cheeseYellow text-white"
              size="medium"
              onClick={() => setCaution('')}
            >
              {cautionButton}
            </Button>
          )}
        </div>
      </Layout.Footer>
    </Layout>
  );
};

export default Register;
