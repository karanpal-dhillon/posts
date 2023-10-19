import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;

const initialState = {
  posts: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
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

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
          },
        };
      },
    },
    reactionsAdded: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload;
        const existingPost = state.posts.find((post) => post.id === postId);
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
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
      });
  },
});

export const { postAdded, reactionsAdded } = postsSlice.actions;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getSinglePost = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId);
export default postsSlice.reducer;
