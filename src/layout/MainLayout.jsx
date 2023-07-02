import { Outlet } from "react-router-dom";
import NavigationBar from "../pages/Public/Shared/NavigationBar";
import Footer from "../pages/Public/Shared/Footer";
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <NavigationBar></NavigationBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
