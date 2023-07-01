import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <>Home</>,
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
