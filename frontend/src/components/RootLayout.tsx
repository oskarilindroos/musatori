import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppbar";
import { Container } from "@mui/material";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <main>
      <ResponsiveAppBar />
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </main>
  );
};

export default RootLayout;
