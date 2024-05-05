import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { PianoOutlined } from "@mui/icons-material";
import { useState, MouseEvent, useContext, Fragment } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResponsiveAppBar = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    // If the user is not logged in, redirect to the auth page
    if (!userContext.user.isLoggedIn) {
      navigate("/auth");
    } else {
      setAnchorElUser(event.currentTarget);
    }
  };

  const handleLogout = () => {
    handleCloseUserMenu();

    // Log out the user in the context
    userContext.logout();

    toast.success("Logged out");
  };

  const handleNavigateToMyListings = () => {
    handleCloseUserMenu();

    // Redirect to the user's listings page
    navigate(`/users/${userContext.user.userId}/listings`);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Fragment>
      <AppBar color="secondary" position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box display="flex" alignItems="center" flexGrow={1}>
              <PianoOutlined fontSize="large" />
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  padding={2}
                  sx={{
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Musatori
                </Typography>
              </Link>
            </Box>
            <Box>
              <Typography variant="body1">
                {userContext.user.userName}
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }} pl={2}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ border: 2, borderColor: "black" }}
                  alt="User avatar"
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem divider onClick={handleNavigateToMyListings}>
                  <Typography textAlign="center">My listings</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default ResponsiveAppBar;
