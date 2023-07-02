import NavLink from "../../../components/NavLink";
import { FaBars, FaCode } from "react-icons/fa";
import ThemeToggle from "./../../../components/ThemeToggle";
import useTheme from "../../../hooks/useTheme";
import { Link } from "react-router-dom";

const navOptions = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/shop",
    name: "Shop",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/contract",
    name: "Contract",
  },
];

const NavigationBar = () => {
  const { isDark } = useTheme();
  const user = false;
  return (
    <nav
      className={`navbar p-5 md:px-20 items-center sticky top-0 z-50 ${
        isDark ? "bg-slate-950" : "bg-green-600 text-white"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost text-3xl lg:hidden">
            <FaBars></FaBars>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
              isDark ? "bg-slate-800" : "bg-green-500"
            } `}
          >
            {navOptions.map((option) => (
              <NavLink key={option.path} to={option.path}>
                {option.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-semibold uppercase ">
          <div className="flex flex-col">
            <h1>Programmer</h1>
            <h1 className="flex justify-evenly items-center">
              <FaCode></FaCode>Fashion
            </h1>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navOptions.map((option) => (
            <NavLink key={option.path} to={option.path}>
              {option.name}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <NavLink to="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </NavLink>
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/icon.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
              isDark ? "bg-slate-800" : "bg-green-500"
            }`}
          >
            {user ? (
              <>
                <div className="flex justify-between items-center">
                  <NavLink to="/profile">Profile</NavLink>
                  <ThemeToggle></ThemeToggle>
                </div>
                <NavLink to="orders">Orders</NavLink>
                <button className="btn btn-sm mt-3 w-fit">Log Out</button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <NavLink to="/profile">Login</NavLink>
                <ThemeToggle></ThemeToggle>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
