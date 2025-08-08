// components/home/HomePage.container.jsx
import { useFetch } from "../../hooks/useFetch.hooks";
import HomePage from "./home.page.presentation";
import { useState, useEffect, useMemo } from "react";

function HomePageContainer() {
  const {
    data: listCategory,
    loading,
    err,
  } = useFetch("http://localhost:5000/api/categories/info");

  const [productsByCategory, setProductsByCategory] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const listID = useMemo(() => {
    return listCategory?.map((item) => item._id) || [];
  }, [listCategory]);

// console.log("productsError: ",productsError);
// console.log("List ID SP: ", listID);
  const fetchProductsForCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/categories=${categoryId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { categoryId, products: data };
    } catch (error) {
      console.error(
        `Error fetching products for category ${categoryId}:`,
        error
      );
      return { categoryId, products: [], error: error.message };
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!listID || listID.length === 0) return;

      setLoadingProducts(true);
      setProductsError(null);

      try {
        // Sử dụng Promise.allSettled để không bị fail khi một API lỗi
        const promises = listID.map((categoryId) =>
          fetchProductsForCategory(categoryId)
        );
        const results = await Promise.allSettled(promises);

        const newProductsByCategory = {};

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            const { categoryId, products, error } = result.value;
            if (error) {
              console.warn(
                `Failed to fetch products for category ${categoryId}:`,
                error
              );
              newProductsByCategory[categoryId] = [];
            } else {
              newProductsByCategory[categoryId] = products;
            }
          } else {
            console.error(
              `Promise rejected for category ${listID[index]}:`,
              result.reason
            );
            newProductsByCategory[listID[index]] = [];
          }
        });

        setProductsByCategory(newProductsByCategory);
      } catch (error) {
        console.error("Error fetching all products:", error);
        setProductsError(error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchAllProducts();
  }, [listID]);

  if (err) {
    return <div>Lỗi lấy danh sách categories: {err.message}</div>;
  }

  if (loading) {
    return <div>Loading categories...</div>;
  }

  const banner3Images = [
    "https://theme.hstatic.net/1000288770/1000794542/14/home_banner_image_1.jpg?v=146",
    "https://theme.hstatic.net/1000288770/1000794542/14/home_banner_image_2.jpg?v=146",
    "https://theme.hstatic.net/1000288770/1000794542/14/home_banner_image_3.jpg?v=146",
  ];
// console.log(productsByCategory);
  return (
    <HomePage
    banner3Images={banner3Images}
    productsByCategory={productsByCategory}
    loadingProducts={loadingProducts}
    categories={listCategory}
    />
  );
}

export default HomePageContainer;
