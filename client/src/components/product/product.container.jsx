import ProductPresentation from "./product.presentation";

function ProductContainer({ category, products, loading, index }) {
  if (loading) return <div>Loading products...</div>;
  if (!products || products.length === 0) return null;

  const themeClass = index % 2 === 0 ? "theme-1" : "theme-2";
  return (
    <div className={`product-block ${themeClass}`}>
      <ProductPresentation
        category={category}
        products={products}
      />
    </div>
  );
}

export default ProductContainer;
