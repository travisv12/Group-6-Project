import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const response = await fetch(" http://localhost:3001/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  }
);

// Async thunk for signup
export const signup = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }) => {
    const response = await fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      throw new Error("Failed to sign up");
    }
    const result = await response.json();
    return result;
  }
);

// New fetchUser and updateUser thunks
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState }) => {
    const state = getState();
    const accessToken = state.user.accessToken;
    console.log("ACCESS TOKEN BOFRE CALL: ", accessToken);
    // const response = await fetch("/api/user");
    const response = await fetch("http://localhost:3001/api/users/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user information");
    }

    const data = await response.json();
    console.log("RESPONSE JSON DATA: ", data);
    return data;
  }
);

// {
//     "_id": "66eac851ee80a6cf233e5256",
//     "firstName": "Jane",
//     "lastName": "Smith",
//     "username": "user2",
//     "role": "user",
//     "email": "user2@example.com",
//     "__v": 0
// }

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userInfo, { getState }) => {
    const state = getState();
    const accessToken = state.user.accessToken;
    const response = await fetch("http://localhost:3001/api/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.text();
    return data;
  }
);





const userSlice = createSlice({
  name: "user",
  initialState: {
    // accessToken: null,
    // refreshToken: null,
    loading: false,
    uerInfo: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccessToken: (state, action) => {
      console.log("INN ACCESS TOKEN METHOD: ", action.payload);

      state.accessToken = action.payload;
      console.log("AFTER ACCESS TOKEN METHOD: ", state.user.accessToken);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {  setAccessToken, setRefreshToken, setUser, setUserInfo, logout } =
  userSlice.actions;
export default userSlice.reducer;
