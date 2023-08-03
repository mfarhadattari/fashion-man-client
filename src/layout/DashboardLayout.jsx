import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import { FaGear, FaXmark } from "react-icons/fa6";
import NavigationBar from "./../pages/Public/Shared/NavigationBar";
import NavLink from "../components/NavLink";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import useIsAdmin from "../hooks/useIsAdmin";

const userOptions = [
  {
    path: "/dashboard/user-home",
    name: "User Home",
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
  },
  {
    path: "/dashboard/orders",
    name: "Orders",
  },
  {
    path: "/dashboard/payment-history",
    name: "Payment History",
  },
];

const adminOptions = [
  {
    path: "/dashboard/admin-home",
    name: "Admin Home",
  },
  {
    path: "/dashboard/all-products",
    name: "All Products",
  },
  {
    path: "/dashboard/add-product",
    name: "Add Product",
  },
  {
    path: "/dashboard/all-customers",
    name: "All Customers",
  },
  {
    path: "/dashboard/all-orders",
    name: "All Orders",
  },
  {
    path: "/dashboard/our-teams",
    name: "Our Team",
  },
  {
    path: "/dashboard/all-payments",
    name: "Payments",
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
  },
];

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isAdminLoading } = useIsAdmin();
  const options = isAdmin && !isAdminLoading ? adminOptions : userOptions;
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar></NavigationBar>
      <div className="h-full w-full flex">
        <div className="w-1/4 hidden lg:block">
          <ul className="menu px-1 fixed">
            {options.map((option) => (
              <NavLink key={option.path} to={option.path}>
                {option.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-3/4 relative">
          <ul
            className={`menu bg-slate-950 text-white lg:hidden w-[200px] absolute z-40 ${
              isOpen ? "top-0 right-0" : "hidden"
            }`}
          >
            {options.map((option) => (
              <NavLink key={option.path} to={option.path}>
                {option.name}
              </NavLink>
            ))}
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden absolute top-5 right-5 text-3xl btn btn-circle z-50"
          >
            <span className="animate-spin">
              {isOpen ? <FaXmark></FaXmark> : <FaGear></FaGear>}
            </span>
          </button>
          <div className="mt-10 lg:mt-0">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <ScrollToTop
        smooth
        component={
          <span className="btn btn-circle btn-outline text-xl text-red-500">
            <FaArrowUp></FaArrowUp>
          </span>
        }
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default DashboardLayout;
