import { CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ListingCard from "../components/ListingCard";
import { listingsService } from "../services/listingsService";

const ListingsPage = () => {
  const { isPending, isError, data, isSuccess } = useQuery({
    queryKey: ["listings"],
    queryFn: listingsService.getAllListings,
  });

  return (
    <Grid>
      <h1>Listings</h1>
      <Grid container spacing={2}>
        {isPending && (
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        )}
        {isError && (
          <Grid item>
            <Typography color="error">Error fetching listings</Typography>
          </Grid>
        )}
        {isSuccess &&
          data.map((listing) => (
            <Grid item key={listing.id} xs={12} sm={6} md={4}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
};

export default ListingsPage;
