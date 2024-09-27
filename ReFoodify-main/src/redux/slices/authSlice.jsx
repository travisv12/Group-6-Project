// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Async thunk for login
// export const login = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }) => {
//     const response = await fetch("http://localhost:3001/api/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();
//     return result;
//   }
// );

// // Async thunk for signup
// export const signup = createAsyncThunk(
//   "auth/signup",
//   async ({ name, email, password }) => {
//     const response = await fetch("http://localhost:3001/api/users/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, password }),
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const result = await response.json();
//     return result;
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     accessToken: null,
//     refreshToken: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     setAccessToken: (state, action) => {
//       state.accessToken = action.payload;
//     },
//     setRefreshToken: (state, action) => {
//       state.refreshToken = action.payload;
//     },
//     logout: (state) => {
//       state.accessToken = null;
//       state.refreshToken = null;
//       localStorage.removeItem("access_token");
//       localStorage.removeItem("refresh_token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(signup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.loading = false;
//         state.accessToken = action.payload.accessToken;
//         state.refreshToken = action.payload.refreshToken;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setAccessToken, setRefreshToken, logout } = authSlice.actions;
// export default authSlice.reducer;
