import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Kanagana</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/practice">Practice</Link></li>
        <li><Link to="/progress">Progress</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
