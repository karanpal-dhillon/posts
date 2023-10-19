import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSinglePost, updatePost } from './postsSlice'
import { useState } from "react"
import { selectAllUsers } from "../users/usersSlice"
import { useNavigate } from "react-router-dom"

const EditPostForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const post = useSelector((state) => getSinglePost(state, Number(id)))
  const allUsers = useSelector(selectAllUsers)
  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.body)
  const [userId, setUserId] = useState(post?.userId)
  const [requestStatus, setRequestStatus] = useState('idle')
  const navigate = useNavigate()
  const userOptions = allUsers.map((user) => {
    return (<option value={user.id} key={user.id}>{user.name}</option>)
  })
  const onUserIdChange = (e) => setUserId(e.target.value)
  const onContentChange = (e) => setContent(e.target.value)
  const onTitleChange = (e) => setTitle(e.target.value)

  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'
  const onSubmit = (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setRequestStatus('pending')
        dispatch(updatePost({ id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap();
        setTitle('')
        setContent('')
        setUserId('')
      }
      catch (error) {
        console.error(error)
      }
      finally {
        setRequestStatus('idle')
        navigate(`/post/${id}`)
      }
    }
  }
  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Post Title</label>
        <input type="text" name="title" value={title} id="title" onChange={onTitleChange} />

        <label htmlFor="user">Select User</label>
        <select
          name="userId"
          id="userId"
          value={userId}
          onChange={onUserIdChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  )
}

export default EditPostForm
