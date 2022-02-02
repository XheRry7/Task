import { useState, useEffect } from "react";
import axios from "axios";
import Navbar2 from "../../../dashboard/navbar2";
import '@fortawesome/fontawesome-free/css/all.min.css'
import "./feed.css"
import Sidebar from "../../../dashboard/sidebar";
import Collapsible from "react-collapsible";
const Feed = () => {
  const [state, setstate] = useState([]);
  const [comments, setcomments] = useState([])
  const [inputdata, setinputdata] = useState([]);
  const [name, setname] = useState("")
  const [falsy, setfalsy] = useState(false)
  const [updatevalue, setupdatevalue] = useState("")
  const [commentid, setcommentid] = useState("")
  const [deletecommentid, setdeletecommentid] = useState("")
  const [updatedpostvalue, setupdatedpostvalue] = useState("")
  const [commentpostid, setcommentpostid] = useState("")
  const [postid, setpostid] = useState("")
  const [post, setpost] = useState(false)
  const token = localStorage.getItem('Token');
  const Idgetted = localStorage.getItem('Id');

  let arr = []
  const commenthandler = (e, id) => {
    setinputdata(e)
    setcommentpostid(id)
  }
  const inputsubmithandler = () => {
    let body = {
      user: Idgetted,
      comment: inputdata,
      post: commentpostid
    }
    axios.post(`https://taskforum.herokuapp.com/api/comment/`, body, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {    // for posting comment
      if (res.status === 200) {
        setinputdata(res.data.data.data)
      }
    }).catch(err => console.log(err.message))
  }
  useEffect(() => {
    axios.get('https://taskforum.herokuapp.com/api/post/', { headers: { "Authorization": `Bearer ${token}` } }).then(res => {      // for getting post
      if (res.status === 200) {

        setstate(res.data.data)
      };
    }).catch(err => console.log(err.message))
    axios.get('https://taskforum.herokuapp.com/api/comment/', { headers: { "Authorization": `Bearer ${token}` } }).then(res => {   //for getting comments
      if (res.status === 200) {
        setcomments(res.data.data)
      };
    }).catch(err => console.log(err.message))

  }, [comments, state]);
  if (name.id === Idgetted) {
    setname(name.name);
  }

  useEffect(() => {
    axios.get(`https://taskforum.herokuapp.com/api/users/${Idgetted}`, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {    //for getting user 
      if (res.status === 200) {
        setname(res.data.data.name);
      }
    }).catch(err => console.log(err.message))
  })


  const edithandler = (x) => {
    setfalsy(true)
    setcommentid(x)
  }
  const editedvalue = (e) => {
    setupdatevalue(e)
  }
  const postedithandler = (y) => {
    setpost(true)
    setpostid(y)
  }
  const deletecommenthandler = (e) => {
    setdeletecommentid(e)

    axios.delete(`https://taskforum.herokuapp.com/api/comment/${e}`, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {      //for deleting a comment
      if (res.status === 200) {
        let updated = comments.filter((comment) => {
          if (comment._id == e) {
            return false
          }
          return true
        })
        setcomments(updated)
      }
    }).catch(err => console.log(err.message))
  }
  const updatevaluehandler = () => {
    let body = { comment: updatevalue }
    axios.put(`https://taskforum.herokuapp.com/api/comment/${commentid}`, body, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {  //for updating comment
      if (res.status === 200) {
      }
    }).catch(err => console.log(err.message))
    setfalsy(false)
  }
  const cancelhandler = () => {
    setfalsy(false)
  }
  const editedpostvalue = (updatedvalue) => {
    setupdatedpostvalue(updatedvalue)
  }
  const updatehandler = () => {
    let body = { title: updatedpostvalue }
    axios.put(`https://taskforum.herokuapp.com/api/post/${postid}`, body, { headers: { "Authorization": `Bearer ${token}` } }).then(res => {   // for updating post
      if (res.status === 200) {
        setstate(res.data.data)
      }
    }).catch(err => console.log(err.message))
  }
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
                  <h3> <i class="fas fa-user"></i> {e.user.name}</h3>
                  {
                    !post && Idgetted === e.user._id ?
                      <i className="edited" class="far fa-edit" id="edit" onClick={() => postedithandler(e._id)}></i> : ""
                  }

                  {
                    post && Idgetted === e.user._id && postid === e._id ?
                      <>
                        <input type="text" defaultValue={e.title} onChange={e => editedpostvalue(e.target.value)} />
                        <button className="submit" onClick={updatehandler} >Update Post</button>
                      </> : ""
                  }
                  <h3 >{e.title}</h3>
                  <p>{e.description}</p>
                  <h5>{e.category}</h5>
                  <input type="text" onChange={f => commenthandler(f.target.value, e._id)} placeholder="Write a Comment..." />
                  <button className="submit" onClick={inputsubmithandler}>Post</button>
                  <div >
                    <Collapsible className="loading-comments" trigger="Load comments">
                      {comments.map((x, idx) => {
                        if (x.post._id === e._id) {
                          return (
                            <>
                              <div className="commentbox" key={id}>
                                <h3><i class="fas fa-user"></i>  {x.user.name}</h3>
                                {
                                  !falsy && Idgetted === x.user._id ?
                                    <>
                                      <i className="edited" class="far fa-edit" id="edit" onClick={() => edithandler(x._id)}></i>
                                      <i className="edited" class="fas fa-trash-alt" id="edit" onClick={() => deletecommenthandler(x._id)}></i>
                                    </> : ""
                                }
                                {
                                  falsy && Idgetted === x.user._id && commentid === x._id ?
                                    <>
                                      <input type="text" defaultValue={x.comment} onChange={e => editedvalue(e.target.value)} />
                                      <button className="submit" onClick={updatevaluehandler} >Update</button>
                                      <button className="submit" onClick={cancelhandler}>Cancel</button>
                                    </> : <>
                                      <p className="comment">{x.comment}</p>
                                    </>
                                }
                              </div>
                            </>
                          )
                        }
                      })
                      }
                    </Collapsible>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div >
  )
}
export default Feed;