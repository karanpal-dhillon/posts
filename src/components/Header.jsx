import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCount, increment } from "../features/posts/postsSlice";
const Header = () => {
  const count = useSelector(getCount);
  const dispatch = useDispatch();
  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Post</Link>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
          <li>
            <button onClick={() => dispatch(increment())}>{count}</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
