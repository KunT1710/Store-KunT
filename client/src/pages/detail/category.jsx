import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.hooks";
import toSlug from "../../helper/toSlug";
import CategoryDetailContainer from "../../components/detail";

function DetailCategory() {
  const { slug } = useParams();
  const { data, loading, err } = useFetch(
    "http://localhost:5000/api/categories"
  );

  if (err) return <div>ERROR: {err.message}</div>;
  if (loading || !data) return <div>Loading...</div>;

  // Đảm bảo data là mảng
  const categoriesWithSlug = Array.isArray(data)
    ? data.map((cat) => ({
        ...cat,
        slug: toSlug(cat.name),
      }))
    : [];

  const category = categoriesWithSlug.find((cat) => cat.slug === slug);

  if (!category) return <div>Không tìm thấy danh mục</div>;

  return <CategoryDetailContainer category={category} />;
}

export default DetailCategory;
