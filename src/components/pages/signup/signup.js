import react from "react";
import { useState } from "react";
import './signup.css'
import Navbar from "../../../dashboard/navbar";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("")
  const [data, setdata] = useState("")

  const emailhandler = (data) => {
    setemail(data)
  }
  const passwordhandler = (e) => {
    setpassword(e)
  }
  const namehandler = (e) => {
    setname(e)
  }
  const backhandler = () => {
    history.push({ pathname: "/" })
  }

  const Submithandler = e => {
    e.preventDefault();

    let body = { name: name, email: email, password: password }

    axios.post('https://taskforum.herokuapp.com/api/auth/signup', body).then(res => {
      if (res.status === 200) {
        setdata(res.data);
        alert(res.data.message)
      }
    }).catch(err => console.log(err.message))
    history.push({ pathname: "/" })
  }
  return (
    <>
      <Navbar />
      <div className="contain">
        <div className="data">
          <em>SignUp </em>
          <form onSubmit={Submithandler}>
            <input type="text" placeholder="Enter Your Name" onChange={e => namehandler(e.target.value)} required />
            <input type="email" placeholder="Enter your email" onChange={e => emailhandler(e.target.value)} required />
            <input type="password" placeholder="Enter password" onChange={e => passwordhandler(e.target.value)} required />
            <button type="submit">Sign Up</button>
            <button onClick={backhandler}>Cancel</button>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUp;