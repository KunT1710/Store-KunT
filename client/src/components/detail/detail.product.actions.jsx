import "./detail.product.actions.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateCart, fetchCart } from "../../reduxs/cart.thunk";
import { useEffect } from "react";
import { useAlert } from "../alert";

function ProductPurchaseActions({ product }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { items } = useSelector((state) => state.cart);
  const {showSuccess, showError } = useAlert();
  // Đảm bảo đã có giỏ hàng khi vào trang chi tiết
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user]);

  const handleBuy = () => {
    // TODO: Điều hướng tới thanh toán
    console.log("MUA:", product.name);
  };

  const handleAddToCart = () => {
    if (!user?._id) {
      showError("Bạn cần đăng nhập để thêm vào giỏ hàng");
      return;
    }
    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const exist = items.find((item) => item.product._id === product._id);
    let newItems;
    if (exist) {
      // Nếu đã có, tăng số lượng
      newItems = items.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Nếu chưa có, thêm mới
      newItems = [
        ...items,
        { product: product._id, quantity: 1 }
      ];
    }
    showSuccess("Thêm vào giỏi hàng thành công!");
    dispatch(updateCart({ userId: user._id, items: newItems }));
  };

  return (
    <div className="purchase-box">
      <h3 className="product-name">{product?.name || "Tên sản phẩm mẫu"}</h3>

      <button className="buy-btn" onClick={handleBuy}>
        MUA
      </button>

      <button className="cart-btn" onClick={handleAddToCart}>
        Thêm vào giỏ hàng
      </button>
    </div>
  );
}

export default ProductPurchaseActions;
