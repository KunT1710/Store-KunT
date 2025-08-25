import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.hooks";
import DetailProduct from "./detail.product.jsx";

function CallAPIDetailProduct() {
  const { id } = useParams();
  // console.log("CallAPIDetailProduct id:", id);
  const { data, loading, err } = useFetch(
    `http://localhost:5000/api/products/${id}/with-related`
  );
  // console.log("CallAPIDetailProduct data:", data);
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (err) return <div>Lỗi: {err.message}</div>;
  if (!data) return null;

  return <DetailProduct listProducts={data} />;
}

export default CallAPIDetailProduct;
