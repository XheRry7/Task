import { useState } from "react";
import './login.css'
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../dashboard/navbar";
const Login = () => {
  const history = useHistory();
  const [data, setdata] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const emailhandler = (data) => {
    setemail(data)
  }
  const passwordhandler = (e) => {
    setpassword(e)
  }
  const Submithandler = e => {
    e.preventDefault();
    let body = { email: email, password: password }
    axios.post('https://taskforum.herokuapp.com/api/auth/signin', body).then(res => {
      if (res.status === 200) {
        setdata(res.data);
        alert(res.data.message)
        localStorage.setItem('Token', res.data.token)
        localStorage.setItem('Id', res.data.id)
      }
    }).catch(err => console.log(err.message))
    history.push({ pathname: "/feed" })
  }
  return (
    <div className="mains">
      <div>
        <Navbar />
      </div>
      <div className="containers">
        <div className="bodys">
          <em>Instagram</em>
          <form onSubmit={Submithandler}>
            <input type="email" placeholder="Enter your email" onChange={e => emailhandler(e.target.value)} required />
            <input type="password" placeholder="Enter password" onChange={e => passwordhandler(e.target.value)} required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;