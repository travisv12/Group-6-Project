// src/index.js

import React from "react";
import ReactDOM from "react-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./redux/store"; // Adjust the import path as necessary
import App from "./App"; // Adjust the import path as necessary

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
