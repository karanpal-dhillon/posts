import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectUserById } from "./usersSlice"
import { selectAllPosts } from '../posts/postsSlice'
import { Link } from "react-router-dom"

const UserPage = () => {
  const { id } = useParams()
  const user = useSelector((state) => selectUserById(state, Number(id)))
  const allUserPosts = useSelector(state => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter(post => post.userId === Number(id))
  })
  const postTitles = allUserPosts.map((post) => (<li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>))
  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage
