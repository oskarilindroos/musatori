import { RemoveCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { listingsService } from "../services/listingsService";
import { NewListing } from "../types/listings";

type Inputs = {
  listing_type_id: number;
  listing_category_id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  images: {
    url: string;
  }[];
};

const ListingFormPage = () => {
  // State to track whether the form is for a new listing or to update an existing one
  const [isNewListing] = useState(true);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      listing_type_id: 1,
      listing_category_id: 1,
      title: "",
      description: "",
      price: 0,
      location: "",
      images: [{ url: "" }],
    },
  });

  // For handling multiple image URLs
  const { fields, append, remove } = useFieldArray({
    name: "images",
    control,
    rules: {
      minLength: 1,
    },
  });

  // Mutation to post a new listing
  const { mutateAsync } = useMutation({
    mutationFn: listingsService.postListing,
    onSuccess: () => {
      toast.success("Listing posted successfully");

      // Redirect to the home page
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: Inputs) => {
    // Create a new listing object
    const newListing: NewListing = {
      title: data.title,
      description: data.description,
      location: data.location,
      price: data.price,
      listing_type_id: data.listing_type_id,
      listing_category_id: data.listing_category_id,
      imageUrls: data.images.map((image) => image.url),
      token: userContext.user.token,
    };

    if (isNewListing) {
      await mutateAsync(newListing);
    } else {
      // TODO: Update the existing listing
    }
  };

  // Fetch available listing categories and types
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: listingsService.getAllCategories,
  });

  const typesQuery = useQuery({
    queryKey: ["types"],
    queryFn: listingsService.getAllTypes,
  });

  if (categoriesQuery.isLoading || typesQuery.isLoading) {
    return <CircularProgress />;
  }

  if (categoriesQuery.isError || typesQuery.isError) {
    return <p>Failed to fetch categories or types.</p>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      margin="auto"
      gap={4}
      padding={4}
      my={4}
      boxShadow={4}
      borderRadius={4}
      border={1}
      borderColor="gray"
      maxWidth="700px"
    >
      <Typography variant="h4">
        {isNewListing ? "Post a new" : "Edit"} listing
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="row" pb={2} gap={4}>
          <Box flexGrow={1}>
            <FormLabel required>Listing type</FormLabel>
            <RadioGroup name="radio-buttons">
              {typesQuery.data!.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio color="success" />}
                  label={type.type}
                  {...register("listing_type_id", { valueAsNumber: true })}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box flexGrow={1}>
            <InputLabel required>Listing category</InputLabel>
            <Select
              sx={{ minWidth: "200px" }}
              label="Listing category"
              {...register("listing_category_id", { valueAsNumber: true })}
            >
              {categoriesQuery.data!.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <InputLabel required>Title</InputLabel>
          <TextField fullWidth type="text" {...register("title")} />
          <Typography variant="caption" color="error">
            {errors.title?.message}
          </Typography>
          <InputLabel required>Description</InputLabel>
          <TextField
            required
            fullWidth
            type="text"
            {...register("description")}
          />
          <Typography variant="caption" color="error">
            {errors.description?.message}
          </Typography>
          <InputLabel required>Price</InputLabel>
          <TextField
            required
            fullWidth
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          <Typography variant="caption" color="error">
            {errors.price?.message}
          </Typography>
          <InputLabel required>Location</InputLabel>
          <TextField required fullWidth type="text" {...register("location")} />
          <Typography variant="caption" color="error">
            {errors.location?.message}
          </Typography>
          {fields.map((field, index) => (
            <Box key={field.id}>
              <InputLabel required>Image URL</InputLabel>
              <Box display="flex" flexDirection="row" gap={1}>
                <TextField
                  required
                  fullWidth
                  type="url"
                  {...register(`images.${index}.url` as const)}
                />
                <IconButton onClick={() => remove(index)}>
                  <RemoveCircleOutline color="error" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Typography variant="caption" color="error">
            {errors.images?.message}
          </Typography>

          <Box display="flex" flexDirection="row" gap={2}>
            <Button variant="contained" onClick={() => append({ url: "" })}>
              Add image
            </Button>
            <Button color="success" type="submit" variant="contained">
              {isNewListing ? "Post Listing" : "Update Listing"}
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

//
export default ListingFormPage;
