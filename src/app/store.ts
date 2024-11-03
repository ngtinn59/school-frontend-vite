import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../services/redux/user";
import { employerSlice } from "../modules/employer/redux/employer.slice";
// ...

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    employer: employerSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
