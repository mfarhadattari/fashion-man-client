import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }) => {
  const isActive = useLocation().pathname == to;
  // console.log(isActive, useLocation().pathname);
  return (
    <li className="font-medium text-lg list-none">
      <Link to={to} className={isActive ? "border-b-2 rounded-none" : ""}>
        {children}
      </Link>
    </li>
  );
};

export default NavLink;
