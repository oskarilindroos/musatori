import { Snackbar, Alert } from "@mui/material";

const ErrorAlert = ({ error }: { error: Error }) => {
  return (
    <Snackbar open={true}>
      <Alert severity="error">{error.message}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
