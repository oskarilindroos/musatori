import axios from "axios";
import {
  Listing,
  ListingCategory,
  ListingDetails,
  ListingType,
  NewListing,
} from "../types/listings";

const getAllListings = async () => {
  return (await axios.get<Listing[]>("/api/listings")).data;
};

const getListingById = async (id: string) => {
  return (await axios.get<ListingDetails>(`/api/listings/${id}`)).data;
};

const postListing = async (listing: NewListing) => {
  return (
    await axios.post<Listing>("/api/listings", listing, {
      headers: {
        Authorization: `Bearer ${listing.token}`,
      },
    })
  ).data;
};

const deleteListing = async ({
  listingId,
  token,
}: {
  listingId: number;
  token: string;
}) => {
  return await axios.delete(`/api/listings/${listingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllCategories = async () => {
  return (await axios.get<ListingCategory[]>("/api/listings/categories")).data;
};

const getAllTypes = async () => {
  return (await axios.get<ListingType[]>("/api/listings/types")).data;
};

export const listingsService = {
  getAllListings,
  getListingById,
  getAllCategories,
  getAllTypes,
  deleteListing,
  postListing,
};
