import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    appliedDiscount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      console.log("Item added to cart:", state.items); // Optional: Add logging for debugging
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
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
    },

    applyDiscount: (state, action) => {
      state.appliedDiscount = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, appliedDiscount } =
  cartSlice.actions;

// export const getCartTotal = (state) => {
//   return state.cart.items.reduce((total, item) => {
//     const price = parseFloat(item.discountedPrice || item.price);
//     return total + price * item.quantity;
//   }, 0);
// };

export const getCartTotal = (state) => {
  const itemsTotal = state.cart.items.reduce((total, item) => {
    const price = parseFloat(item.discountedPrice || item.price);
    if (isNaN(price)) {
      console.warn(`Invalid price for item: ${item.name}`);
      return total;
    }
    return total + price * item.quantity;
  }, 0);

  const appliedDiscount = parseFloat(state.cart.appliedDiscount) || 0;
  return Math.max(0, itemsTotal - appliedDiscount);
};

export const getCartItemsCount = (state) => {
    const cartItems = state.cart.items;
  if (!cartItems || cartItems.length === 0) {
    return 0;
  }
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  return itemCount;
};

export default cartSlice.reducer;
