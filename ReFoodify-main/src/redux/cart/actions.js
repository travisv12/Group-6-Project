import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  SET_CART_ORDER
} from "./actionTypes";

// Action creators
export const addToCart = ({ product, quantity }) => ({
  type: ADD_TO_CART,
  payload: { product, quantity },
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const checkoutCart = (checkoutData) => ({
  type: SET_CART_ORDER,
  payload: checkoutData,
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

// Selector for getting the total number of items in the cart
export const getCartItemsCount = (state) => {
  const cartItems = state.cart.items;
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  return itemCount;
};
