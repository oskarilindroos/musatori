import { CssBaseline, ThemeProvider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import UserContextProvider from "./contexts/UserContextProvider";
import AuthPage from "./pages/AuthPage";
import ListingsPage from "./pages/ListingsPage";
import { checkHealth } from "./services/checkHealth";
import { musatoriTheme } from "./themes/musatoriTheme";

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
        element: <h1>/listings/:id</h1>,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/users/:id/listings",
        element: <h1>/users/:id/listings</h1>,
      },
    ],
  },
]);

const App = () => {
  // Check the health of the API
  const { isPending, isError, error } = useQuery({
    queryKey: ["apiHealth"],
    queryFn: checkHealth,
  });

  return (
    <ThemeProvider theme={musatoriTheme}>
      <UserContextProvider>
        <RouterProvider router={router} />
        <CssBaseline />
        {isError && toast.error(error.message)}
        {isPending && toast.loading("Testing connection to server...")}
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
