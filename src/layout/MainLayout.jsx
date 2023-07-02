import { Outlet } from "react-router-dom";
import NavigationBar from "../pages/Public/Shared/NavigationBar";
import Footer from "../pages/Public/Shared/Footer";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div>
        <NavigationBar></NavigationBar>
        <Outlet></Outlet>
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
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
