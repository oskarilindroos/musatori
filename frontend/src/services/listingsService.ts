import axios from "axios";
import { Listing, ListingDetails } from "../types/listings";

const getAllListings = async () => {
  return (await axios.get<Listing[]>("/api/listings")).data;
};

const getListingById = async (id: string) => {
  return (await axios.get<ListingDetails>(`/api/listings/${id}`)).data;
};

export const listingsService = {
  getAllListings,
  getListingById,
};
