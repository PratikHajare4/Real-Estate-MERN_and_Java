import Listing from '../models/listing.model.js';

// Fetch all listings
export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find(); // Fetch all listings from MongoDB
    res.status(200).json(listings); // Respond with the listings
  } catch (error) {
    next(error); // Handle errors
  }
};
