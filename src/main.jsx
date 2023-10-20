import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { fetchUsers } from "./features/users/usersSlice.js";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { RouterProvider } from "react-router-dom";
import AddPostForm from "./features/posts/AddPostForm.jsx";
import PostDetail from "./features/posts/PostDetail.jsx";
import EditPostForm from "./features/posts/EditPostForm.jsx";
import { fetchPosts } from "./features/posts/postsSlice.js";
import UsersList from "./features/users/UsersList.jsx";
import UserPage from "./features/users/UserPage.jsx";
store.dispatch(fetchPosts())
store.dispatch(fetchUsers());

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "post",
        element: <AddPostForm />,
      },
      {
        path: "post/:id",
        element: <PostDetail />,
      },
      {
        path: "post/:id/edit",
        element: <EditPostForm />
      },
      {
        path: 'users',
        element: <UsersList />
      },
      {
        path: 'user/:id',
        element: <UserPage />
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
