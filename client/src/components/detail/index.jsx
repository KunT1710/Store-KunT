import { useFetch } from "../../hooks/useFetch.hooks";
import CategoryDetail from "./detail.category";
function CategoryDetailContainer({ category }) {
  if (!category) return <div>Không tìm thấy danh mục</div>;
  const {
    data: products,
    loading,
    err,
  } = useFetch(`http://localhost:5000/api/products/allproduct=${category._id}`);

  if (err) {
    return <div>ERROR: {err.message}</div>;
  }

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <CategoryDetail category={category} products={products} />
    </>
  );
}
export default CategoryDetailContainer;
