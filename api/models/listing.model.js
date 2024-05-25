import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required : true,
        },
        description: {
            type: String,
            required : true,
        },
        address:{
            type: String,
            required : true,
        },
        regularPrice:{
            type: Number,
            required : true,
        },
        discountPrice: {
            type: Number,
            required : true,
        },
        bathrooms: {
            type: Number,
            required: true,
        },
        bedrooms:{
            type: Number,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        type:{
            type: String,
            required : true,
        },
        offer:{
            type: Boolean,
            required: true,
        },
        imageUrls:{
            type: Array,
            required: true,
        },
        apartments: {
            type: String,
            required: true,
        },
        totalArea: {
            type: String,
            required: true,
        },
        projectRERAID: {
            type: String,
            required: true,
        },
        possessionDate: {
            type: String,
            required: true,
        },
        carpetRange: {
            type: String,
            required: true
        },

        amenities: {
            gym: {
                type: Boolean,
                default: false
            },
            pool: {
                type: Boolean,
                default: false
            },
            park: {
                type: Boolean,
                default: false
            },
            // Add more amenities as needed
        },
    },
    {timestamps: true}
)

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;
