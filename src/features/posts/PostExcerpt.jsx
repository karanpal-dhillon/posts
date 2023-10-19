import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const PostExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <Link to={`posts/${post.id}`}>View Details</Link>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
};

PostExcerpt.propTypes = {
  post: PropTypes.object,
};

export default PostExcerpt;
