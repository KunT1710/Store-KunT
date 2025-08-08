import Header from "../../components/header";
import Banner1 from "../../components/banner-1";
import Category from "../../components/categorys";
import Flashsale from "../../components/flash-sale/index.container";
import Banner3 from "../../components/banner-3";
import Product from "../../components/product/product.container";

function HomePage({banner3Images, productsByCategory, categories, loadingProducts }) {
  return (
    <>
      {/* <Header /> */}
      <Banner1 />
      <Category />
      <Flashsale />
      {categories?.map((category, idx) => (
        <Product
          key={category._id}
          category={category}
          products={productsByCategory[category._id] || []}
          loading={loadingProducts}
          index={idx}
        />
      ))}
      <Banner3 images={banner3Images} />
    </>
  );
}

export default HomePage;
