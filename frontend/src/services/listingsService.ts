import axios from "axios";
import { Listing, ListingDetails, NewListing } from "../types/listings";

const getAllListings = async () => {
  return (await axios.get<Listing[]>("/api/listings")).data;
};

const getListingById = async (id: string) => {
  return (await axios.get<ListingDetails>(`/api/listings/${id}`)).data;
};

const postListing = async (listing: NewListing, token: string) => {
  return (
    await axios.post<Listing>("/api/listings", listing, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).data;
};

export const listingsService = {
  getAllListings,
  getListingById,
  postListing,
};
