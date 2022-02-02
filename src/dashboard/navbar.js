import react from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-free/css/all.min.css'
import './navbar.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Login from "../components/pages/login/login";
const Navbar = () => {
  return (
    <div className="container">
      <div className="body">
        <ul className="left-side">
          <i className="fab fa-instagram"></i>
          <li>Instagram</li>
        </ul>
        <ul className="right-side">
          <div>
            <button>  <Link to="/">Login </Link></button>
            <button>  <Link to="/signup">Signup </Link></button>
          </div>
        </ul>
      </div>
    </div>

  )
}

export default Navbar;