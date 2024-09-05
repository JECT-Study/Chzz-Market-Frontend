import type { PreEnrollProduct, Product } from 'Product';
import {
  useGetBestProducts,
  useGetDeadlineProducts,
  useGetPreEnrollProducts,
  useRefreshTokenOnSuccess,
} from '@/components/home/queries';

import CategoryList from '@/components/home/CategoryList';
import HomeItemList from '@/components/home/HomeItemList';
import HomeProductItem from '@/components/home/HomeProductItem';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import Layout from '@/components/Layout';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';
import { useScrollDetection } from '@/hooks/useScrollDetection';

const Home = () => {
  const navigate = useNavigate();
  const { isScrolled, elementRef } = useScrollDetection(0);
  useRefreshTokenOnSuccess();

  const { isBestLoading, bestItems } = useGetBestProducts();
  const { isDeadlineLoading, deadlineItems } = useGetDeadlineProducts();
  const { isPreEnrollLoading, preEnrollItems } = useGetPreEnrollProducts();

  const loadingState = isBestLoading || isDeadlineLoading || isPreEnrollLoading;

  return (
    <Layout>
      <Layout.Header handleBack={() => navigate('/')}>치즈 마켓</Layout.Header>
      <Layout.Main>
        {!loadingState ? (
          <div
            ref={elementRef}
            role="main"
            aria-label="main_area"
            className="relative flex flex-col w-full gap-6 overflow-y-scroll"
          >
            <HomeItemList name="베스트 경매">
              {bestItems?.map((product: Product, idx) => (
                <HomeProductItem
                  key={product.id}
                  kind="best"
                  product={product}
                  idx={idx}
                />
              ))}
            </HomeItemList>
            <HomeItemList name="종료 임박 경매">
              {deadlineItems?.map((product: Product, idx) => (
                <HomeProductItem
                  key={product.id}
                  kind="deadline"
                  product={product}
                  idx={idx}
                />
              ))}
            </HomeItemList>
            <HomeItemList name="카테고리">
              <CategoryList />
            </HomeItemList>
            <HomeItemList name="사전 등록 경매">
              {preEnrollItems?.map((product: PreEnrollProduct, idx) => (
                <HomeProductItem
                  key={product.id}
                  kind="pre_enroll"
                  product={product}
                  idx={idx}
                />
              ))}
            </HomeItemList>
            <HomeRegisterBtn isScrolled={isScrolled} />
          </div>
        ) : (
          <p>Loading</p>
        )}
      </Layout.Main>
      <Layout.Footer>
        <Navigation active="home" />
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
