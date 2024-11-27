import {
  FETCH_USER_RECIPES,
  CREATE_RECIPE,
  DELETE_RECIPE,
  FETCH_FILTERED_RECIPES,
  UPDATE_RECIPE,
  UPDATE_RECIPE_IMAGE,
  FETCH_ALL_RECIPES,
} from "./actionTypes";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const fetchAllRecipes = createAsyncThunk(
  FETCH_ALL_RECIPES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/recipes/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRecipeImage = createAsyncThunk(
  UPDATE_RECIPE_IMAGE,
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch user's recipes
export const fetchUserRecipes = createAsyncThunk(
  FETCH_USER_RECIPES,
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/recipes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to create a new recipe
export const createRecipe = createAsyncThunk(
  CREATE_RECIPE,
  async (recipeData, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/add",
        JSON.stringify(recipeData)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a recipe
export const deleteRecipe = createAsyncThunk(
  DELETE_RECIPE,
  async (id, { getState, rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/user/recipe/delete/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch filtered recipes based on ingredients
export const fetchFilteredRecipes = createAsyncThunk(
  FETCH_FILTERED_RECIPES,
  async (ingredients, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/recipes/search",
        JSON.stringify({ ingredients, searchAll: true })
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to update a recipe
export const updateRecipe = createAsyncThunk(
  UPDATE_RECIPE,
  async ({ id, ...updatedData }, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/user/recipe/update/${id}`,
        JSON.stringify(updatedData)
      );
      if (!response.data) {
        throw new Error("Failed to update recipe");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
