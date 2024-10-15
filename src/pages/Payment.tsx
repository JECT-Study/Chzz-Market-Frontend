import Layout from "@/components/layout/Layout";
import CheckoutPage from "@/components/payment/Checkout";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { auctionId } = location.state;

  return (
    <Layout>
      <Layout.Header title='결제 페이지' />
      <Layout.Main>
        <CheckoutPage auctionId={auctionId} />
      </Layout.Main>
    </Layout>
  )
};

export default Payment;