import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// React-query setup
const queryClient = new QueryClient();

// Define axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

console.log("API URL:", import.meta.env.VITE_API_URL);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
