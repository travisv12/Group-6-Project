import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("Adding to cart:", action.payload);
      const { product, quantity = 1 } = action.payload;
      if (state.items) {
        console.log("State items before adding:", state.items);
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {
          console.log("Existing item found:", existingItem);
          existingItem.quantity += quantity;
        } else {
          state.items.push({ ...product, quantity });
        }
      } else {
        state.items = [{ ...product, quantity }];
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== productId);
          console.log("Item removed from cart:", item);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const getCartTotal = (state) => {
  return state.items.reduce((total, item) => {
    const price = parseFloat(item.discountedPrice);
    return total + price * item.quantity;
  }, 0);
};

export const getCartItemsCount = (state) => {
  if (!state.items || state.items.length === 0) {
    return 0;
  }
  return state.items.reduce((count, item) => count + item.quantity, 0);
};
export default cartSlice.reducer;
