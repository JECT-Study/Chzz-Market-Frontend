import Button from "@/components/common/Button";
import Layout from "@/components/layout/Layout";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryAddressAdd = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  return (
    <Layout>
      <Layout.Header title="배송지 목록" handleBack={() => navigate('/')} />
      <Layout.Main>
        <div></div>
      </Layout.Main>
      <Layout.Footer type="single">
        <Button
          type="submit"
          className="w-full h-[47px] rounded-lg"
          color="cheeseYellow"
          onClick={handleSubmitClick}
        >
          저장하기
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export default DeliveryAddressAdd;