import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Navigation() {
  return (
    <nav className="header">
      <div className="header-right">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/collection"}>Collection</NavLink>
        <NavLink to={"/contact"}>Contact</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/policy"}>Policy</NavLink>
      </div>

      <div className="header-left">
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Signup</Link>
        <Link to={"/shopping-cart"}>
          <FaShoppingCart />
        </Link>
      </div>
    </nav>
  );
}
