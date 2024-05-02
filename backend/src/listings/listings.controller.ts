import { NextFunction, Request, Response } from "express";
import { listingsService } from "./listings.service.js";
import { NewListing } from "../types/listings.type.js";
import { ApiError } from "../errors/ApiError.js";

const getAllListings = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listings = await listingsService.getAllListings();

    res.json(listings);
  } catch (error: unknown) {
    return next(error);
  }
};

const getListingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = parseInt(req.params.listingId);
    const listing = await listingsService.getListingById(listingId);

    res.json(listing);
  } catch (error: unknown) {
    return next(error);
  }
};

const createListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newListing: NewListing = {
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      listing_category_id: req.body.listing_category_id,
      listing_type_id: req.body.listing_type_id,
    };

    const imageUrls: string[] = req.body.imageUrls;

    const createdListing = await listingsService.createListing(
      newListing,
      imageUrls,
    );

    res.status(201).json(createdListing);
  } catch (error: unknown) {
    return next(error);
  }
};

const updateListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = parseInt(req.params.listingId);

    const updatedListing = await listingsService.updateListing(
      listingId,
      req.body,
    );

    res.json(updatedListing);
  } catch (error: unknown) {
    return next(error);
  }
};

const deleteListing = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const listingId = parseInt(req.params.listingId);

    await listingsService.deleteListing(listingId);

    res.status(200).json({ message: "Listing deleted" });
  } catch (error: unknown) {
    return next(error);
  }
};

const getAllListingsCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await listingsService.getAllListingsCategories();

    res.json(categories);
  } catch (error: unknown) {
    return next(error);
  }
};

const getAllListingsTypes = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const types = await listingsService.getAllListingsTypes();

    res.json(types);
  } catch (error: unknown) {
    return next(error);
  }
};

export const listingsController = {
  getAllListings,
  getListingById,
  updateListing,
  deleteListing,
  createListing,
  getAllListingsCategories,
  getAllListingsTypes,
};
