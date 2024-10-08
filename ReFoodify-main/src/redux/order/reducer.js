import {
  CHECKOUT_PENDING,
  FETCH_USER_ORDERS_PENDING,
  FETCH_ORDER_DETAILS_PENDING,
  FETCH_USER_ORDERS_FULFILLED,
  FETCH_USER_ORDERS_REJECTED,
  CHECKOUT_REJECTED,
  FETCH_ORDER_DETAILS_REJECTED,
  CHECKOUT_FULFILLED,
  FETCH_ORDER_DETAILS_FULFILLED,
} from "./actionTypes";

const initialState = {
  currentOrder: null,
  orderHistory: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_ORDERS_PENDING:
    case CHECKOUT_PENDING:
    case FETCH_ORDER_DETAILS_PENDING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_USER_ORDERS_FULFILLED:
      return {
        ...state,
        loading: false,
        orderHistory: action.payload,
      };

    case FETCH_USER_ORDERS_REJECTED:
    case CHECKOUT_REJECTED:
    case FETCH_ORDER_DETAILS_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CHECKOUT_FULFILLED:
      return {
        ...state,
        loading: false,
        currentOrder: action.payload,
        orderHistory: [...state.orderHistory, action.payload],
      };

    case FETCH_ORDER_DETAILS_FULFILLED:
      return {
        ...state,
        loading: false,
        currentOrder: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
