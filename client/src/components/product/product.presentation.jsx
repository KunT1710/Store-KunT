import Banner2Container from "../banner-2/banner2.container";
import CategorySeclection from "../category.selections";
function ProductPresentation({ category, products }) {
  return (
    <>
      <Banner2Container bannerUrl={category.bannerCover} />
      <CategorySeclection categoryName={category.name} products={products} />
    </>
  );
}

export default ProductPresentation;
