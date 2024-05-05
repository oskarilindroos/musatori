import { Box, Button, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { listingsService } from "../services/listingsService";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => listingsService.getListingById(id || ""),
  });

  const handleContactSeller = () => {
    // If the user is logged in, open the email client
    // Otherwise, redirect to the login page
    if (userContext.user.isLoggedIn) {
      const emailLink = `mailto:${data!.email}?subject=Regarding your listing: ${data!.title}`;
      window.open(emailLink, "_blank");
    } else {
      navigate("/auth");
    }
  };

  return (
    <main>
      <Grid container my={2} spacing={2}>
        {isPending && <p>Loading...</p>}
        {isError && <Typography>{error.message}</Typography>}
        {isSuccess && (
          <Fragment>
            <Grid item xs={12} md={6}>
              <Swiper
                style={{
                  maxWidth: "400px",
                  display: "grid",
                }}
                pagination={true}
                navigation={true}
                modules={[Navigation, Pagination]}
              >
                {data.images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={image.url}
                      alt={data.title}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                {`${data.type}: `}
                <Box fontWeight={"normal"} display={"inline"}>
                  {data.title}
                </Box>
              </Typography>
              <hr />
              <Typography variant="body1">{data.description}</Typography>
              <hr />
              <Typography variant="body2">Location: {data.location}</Typography>
              <Typography variant="body2">Category: {data.category}</Typography>
              <hr />
              {data.price && (
                <Fragment>
                  <Typography variant="h5">Price: €{data.price}</Typography>
                  <hr />
                </Fragment>
              )}
              <Typography variant="h6">Posted by: {data.username}</Typography>
              <Typography variant="body2">
                at {new Date(data.created_at).toLocaleDateString()}
              </Typography>
              <hr />
              <Button
                variant="contained"
                onClick={handleContactSeller}
                color="secondary"
              >
                Contact {data.username}
              </Button>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </main>
  );
};

export default ListingDetailsPage;
