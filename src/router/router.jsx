import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Public/Home/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ShopPage from "../pages/Public/Shop/ShopPage";
import AboutPage from "../pages/Public/About/AboutPage";
import ContractPage from "../pages/Public/Contract/ContractPage";
import ProductDetailsPage from "../pages/Public/Shop/ProductDetailsPage";
import DashboardLayout from "../layout/DashboardLayout";
import LoginPage from "../pages/Public/Account/LoginPage";
import RegistrationPage from "../pages/Public/Account/RegistrationPage";
import ProtectedRouter from "./ProtectedRouter";
import ProfilePage from "../pages/Dashboard/Profile/ProfilePage";
import CartPage from "../pages/Public/Cart/CartPage";
import CheckoutPage from "../pages/Public/Cart/CheckoutPage";
import PaymentSuccessPage from "../pages/Public/Cart/PaymentSuccessPage";
import PaymentFailedPage from "../pages/Public/Cart/PaymentFailed";
import OrderPage from "../pages/Public/Cart/OrderPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRouter>
            <CartPage />
          </ProtectedRouter>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccessPage />,
      },
      {
        path: "/payment-fail",
        element: <PaymentFailedPage />,
      },
      {
        path: "/contract",
        element: <ContractPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRouter>
        <DashboardLayout />
      </ProtectedRouter>
    ),
    children: [
      {
        path: "/dashboard",
        element: <>Dashboard</>,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
