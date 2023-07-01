import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <nav>Navbar</nav>
      <Outlet></Outlet>
      <footer>Footer</footer>
    </div>
  );
};

export default MainLayout;
