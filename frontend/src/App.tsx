import { Alert, CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import ListingsPage from "./pages/ListingsPage";
import { checkHealth } from "./services/checkHealth";
import { musatoriTheme } from "./themes/musatoriTheme";
import ErrorAlert from "./components/ErrorAlert";

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
      <RouterProvider router={router} />
      <CssBaseline />

      {isError && ErrorAlert({ error })}
      {isPending && (
        <Snackbar open={true}>
          <Alert severity="info">Connecting to server...</Alert>
        </Snackbar>
      )}
    </ThemeProvider>
  );
};

export default App;
