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
import ProfilePage from "../pages/Public/Account/ProfilePage";
import CartPage from "../pages/Public/Cart/CartPage";
import CheckoutPage from "../pages/Public/Orders/CheckoutPage";
import PaymentSuccessPage from "../pages/Public/Orders/PaymentSuccessPage";
import PaymentFailedPage from "../pages/Public/Cart/PaymentFailed";
import OrderPage from "../pages/Public/Orders/OrderPage";
import PaymentHistory from "../pages/Public/Cart/PaymentHistory";
import UserHomePage from "../pages/Public/UserHome/UserHomePage";
import AdminOnlyRoute from "./AdminOnlyRoute";
import AllProductsPage from "../pages/admin/Products/AllProductsPage";
import AddProductPage from "../pages/admin/Products/AddProductPage";
import UpdateProductPage from "../pages/admin/Products/UpdateProductPage";
import AllCustomerPage from "../pages/admin/Customer/AllCustomerPage";
import AllOrderPage from "../pages/admin/Orders/AllOrderPage";
import AllPaymentPage from "../pages/admin/Payments/AllPaymentPage";
import AdminHomePage from "../pages/admin/AdminHome/AdminHomePage";
import CustomerDetailsPage from "../pages/admin/Customer/CustomerDetailsPage";
import OrderDetailsPage from "../pages/admin/Orders/OrderDetailsPage";
import TeamPage from "../pages/admin/Teams/TeamsPage";
import AddTeamPage from "../pages/admin/Teams/AddTeamPage";

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
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "order/:id",
        element: <OrderDetailsPage />,
      },
      // ! user route
      {
        path: "user-home",
        element: <UserHomePage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },

      // ! Admin route
      {
        path: "admin-home",
        element: (
          <AdminOnlyRoute>
            <AdminHomePage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminOnlyRoute>
            <AllProductsPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <AdminOnlyRoute>
            <AddProductPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <AdminOnlyRoute>
            <UpdateProductPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "all-customers",
        element: (
          <AdminOnlyRoute>
            <AllCustomerPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "customer/:id",
        element: (
          <AdminOnlyRoute>
            <CustomerDetailsPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminOnlyRoute>
            <AllOrderPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "our-team-members",
        element: (
          <AdminOnlyRoute>
            <TeamPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "add-team-member",
        element: (
          <AdminOnlyRoute>
            <AddTeamPage />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "all-payments",
        element: (
          <AdminOnlyRoute>
            <AllPaymentPage />
          </AdminOnlyRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
