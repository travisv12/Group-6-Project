// src/services/api.js
import {store} from "../redux/store"; // Adjust the import path as needed
import { refreshAccessToken, logout } from "../redux/slices/userSlice";

const apiFetch = async (url, options = {}) => {
  const state = store.getState();
  let accessToken = state.user.accessToken;

  const fetchWithAuth = async () => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      // Try to refresh the token
      try {
        accessToken = await store.dispatch(refreshAccessToken()).unwrap();
        const retryResponse = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return retryResponse;
      } catch (err) {
        store.dispatch(logout());
        throw new Error("Session expired. Please log in again.");
      }
    }

    return response;
  };

  return fetchWithAuth();
};

export default apiFetch;
