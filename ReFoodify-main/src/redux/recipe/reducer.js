import {
    FETCH_USER_RECIPES_PENDING,
    FETCH_USER_RECIPES_FULFILLED,
    FETCH_USER_RECIPES_REJECTED,
    CREATE_RECIPE_PENDING,
    CREATE_RECIPE_FULFILLED,
    CREATE_RECIPE_REJECTED,
    DELETE_RECIPE_PENDING,
    DELETE_RECIPE_FULFILLED,
    DELETE_RECIPE_REJECTED,
    FETCH_FILTERED_RECIPES_PENDING,
    FETCH_FILTERED_RECIPES_FULFILLED,
    FETCH_FILTERED_RECIPES_REJECTED,
  } from './actionTypes';
  
  const initialState = {
    loading: false,
    recipes: [],
    userRecipes: [],
    error: null,
  };
  
  const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_RECIPES_PENDING:
      case CREATE_RECIPE_PENDING:
      case DELETE_RECIPE_PENDING:
      case FETCH_FILTERED_RECIPES_PENDING:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_USER_RECIPES_FULFILLED:
        return {
          ...state,
          loading: false,
          userRecipes: action.payload,
        };
      case CREATE_RECIPE_FULFILLED:
        return {
          ...state,
          loading: false,
          recipes: [...state.recipes, action.payload],
        };
      case DELETE_RECIPE_FULFILLED:
        return {
          ...state,
          loading: false,
          userRecipes: state.userRecipes.filter(recipe => recipe._id !== action.payload),
        };
      case FETCH_FILTERED_RECIPES_FULFILLED:
        return {
          ...state,
          loading: false,
          recipes: action.payload,
        };
      case FETCH_USER_RECIPES_REJECTED:
      case CREATE_RECIPE_REJECTED:
      case DELETE_RECIPE_REJECTED:
      case FETCH_FILTERED_RECIPES_REJECTED:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default recipeReducer;
  