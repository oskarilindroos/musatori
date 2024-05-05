import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ListingCard from "../components/ListingCard";
import { listingsService } from "../services/listingsService";

const ListingsPage = () => {
  const { isPending, isError, data, isSuccess } = useQuery({
    queryKey: ["listings"],
    queryFn: listingsService.getAllListings,
  });

  return (
    <main>
      <h1>Listings</h1>
      <Grid container spacing={2}>
        {isPending && <p>Loading...</p>}
        {isError && <p>Failed to fetch listings.</p>}
        {isSuccess &&
          data.map((listing) => (
            <Grid item key={listing.id} xs={12} sm={6} md={4}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
      </Grid>
    </main>
  );
};

export default ListingsPage;
