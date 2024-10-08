import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CHECKOUT,
  FETCH_USER_ORDERS,
  FETCH_ORDER_DETAILS,
} from "./actionTypes";
import axiosInstance from "../axiosInstance";

// Thunk to handle checkout
export const checkout = createAsyncThunk(
  CHECKOUT,
  async (checkoutData, { getState, rejectWithValue }) => {
    const state = getState();
    const cartItems = state.cart.items.map((item) => ({
      productId: item.product.id, // Ensure this matches the product's ID field
      quantity: item.quantity,
      price: item.product.discountedPrice,
    }));
    const cartTotal = getState().cart.items.reduce(
      (total, item) => total + item.product.discountedPrice * item.quantity,
      0
    );
    const POINTS_MULTIPLIER = 140;
    const earnedPoints = Math.floor(cartTotal * POINTS_MULTIPLIER);
    const orderData = {
      ...checkoutData,
      items: cartItems,
      totalAmount: cartTotal,
      earnedPoints,
    };

    try {
      const response = await axiosInstance.post(
        "/orders/checkout",
        JSON.stringify(orderData)
      );

      if (!response.data) {
        throw new Error("Failed to process checkout");
      }

      return await response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  FETCH_USER_ORDERS,
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const userId = state.user.id;

    try {
      const response = await axiosInstance.get(
        `/orders/my-purchases/${userId}`
      );
      if (!response.data) {
        throw new Error("Failed to fetch user orders");
      }
      return await response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch order details
export const fetchOrderDetails = createAsyncThunk(
  FETCH_ORDER_DETAILS,
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/orders/order/${orderId}`);

      if (!response.data) {
        throw new Error("Failed to fetch order details");
      }
      return await response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
