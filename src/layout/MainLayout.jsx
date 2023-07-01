import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
const MainLayout = () => {
  return (
    <div>
      <nav>
        <ThemeToggle></ThemeToggle>
      </nav>
      <Outlet></Outlet>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
