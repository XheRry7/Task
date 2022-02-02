import Navbar2 from "../../../dashboard/navbar2";
import Sidebar from "../../../dashboard/sidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import "./profile.css"
const Profile = () => {
  const token = localStorage.getItem('Token');
  const [state, setstate] = useState([])
  const [comments, setcomments] = useState([])
  const [name, setname] = useState("")
  useEffect(() => {
    axios.get(`https://taskforum.herokuapp.com/api/comment/user/${localStorage.getItem('Id')}`, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
      if (res.status === 200) {
        setcomments(res.data.data)
      }
    }).catch(err => console.log(err.message))
    axios.get(`https://taskforum.herokuapp.com/api/post/user/${localStorage.getItem('Id')}`, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
      if (res.status === 200) {
        setstate(res.data.data);
      }
    }).catch(err => console.log(err.message))
    axios.get(`https://taskforum.herokuapp.com/api/users/${localStorage.getItem('Id')}`, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
      if (res.status === 200) {
        setname(res.data.data.name);
      }
    }).catch(err => console.log(err.message)

    )
  }, []);
  return (
    <div className="Main-bodys">
      <Navbar2 />
      <div className="Mainbodys">
        <div className="side-bar">
          <div className="left">
            <Sidebar />
          </div>
        </div>
        <div className="mainbody">
          <h1>Posts</h1>
          <div >
            {state && state.length && state.map((e, id) => {
              return (
                <div className="post" key={id}>
                  <h3> <i class="fas fa-user"></i> {name}</h3>
                  <h3 >{e.title}</h3>
                  <p>{e.description}</p>
                  <h5>{e.category}</h5>
                </div>
              )
            })}
          </div>
          <div >
            <h1>Comments of user on posts</h1>
            {comments.map((x, idx) => {
              return (
                <>
                  <div className="post" key={idx}>
                    <h3> <i class="fas fa-user"></i> Post</h3>
                    <h3 >{x.post.title}</h3>
                    <p>{x.post.description}</p>
                    <h5>{x.post.category}</h5>
                    <h3><i class="fas fa-user"></i> Comment </h3>
                    <p className="comment">{x.comment}</p>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </div >
  )
}
export default Profile;