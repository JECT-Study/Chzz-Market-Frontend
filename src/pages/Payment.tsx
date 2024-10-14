import Layout from "@/components/layout/Layout";
import CheckoutPage from "@/components/payment/Checkout";

const Payment = () => {
  return (
    <Layout>
      <Layout.Header title='결제 페이지' />
      <Layout.Main>
        <CheckoutPage />
      </Layout.Main>
    </Layout>
  )
};

export default Payment;