import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
// import { UserProvider } from "./hooks/useUser.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          {/* <UserProvider> */}
          <App />
          {/* </UserProvider> */}
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
