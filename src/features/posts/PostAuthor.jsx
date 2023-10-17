import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { selectAllUsers } from "../users/usersSlice";
const PostAuthor = ({ userId }) => {
  console.log(`searching id ${userId}`);
  const allUsers = useSelector(selectAllUsers);
  const author = allUsers.filter((user) => user.id === userId);

  return <span>By {author ? author.name : "Unknown Author "}</span>;
};

PostAuthor.propTypes = {
  userId: PropTypes.string,
};

export default PostAuthor;
