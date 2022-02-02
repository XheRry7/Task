import axios from "axios";
const Comments = () => {
  const token = localStorage.getItem('Token');
  useEffect(() => {
    axios.get('http://localhost:5000/api/comment/', { headers: { "Authorization": `Bearer ${token}` } }).then(res => {
      if (res.status === 200) {
        console.log(res.data.data)
      };
    }).catch(err => console.log(err.message))
  }, []);
  return (
    <>
      <h3>
        In comment
      </h3>
    </>
  )
}

export default Comments;