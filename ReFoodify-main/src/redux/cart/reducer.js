// reducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  SET_CART_ORDER,
} from "./actionTypes";

const initialState = {
  items: [],
  cart_order: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id
      );

      if (existingItemIndex >= 0) {
        // Item already exists in cart, update quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        console.log("NEW ITEM ADDED: ", action.payload);
        // Item does not exist in cart, add new item
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      // const { product, quantity } = action.payload;
      // const existingItem = state.items.find((item) => item.id === product.id);
      // if (existingItem) {
      //   existingItem.quantity += quantity;
      // } else {
      //   state.items.push({ ...product, quantity });
      // }
      // console.log("Item added to cart:", state.items); // Optional: Add logging for debugging
      // return { ...state };
    }

    case REMOVE_FROM_CART: {
      const productId = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== productId),
      };
    }

    case SET_CART_ORDER: {
      console.log("SETING CART ORDER REDUCER: ", action.payload);
      return {
        ...state,
        cart_order: action.payload,
      };
    }

    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      const updatedItems = state.items
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: Math.max(0, quantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with 0 quantity
      return { ...state, items: updatedItems };
    }

    case CLEAR_CART: {
      return { ...state, items: [], cart_order: {} };
    }

    default:
      return state;
  }
};

export default cartReducer;
