import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/Public/Home/HomePage";

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
        path: "/shops",
        element: <>Shops</>,
      },
      {
        path: "/contract",
        element: <>Contract</>,
      },
      {
        path: "/about",
        element: <>About</>,
      },
    ],
  },
]);

export default router;
