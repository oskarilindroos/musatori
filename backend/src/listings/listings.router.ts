import { Router } from "express";
import { listingsController } from "./listings.controller.js";
import { verifyToken } from "../middleware/auth.js";

const listingsRouter = Router();

listingsRouter.get("/", listingsController.getAllListings);
listingsRouter.get("/categories", listingsController.getAllListingsCategories);
listingsRouter.get("/types", listingsController.getAllListingsTypes);
listingsRouter.get("/:listingId/", listingsController.getListingById);
listingsRouter.post("/", verifyToken, listingsController.createListing);
listingsRouter.patch(
  "/:listingId",
  verifyToken,
  listingsController.updateListing,
);
listingsRouter.delete(
  "/:listingId",
  verifyToken,
  listingsController.deleteListing,
);

export { listingsRouter };
