import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to handle checkout
export const checkout = createAsyncThunk(
  "order/checkout",
  async (checkoutData, { getState, rejectWithValue }) => {
    const state = getState();
    const accessToken = state.user.accessToken;
        const cartItems = state.cart.items.map((item) => ({
          productId: item.id, // Ensure this matches the product's ID field
          quantity: item.quantity,
          price: item.price,
        }));
    const cartTotal = getState().cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const earnedPoints = Math.floor(cartTotal * 200);
     const orderData = {
       ...checkoutData,
       items: cartItems,
       totalAmount: cartTotal,
       earnedPoints,
     };

    if (!accessToken) {
      return rejectWithValue("No access token found");
    }


    try {
          // Log the data being sent in the body
          console.log("Request Body:", orderData);
      const response = await fetch(
        "http://localhost:3001/api/orders/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process checkout");
      }

      const data = await response.json();
        console.log("Response Data:", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const accessToken = state.user.accessToken;
    const userId = state.user.id;

    if (!accessToken) {
      return rejectWithValue("No access token found");
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/orders/my-purchases/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user orders");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch order details
export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (orderId, { getState, rejectWithValue }) => {
    const state = getState();
    const accessToken = state.user.accessToken;

    if (!accessToken) {
      return rejectWithValue("No access token found");
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/orders/order/${orderId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);





const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentOrder: null,
    orderHistory: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orderHistory.push(action.payload);
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default orderSlice.reducer;
