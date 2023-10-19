import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { selectAllUsers } from "../users/usersSlice";
const PostAuthor = ({ userId }) => {
  const allUsers = useSelector(selectAllUsers);
  const author = allUsers.find((user) => user.id === userId);
  return <span>By {author ? author.name : "Unknown Author "}</span>;
};

PostAuthor.propTypes = {
  userId: PropTypes.number,
};

export default PostAuthor;
