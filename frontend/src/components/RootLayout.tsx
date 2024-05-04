import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppbar";
import { Container } from "@mui/material";

const RootLayout = () => {
  return (
    <main>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </main>
  );
};

export default RootLayout;
