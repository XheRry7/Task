import { Link } from "react-router-dom";

const Navbar2 = () => {
  const logouthandler = () => {
    localStorage.removeItem("Token")
  }
  return (
    <div className="container">
      <div className="body">
        <ul className="left-side">
          <i class="fab fa-instagram"></i>
          <li>Instagram</li>
        </ul>
        <ul className="right-side">
          <div>
            <button onClick={logouthandler}><Link to="/">Log Out </Link></button>
          </div>
        </ul>
      </div>
    </div >
  )
}

export default Navbar2;