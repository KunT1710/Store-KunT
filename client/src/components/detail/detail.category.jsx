import Banner2Container from "../banner-2/banner2.container";
import CategorySeclection from "../category.selections";

function CategoryDetail({ category, products }) {

  if (!category) return null;
  if (!products) return null;
  
  const { name, bannerImage } = category;

  const chunkSize = 4;
  const productGroups = [];

  for (let i = 0; i < products.length; i += chunkSize) {
    productGroups.push(products.slice(i, i + chunkSize));
  }

  const result = [];
  const minLength = Math.min(bannerImage.length, productGroups.length);

  for (let i = 0; i < minLength; i++) {
    result.push({ banner: bannerImage[i], products: productGroups[i] });
  }

  for (let i = minLength; i < bannerImage.length; i++) {
    result.push({ banner: bannerImage[i] });
  }

  for (let i = minLength; i < productGroups.length; i++) {
    result.push({ products: productGroups[i] });
  }

  return (
    <>
      {result.map((item, index) => (
        <div key={index}>
          {item.products && (
            <CategorySeclection categoryName={name} products={item.products} showMore={false} />
          )}
          {item.banner && (
            <Banner2Container bannerUrl={item.banner} />
          )}
        </div>
      ))}
    </>
  );
}

export default CategoryDetail;
