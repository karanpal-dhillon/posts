import axios from "axios";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;

const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  count: 0,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId) => {
    const response = await axios.get(`${POSTS_URL}/${postId}`);
    return response.data;
  },
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (postData) => {
    const response = await axios.post(POSTS_URL, postData);
    return response.data;
  },
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (postData) => {
    const { id } = postData;
    const response = await axios.put(`${POSTS_URL}/${id}`, postData);
    return response.data;
  },
);

export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
  const { id } = post;
  try {
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) {
      return post;
    }
    return `${response?.status}:${response?.statusText}`;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionsAdded: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload;
        const existingPost = state.posts.find((post) => post.id === postId);
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      },
    },
    increment: {
      reducer: (state, _action) => {
        state.count = state.count + 1;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, _action) => {
        state.status = "pending";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 5;
        const loadedPosts = action.payload.map((post) => {
          (post.date = sub(new Date(), { minutes: min++ }).toISOString()),
            (post.reactions = {
              thumbsUp: 0,
              wow: 0,
              rocket: 0,
              heart: 0,
              coffee: 0,
            });
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSinglePost.pending, (state, _action) => {
        state.status = "pending";
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const post = action.payload;
        (post.date = sub(new Date(), { days: 3 })),
          (post.reactions = {
            thumbsUp: 0,
            wow: 0,
            rocket: 0,
            heart: 0,
            coffee: 0,
          });
        return post;
      })
      .addCase(fetchSinglePost.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const postData = action.payload;
        postData.userId = Number(postData.userId);
        postData.date = new Date().toISOString();
        postData.reactions = {
          thumbsUp: 0,
          wow: 0,
          rocket: 0,
          heart: 0,
          coffee: 0,
        };
        state.posts.push(postData);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          state.status = "succeeded";
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        action.payload.userId = Number(action.payload.userId);
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload.id) {
          console.error("can not delete post");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        state.posts = state.posts.filter((post) => post.id !== Number(id));
      });
  },
});

export const { reactionsAdded, increment } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getSinglePost = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
export const getCount = (state) => state.posts.count;
export default postsSlice.reducer;
