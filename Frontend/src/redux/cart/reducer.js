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
        // Item does not exist in cart, add new item
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }

    case REMOVE_FROM_CART: {
      const productId = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== productId),
      };
    }

    case SET_CART_ORDER: {
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
