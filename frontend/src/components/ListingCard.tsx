import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Listing } from "../types/listings";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }: { listing: Listing }) => {
  const navigate = useNavigate();

  // Navigate to the listing detail page when the card is clicked
  const handleClick = () => {
    navigate(`/listings/${listing.id}`);
  };

  return (
    <Card sx={{ border: 1, boxShadow: 4 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          image={listing.image_url}
          alt={listing.title}
          height={300}
        />
        <CardContent>
          <Typography component="div" sx={{ fontWeight: "bold" }} variant="h6">
            {`${listing.type}: `}
            <Box fontWeight={"normal"} display={"inline"}>
              {listing.title}
            </Box>
          </Typography>
          <Typography gutterBottom noWrap variant="body2">
            {listing.description}
          </Typography>
          <Typography color={"gray"} gutterBottom variant="body2">
            {listing.location}
          </Typography>
          {listing.price && (
            <Typography variant="body1">{`€${listing.price}`}</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ListingCard;
