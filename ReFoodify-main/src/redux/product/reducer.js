// reducer.js
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_FULFILLED,
  FETCH_PRODUCTS_REJECTED,
} from "./actionTypes";

const initialState = {
  product_items: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_FULFILLED:
      return {
        ...state,
        loading: false,
        product_items: action.payload,
      };

    case FETCH_PRODUCTS_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};

export default productReducer;
