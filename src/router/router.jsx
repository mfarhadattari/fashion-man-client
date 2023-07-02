import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Public/Home/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ShopPage from "../pages/Public/Shop/ShopPage";
import AboutPage from "../pages/Public/About/AboutPage";

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
        path: "/contract",
        element: <>Contract</>,
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
