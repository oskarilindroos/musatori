import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usersService } from "../services/usersService";
import { UserContext } from "../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type Inputs = {
  username: string;
  password: string;
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleLogin = async (username: string, password: string) => {
    const result = await usersService.login(username, password);

    // If the result is a string, it's an error message
    if (typeof result === "string") {
      toast.error(result);
      return;
    }
    // Set the user in the context
    userContext.login(result);

    // Redirect to the home page
    navigate("/");

    toast.success("Logged in");
  };

  const handleSignup = async (username: string, password: string) => {
    const result = await usersService.signUp(username, password);

    // If the result is a string, it's an error message
    if (typeof result === "string") {
      toast.error(result);
      return;
    }

    toast.success("Signed up successfully.");

    // Log in the user after signing up
    handleLogin(username, password);
  };

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    if (isLogin) {
      handleLogin(username, password);
    } else {
      handleSignup(username, password);
    }
  };

  return (
    <Box
      display="flex"
      gap={2}
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        padding={4}
        boxShadow={4}
        borderRadius={4}
        border={1}
        borderColor="gray"
      >
        <Typography variant="h4" align="center">
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              variant="outlined"
              type="text"
              placeholder="Username"
              required
              {...register("username")}
            />
            <Typography variant="caption" color="error">
              {errors.username?.message}
            </Typography>
            <TextField
              variant="outlined"
              type="password"
              required
              placeholder="Password"
              {...register("password")}
            />
            <Typography variant="caption" color="error">
              {errors.password?.message}
            </Typography>
            <Button color="secondary" type="submit" variant="contained">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Box>
        </form>
        <Button
          sx={{
            color: "black",
            textDecoration: "underline",
            textTransform: "none",
          }}
          variant="text"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default AuthPage;
