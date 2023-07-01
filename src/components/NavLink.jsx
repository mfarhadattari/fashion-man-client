import { Link } from "react-router-dom";

const NavLink = ({ to, children }) => {
  return (
    <li className="font-medium text-lg list-none">
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavLink;
