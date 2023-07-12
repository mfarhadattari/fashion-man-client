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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/shop",
        element: <ShopPage></ShopPage>,
      },
      {
        path: "/shop/:id",
        element: <ProductDetailsPage></ProductDetailsPage>,
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
        path: "/contract",
        element: <ContractPage></ContractPage>,
      },
      {
        path: "/about",
        element: <AboutPage></AboutPage>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/registration",
        element: <RegistrationPage></RegistrationPage>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRouter>
        <DashboardLayout></DashboardLayout>
      </ProtectedRouter>
    ),
    children: [
      {
        path: "/dashboard",
        element: <>Dashboard</>,
      },
      {
        path: "profile",
        element: <ProfilePage></ProfilePage>,
      },
      {
        path: "checkout",
        element: <>Checkout Page</>,
      },
      {
        path: "orders",
        element: <>Orders Page</>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
