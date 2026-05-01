import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { AuthProvider } from "./contexts/authContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider
        publishableKey={
          import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
          "pk_test_ZGVmaW5pdGUtd2FydGhvZy05MS5jbGVyay5hY2NvdW50cy5kZXYk"
        }
      >
        <AuthProvider>
          <App />
          <ToastContainer
            position="top-right"
            newestOnTop={true}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
          />
        </AuthProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
);
