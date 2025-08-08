import ForgotPassPage from "../pages/Account/forgotPass.page";
import HomePage from "../pages/HomePage/home.page.container";
import MainLayout from "../pages/main.layout";
import RegisterPage from "../pages/Account/register.page";
import LoginPage from "../pages/Account/login.page";
import DetailCategory from "../pages/detail/category";
import CallAPIDetailProduct from "../components/detail/callAPI.detailProduct";
import AboutPage from "../pages/AboutPage";
import TermsOfServicePage from "../pages/TermsOfService";
import ReturnPolicyPage from "../pages/ReturnPolicy";
import PrivacyPolicyPage from "../pages/PrivacyPolicy";
import PaymentPolicyPage from "../pages/PaymentPolicy";
import OrderTrackingPage from "../pages/OrderTracking";
import ShoppingGuidePage from "../pages/ShoppingGuied";
import ProductSearchGuidePage from "../pages/ProductsSearch";
import DetailUser from "../pages/Account/detail.user";
import DetailInfo from "../pages/Account/detail.user/detail.user";
import Cart from "../pages/Cart";
import PayMent from "../pages/Payment";
import Voucher from "../pages/Voucher";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },

      {
        path: "/category/:slug",
        element: <DetailCategory />,
      },
      {
        path: "/product/:id",
        element: <CallAPIDetailProduct />,
      },
      {
        path: "/gioi-thieu",
        element: <AboutPage />,
      },
      {
        path: "/dieu-khoan-dich-vu",
        element: <TermsOfServicePage />,
      },
      {
        path: "/chinh-sach-doi-tra",
        element: <ReturnPolicyPage />,
      },
      {
        path: "/chinh-sach-bao-mat",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/phuong-thuc-thanh-toan",
        element: <PaymentPolicyPage />,
      },
      {
        path: "/kiem-tra-don-hang",
        element: <OrderTrackingPage />,
      },
      {
        path: "/huong-dan-mua-hang",
        element: <ShoppingGuidePage />,
      },
      {
        path: "/tim-kiem-san-pham",
        element: <ProductSearchGuidePage />,    
      },
      {
        path: "/cart",
        element: <Cart />,
      },{
        path:"/payment",
        element: <PayMent/>
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgotpass",
    element: <ForgotPassPage />,
  },
  {
    path: "/update-info",
    element: <DetailUser />,
  },
  {
    path:"/info-user",
    element: <DetailInfo />,
  },
  {
    path: "/voucher",
    element: <Voucher />,
  }
];
