import { httpClient } from "@/api/axios";
import Button from "@/components/common/Button";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [state, setState] = useState(0)
  const navigate = useNavigate()

  const clickButton = async () => {
    await httpClient.post(`/api/v1/auctions/test?seconds=${state}`)
    navigate('/')
  }
  return (
    <Layout>
      <Layout.Header title="테스트" />
      <Layout.Main>
        <div className="flex flex-col items-center justify-center w-full h-full gap-5">
          <label className="text-heading1">시간 입력</label>
          <Input onChange={(e) => setState(Number(e.target.value))} />
          <Button type="button" color="cheeseYellow" className="w-full" onClick={clickButton} >
            테스트
          </Button>
        </div>
      </Layout.Main>
    </Layout>
  );
}

export default Test;
