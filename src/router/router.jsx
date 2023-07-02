import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Public/Home/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ShopPage from "../pages/Public/Shop/ShopPage";
import AboutPage from "../pages/Public/About/AboutPage";
import ContractPage from "../pages/Public/Contract/ContractPage";
import ProductDetailsPage from "../pages/Public/Shop/ProductDetailsPage";

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
        path: "/contract",
        element: <ContractPage></ContractPage>,
      },
      {
        path: "/about",
        element: <AboutPage></AboutPage>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
