import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import UserContextProvider from "./contexts/UserContextProvider";
import AuthPage from "./pages/AuthPage";
import ListingsPage from "./pages/ListingsPage";
import { musatoriTheme } from "./themes/musatoriTheme";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import ListingFormPage from "./pages/ListingFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <h1>404 Not Found</h1>, // TODO: Add a 404 page
    children: [
      {
        path: "/",
        element: <ListingsPage />,
      },
      {
        path: "/listings",
        element: <ListingsPage />,
      },
      {
        path: "/listings/:id",
        element: <ListingDetailsPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/listings/form",
        element: <ListingFormPage />,
      },
      {
        path: "/users/:id/listings",
        element: <h1>/users/:id/listings</h1>,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider theme={musatoriTheme}>
      <UserContextProvider>
        <RouterProvider router={router} />
        <CssBaseline />
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
