import { createAsyncThunk } from "@reduxjs/toolkit";
import { FETCH_PRODUCTS } from "./actionTypes";
import axiosInstance from "../axiosInstance";

// Thunk to fetch user's recipes
export const fetchProducts = createAsyncThunk(
  FETCH_PRODUCTS,
  async (_, { getState, rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get("/user/recipes");
      const response = await axiosInstance.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
