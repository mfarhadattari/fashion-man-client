import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/router";
import ThemeProvider from "./providers/ThemeProvider";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <div className="max-w-7xl mx-auto font-space-grotesk">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
