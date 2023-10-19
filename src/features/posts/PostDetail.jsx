import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSinglePost } from "./postsSlice";

const PostDetail = () => {
  const { id } = useParams();
  const post = useSelector((state) => getSinglePost(state, id));
  console.log(post);
  return <div>PostDetail</div>;
};

export default PostDetail;
