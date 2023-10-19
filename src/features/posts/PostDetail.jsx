import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "./postsSlice";
import TimeAgo from "./TimeAgo";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";

const PostDetail = () => {
  const { id } = useParams();
  const post = useSelector((state) => getSinglePost(state, Number(id)));
  if (!post) {
    return <h3>Post not found</h3>;
  }
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

export default PostDetail;
