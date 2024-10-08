import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LOGIN,
  SIGNUP,
  FETCH_USER,
  UPDATE_USER,
  REFRESH_ACCESS_TOKEN,
  LOGOUT,
  UPDATE_AVATAR,
} from "./actionTypes";
import axiosInstance from "../axiosInstance";

// Async thunk for login
export const login = createAsyncThunk(LOGIN, async ({ email, password }) => {
  const response = await axiosInstance.post(
    "/users/login",
    JSON.stringify({ email, password })
  );
  if (!response.data) {
    throw new Error("Network response was not ok");
  }
  return response.data;
});

// Async thunk for signup
export const signup = createAsyncThunk(
  SIGNUP,
  async ({ username, email, password }) => {
    const response = await axiosInstance.post(
      "/users/signup",
      JSON.stringify({ username, email, password })
    );

    if (!response.data) {
      throw new Error("Failed to sign up");
    }
    return response.data;
  }
);

// Fetch user information
export const fetchUser = createAsyncThunk(
  FETCH_USER,
  async (_, { getState }) => {
    const response = await axiosInstance.get("/users/info");
    if (!response.data) {
      throw new Error("Failed to fetch user information");
    }

    return response.data;
  }
);

// Update user information
export const updateUser = createAsyncThunk(
  UPDATE_USER,
  async (userInfo, { getState }) => {
    const response = await axiosInstance.put(
      "/users/update",
      JSON.stringify(userInfo)
    );
    if (!response.data) {
      throw new Error("Failed to update information");
    }
    return response.data;
  }
);

// Refresh access token
export const refreshAccessToken = createAsyncThunk(
  REFRESH_ACCESS_TOKEN,
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const refreshToken = state.user.refreshToken;

    if (!refreshToken) {
      return rejectWithValue("No refresh token found");
    }

    const response = await axiosInstance.post(
      "refresh-token",
      JSON.stringify(refreshToken)
    );

    if (!response.data) {
      throw new Error("Failed to fetch refresh token");
    }
    return response.data;
  }
);

export const logout = () => ({
  type: LOGOUT,
});

export const updateUserAvatar = createAsyncThunk(
  UPDATE_AVATAR,
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "users/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
