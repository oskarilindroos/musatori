import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ErrorAlert from "../components/ErrorAlert";
import ListingCard from "../components/ListingCard";
import { getAllListings } from "../services/listingsService";

const ListingsPage = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["listings"],
    queryFn: getAllListings,
  });

  return (
    <main>
      <h1>Listings</h1>
      {data?.length === 0 && <p>No listings created yet.</p>}
      {isError && ErrorAlert({ error })}
      {isPending && <p>Loading...</p>}
      {data && (
        <Grid container spacing={2}>
          {data.map((listing) => (
            <Grid item key={listing.id} xs={12} sm={6} md={4} lg={3}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      )}
    </main>
  );
};

export default ListingsPage;
