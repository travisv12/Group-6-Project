import React from "react";
import Router from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import the Redux store

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
