import { Button, Input, httpClient } from '@/shared';
import { useEffect, useState } from 'react';

import { Layout } from '@/app/layout';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

export const Test = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minPrice, setMinPrice] = useState(1000);

  const clickButton = async () => {
    await httpClient.post(
      `/api/v1/auctions/test?seconds=${state}&name=${name}&description=${description}&status=${'proceeding'}&minPrice=${minPrice}`
    );
    navigate('/');
  };

  useEffect(() => {
    if (import.meta.env.MODE !== 'development') {
      throw new AxiosError('접근 권한', '403');
    }
  });

  return (
    <Layout>
      <Layout.Header title="테스트" />
      <Layout.Main>
        <div className="flex flex-col items-center justify-center w-full h-full gap-5">
          <label className="text-heading1">시간 입력</label>
          <Input onChange={(e) => setState(Number(e.target.value))} />
          <label className="text-heading1">이름</label>
          <Input onChange={(e) => setName(e.target.value)} />
          <label className="text-heading1">설명</label>
          <Input onChange={(e) => setDescription(e.target.value)} />
          <label className="text-heading1">가격</label>
          <Input onChange={(e) => setMinPrice(Number(e.target.value))} />
          <Button
            type="button"
            color="cheeseYellow"
            className="w-full"
            onClick={clickButton}
          >
            테스트
          </Button>
        </div>
      </Layout.Main>
    </Layout>
  );
};
