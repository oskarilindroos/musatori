import axios from "axios";
import { Listing } from "../types/listings";

export const getAllListings = async () => {
  try {
    const response = await axios.get("/api/listings");
    const listings: Listing[] = response.data;
    return listings;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch listings.");
  }
};

export const getListingById = async (id: number) => {
  try {
    const response = await axios.get(`/api/listings/${id}`);
    const listing: Listing = response.data;
    return listing;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch listing.");
  }
};
