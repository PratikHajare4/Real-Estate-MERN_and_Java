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

// Create a new listing
export const createListing = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      apartments,
      totalArea,
      projectRERAID,
      possessionDate,
      carpetRange,
      amenities
    } = req.body;

    // Validate required fields
    if (!name || !description || !address || !regularPrice || !discountPrice || !bathrooms || !bedrooms || !imageUrls || !apartments || !totalArea || !projectRERAID || !possessionDate || !carpetRange) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Create a new listing with all provided fields
    const newListing = new Listing({
      name,
      description,
      address,
      regularPrice,
      discountPrice,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      type,
      offer,
      imageUrls,
      apartments,
      totalArea,
      projectRERAID,
      possessionDate,
      carpetRange,
      amenities
    });

    // Save the new listing to the database
    await newListing.save();

    // Return the newly created listing
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
};

// Delete a listing
export const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Find the listing by ID and delete it
    const deletedListing = await Listing.findByIdAndDelete(id);

    // If the listing is not found, return an error
    if (!deletedListing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Return a success message
    res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    next(error);
  }
};
