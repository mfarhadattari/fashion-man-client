import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/router";
import ThemeProvider from "./providers/ThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <div className="max-w-7xl mx-auto font-space-grotesk">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
