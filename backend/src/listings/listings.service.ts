import { NewListing, UpdatedListing } from "../types/listings.type.js";
import { listingsRepository } from "./listings.repository.js";
import { ApiError } from "../errors/ApiError.js";

const getAllListings = async () => {
  try {
    const listings = await listingsRepository.getAllListings();

    return listings;
  } catch (error) {
    throw error;
  }
};

const getListingById = async (listingId: number) => {
  try {
    const listing = await listingsRepository.getListingById(listingId);

    // Get the images for the listing
    const listingImages = await listingsRepository.getListingImages(listingId);

    if (!listing) {
      throw new ApiError(404, "Listing not found");
    }

    // Combine the listing and images into one object
    const response = {
      ...listing,
      images: listingImages,
    };
    return response;
  } catch (error) {
    throw error;
  }
};

const createListing = async (newListing: NewListing, imageUrls: string[]) => {
  try {
    const createdListing = await listingsRepository.createListing(newListing);
    if (!createdListing) {
      throw new Error("Failed to create listing");
    }

    // Insert the images for the listing
    for (const imageUrl of imageUrls) {
      await listingsRepository.createListingImage(createdListing.id, imageUrl);
    }
    return createdListing;
  } catch (error) {
    throw error;
  }
};

const updateListing = async (
  listingId: number,
  updatedListing: UpdatedListing,
) => {
  try {
    const listingExists = await listingsRepository.getListingById(listingId);
    if (!listingExists) {
      throw new ApiError(404, "Listing not found");
    }

    const listing = await listingsRepository.updateListing(
      listingId,
      updatedListing,
    );
    return listing;
  } catch (error) {
    throw error;
  }
};

const deleteListing = async (listingId: number) => {
  try {
    const listingExists = await listingsRepository.getListingById(listingId);
    if (!listingExists) {
      throw new ApiError(404, "Listing not found");
    }

    return await listingsRepository.deleteListing(listingId);
  } catch (error) {
    throw error;
  }
};

const getAllListingsCategories = async () => {
  try {
    const categories = await listingsRepository.getAllListingsCategories();
    return categories;
  } catch (error) {
    throw error;
  }
};

const getAllListingsTypes = async () => {
  try {
    const types = await listingsRepository.getAllListingsTypes();
    return types;
  } catch (error) {
    throw error;
  }
};

export const listingsService = {
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
  createListing,
  getAllListingsCategories,
  getAllListingsTypes,
};
