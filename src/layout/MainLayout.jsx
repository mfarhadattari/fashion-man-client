import { Outlet, useLocation, useParams } from "react-router-dom";
import NavigationBar from "../pages/Public/Shared/NavigationBar";
import Footer from "../pages/Public/Shared/Footer";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
const MainLayout = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const withoutFooter =
    pathname === "/login" ||
    pathname === "/registration" ||
    pathname === `/shop/${id}`;

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div>
        <NavigationBar></NavigationBar>
        <div className="max-w-7xl mx-auto ">
          <Outlet></Outlet>
        </div>
      </div>
      <ScrollToTop
        smooth
        component={
          <span className="btn btn-circle btn-outline text-xl text-green-500">
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
      {!withoutFooter && <Footer></Footer>}
    </div>
  );
};

export default MainLayout;
