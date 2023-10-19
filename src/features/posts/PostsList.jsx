import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "./postsSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === "idle") dispatch(fetchPosts());
  }, [postsStatus, dispatch]);

  if (error) {
    return <h3>Some error occurred. try again later</h3>;
  }

  if (postsStatus === "loading") {
    return <h3>Loading ...</h3>;
  }
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <PostExcerpt post={post} key={post.id} />
  ));

  return <section>{renderedPosts}</section>;
};

export default PostsList;
