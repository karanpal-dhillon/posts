import { PropTypes } from "prop-types";
import { reactionsAdded } from "./postsSlice";
import { useDispatch } from "react-redux";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(
    ([reaction, emoji]) => {
      return (
        <button
          key={reaction}
          className="reactionButton"
          onClick={() =>
            dispatch(reactionsAdded({ postId: post.id, reaction }))
          }
        >
          {emoji} {post.reactions[reaction]}
        </button>
      );
    },
  );
  return <div style={{ display: "flex", gap: "1rem" }}>{reactionButtons}</div>;
};

ReactionButtons.propTypes = {
  post: PropTypes.object,
};
export default ReactionButtons;
