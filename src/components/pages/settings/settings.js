import Navbar2 from "../../../dashboard/navbar2";
import Sidebar from "../../../dashboard/sidebar";
import { useState } from "react";
import axios from "axios";
import './settings.css'
const Settings = () => {
  const [name, setname] = useState("")
  const token = localStorage.getItem('Token');
  const Idgetted = localStorage.getItem('Id');

  const updatenamehandler = (e) => {
    setname(e)
  }
  let body = { name: name }
  const updatehandler = () => {
    axios.put(`http://localhost:5000/api/users/${Idgetted}`, body, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
      if (res.status === 200) {
        // alert("Your name has been updated")
      }
    }).catch(err => console.log(err.message))
  }
  return (
    <div className="Main-body">
      <Navbar2 />
      <div className="Mainbodys">
        <div className="side-bar">
          <div className="left">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="mainbody">
        <div className="post">
          <input type="text" placeholder="Update your name " onChange={e => updatenamehandler(e.target.value)} />
          <button className="submit" onClick={updatehandler}>Update</button>
        </div>
      </div>
    </div>
  );
}
export default Settings;