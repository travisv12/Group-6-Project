// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateRecipeImage = createAsyncThunk(
  "recipes/updateRecipeImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Avatar upload failed");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// // Thunk to fetch user's recipes
// export const fetchUserRecipes = createAsyncThunk(
//   "recipes/fetchUserRecipes",
//   async (_, { getState, rejectWithValue }) => {
//     const state = getState();
//     const accessToken = state.user.accessToken;

//       if (!accessToken) {
//         return rejectWithValue("No access token found");
//       }

//     try {
//       const response = await fetch("http://localhost:3001/api/user/recipes", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch recipes");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk to update a recipe
// export const updateRecipe = createAsyncThunk(
//   "recipes/updateRecipe",
//   async ({ id, ...updatedData }, { getState, rejectWithValue }) => {
//     const state = getState();
//     const accessToken = state.user.accessToken;

//     if (!accessToken) {
//       return rejectWithValue("No access token found");
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/user/recipe/update/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify(updatedData),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to update recipe");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk for deleting a recipe
// export const deleteRecipe = createAsyncThunk(
//   'recipes/deleteRecipe',
//   async (id, { getState, rejectWithValue }) => {
//     const state = getState();
//     const accessToken = state.user.accessToken;

//     if (!accessToken) {
//       return rejectWithValue("No access token found");
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3001/api/user/recipe/delete/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to delete recipe');
//       }

//       return id; // Return the deleted recipe ID
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk to fetch filtered recipes based on ingredients
// export const fetchFilteredRecipes = createAsyncThunk(
//   "recipes/fetchFilteredRecipes",
//   async (ingredients, { getState, rejectWithValue }) => {
//     const state = getState();
//     const accessToken = state.user.accessToken;

//     if (!accessToken) {
//       return rejectWithValue("No access token found");
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:3001/api/recipes/search",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify({ ingredients }),
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch recipes");
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Thunk to create a new recipe
// export const createRecipe = createAsyncThunk(
//   'recipes/createRecipe',
//   async (recipeData, { getState, rejectWithValue }) => {
//     const state = getState();
//     const accessToken = state.user.accessToken;

//     if (!accessToken) {
//       return rejectWithValue('No access token found');
//     }

//     try {
//       const response = await fetch('http://localhost:3001/api/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(recipeData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create recipe');
//       }

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const recipeSlice = createSlice({
//   name: "recipes",
//   initialState: {
//     loading: false,
//     recipes: [],
//     userRecipes: [],
//     error: null,
//   },
//   reducers: {
//     // deleteRecipe: (state, action) => {
//     //   state.recipes = state.recipes.filter((_, i) => i !== action.payload);
//     // },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserRecipes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserRecipes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.userRecipes = action.payload;
//       })
//       .addCase(fetchUserRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchFilteredRecipes.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createRecipe.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createRecipe.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recipes.push(action.payload);
//       })
//       .addCase(createRecipe.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // .addCase(updateRecipe.pending, (state) => {
//       //   state.loading = true;
//       //   state.error = null;
//       // })
//       // .addCase(updateRecipe.fulfilled, (state, action) => {
//       //   state.loading = false;
//       //   const updatedRecipe = action.payload;
//       //   const index = state.recipes.findIndex((recipe) => recipe._id === updatedRecipe._id);
//       //   if (index !== -1) {
//       //     state.recipes[index] = updatedRecipe;
//       //   }
//       // })
//       // .addCase(updateRecipe.rejected, (state, action) => {
//       //   state.loading = false;
//       //   state.error = action.payload;
//       // })
//       .addCase(deleteRecipe.pending, (state) => {
//         state.status = "loading";
//         state.loading = true; // Set loading to true
//         state.error = null; // Clear any previous errors
//       })
//       .addCase(deleteRecipe.fulfilled, (state, action) => {
//          state.loading = false;
//         state.userRecipes = state.userRecipes.filter(
//           (recipe) => recipe._id !== action.payload
//         );
//         state.status = "succeeded";
//       })
//       .addCase(deleteRecipe.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//              state.status = "failed";
//       })
//       .addCase(fetchFilteredRecipes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.recipes = action.payload; // Update the state with the fetched recipes
//       })
//       .addCase(fetchFilteredRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {actions, reducer } = recipeSlice;
// // export const { deleteRecipe } = recipeSlice.actions;

// export default recipeSlice.reducer;
