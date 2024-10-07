import { store } from "../redux/store";
import { refreshAccessToken, logout } from "../redux/user/actions";

const apiFetch = async (url, options = {}) => {
  const state = store.getState();
  let accessToken = state.user.accessToken;

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  try {
    let response = await fetch(url, fetchOptions);

    if (response.status === 401 && accessToken) {
      // Try to refresh the token
      try {
        accessToken = await store.dispatch(refreshAccessToken()).unwrap();
        headers.Authorization = `Bearer ${accessToken}`;
        response = await fetch(url, fetchOptions);
      } catch (err) {
        store.dispatch(logout());
        throw new Error("Session expired. Please log in again.");
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export default apiFetch;
