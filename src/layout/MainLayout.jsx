import { Outlet } from "react-router-dom";
import NavigationBar from "../pages/Public/Shared/NavigationBar";
const MainLayout = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Outlet></Outlet>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
