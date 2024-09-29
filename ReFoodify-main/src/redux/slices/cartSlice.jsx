import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch cart items for a user
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await fetch(`/http://localhost:3001/api/cart/`);
  const data = await response.json();
  return data.items;
});

// Remove an item from the cart
export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId }) => {
    await fetch(
      `/http://localhost:3001/api/cart/${productId}`,
      {
        method: "DELETE",
      }
    );
    return productId;
  }
);

// Update the quantity of an item in the cart
export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ userId, productId, quantity }) => {
    await fetch(  `/http://localhost:3001/api/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    return { productId, quantity };
  }
);

// Checkout the cart
export const checkout = createAsyncThunk(
  "cart/checkout",
  async ({ userId, items }) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, items }),
    });
    const data = await response.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.total = action.payload.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      })
      .addCase(updateItemQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (item) => item.id === action.payload.productId
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
        state.total = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      })
      .addCase(checkout.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  },
});

export default cartSlice.reducer;
