import { useHistory } from "react-router-dom";
import { useState } from "react";
const Sidebar = () => {

  const history = useHistory();
  const [data, setdata] = useState("")

  const Postshandler = () => {
    history.push({ pathname: "/feed" })
  }
  const Settingshandler = () => {
    history.push({ pathname: "/Settings" })
  }

  const profilepageshandler = () => {
    history.push({ pathname: "/profile" })
  }


  return (
    <div >
      <ul>
        <li> <a onClick={Postshandler}> Posts</a></li>
        <li> <a onClick={Settingshandler}>Settings</a></li>
        <li><a onClick={profilepageshandler}>Profile Page</a></li>
      </ul>
    </div>
  )
}
export default Sidebar;