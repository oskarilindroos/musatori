import { DeleteOutline } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { listingsService } from "../services/listingsService";
import { usersService } from "../services/usersService";

const UserListingsPage = () => {
  const userContext = useContext(UserContext);
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId: string }>();

  const requestObj = {
    userId: userId || "",
    token: userContext.user.token,
  };

  // Query to get the user's listings
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["userlistings", requestObj],
    queryFn: () => usersService.getUserListings(requestObj),
  });

  // Mutation to delete a listing
  const { mutateAsync } = useMutation({
    mutationFn: listingsService.deleteListing,
    onSuccess: () => {
      toast.success("Listing deleted");

      // Refetch the user's listings
      queryClient.invalidateQueries({ queryKey: ["userlistings"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  if (isPending) {
    return <CircularProgress color="secondary" />;
  }

  if (isError) {
    toast.error(error.message);
    return <Typography>Error fetching listings</Typography>;
  }

  const handleDeleteListing = (listingId: number) => {
    mutateAsync({ listingId, token: userContext.user.token });
  };

  return (
    <Box my={4}>
      <Container
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: "background.primary",
        }}
        maxWidth={"sm"}
      >
        <Typography variant="h4">My Listings</Typography>
        <List>
          {data.length === 0 && (
            <Typography variant="body1">
              No listings found.{" "}
              <Link to="/listings/form">Create a listing now</Link>
            </Typography>
          )}
          {data.map((listing) => (
            <ListItem
              key={listing.id}
              secondaryAction={
                <IconButton
                  onClick={() => handleDeleteListing(listing.id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteOutline color="error" />
                </IconButton>
              }
            >
              <Link
                to={`/listings/${listing.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemText
                  primary={`${listing.title}`}
                  secondary={`${listing.created_at}`}
                />
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default UserListingsPage;
