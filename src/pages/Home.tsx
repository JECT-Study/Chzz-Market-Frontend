import type { PreRegisterProduct, Product } from 'Product';
import {
  useGetBestProducts,
  useGetImminentProducts,
  useGetPreRegisterProducts,
} from '@/components/home/queries';

import CategoryList from '@/components/home/CategoryList';
import HomeItemList from '@/components/home/HomeItemList';
import HomeProductItem from '@/components/home/HomeProductItem';
import HomeRegisterBtn from '@/components/home/HomeRegisterBtn';
import Layout from '@/components/layout/Layout';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';
import { useScrollDetection } from '@/hooks/useScrollDetection';

const Home = () => {
  const navigate = useNavigate();
  const { isScrolled, elementRef } = useScrollDetection(0);

  const { isBestLoading, bestProducts } = useGetBestProducts();
  const { isImminentLoading, imminentProducts } = useGetImminentProducts();
  const { isPreRegisterLoading, preRegisterProducts } =
    useGetPreRegisterProducts();

  const loadingState =
    isBestLoading || isImminentLoading || isPreRegisterLoading;

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
              {bestProducts?.map((product: Product, idx) => (
                <HomeProductItem
                  key={product.id}
                  kind="best"
                  product={product}
                  idx={idx}
                />
              ))}
            </HomeItemList>
            <HomeItemList name="종료 임박 경매">
              {imminentProducts?.map((product: Product, idx) => (
                <HomeProductItem
                  key={product.id}
                  kind="imminent"
                  product={product}
                  idx={idx}
                />
              ))}
            </HomeItemList>
            <HomeItemList name="카테고리">
              <CategoryList />
            </HomeItemList>
            <HomeItemList name="사전 등록 경매">
              {preRegisterProducts?.map((product: PreRegisterProduct, idx) => (
                <HomeProductItem
                  key={product.id}
                  kind="pre-register"
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
      <Layout.Footer type="single">
        <Navigation active="home" />
      </Layout.Footer>
    </Layout>
  );
};

export default Home;
