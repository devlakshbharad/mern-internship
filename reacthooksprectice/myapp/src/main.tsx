import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./store";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/themecontext";
import ErrorBoundary from "./components/ErrorBoundary";
import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);